import { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import type { MapPoint } from '../data/itinerary'
import { fetchDrivingRoute, type LatLng } from '../lib/osrmRoute'
import 'leaflet/dist/leaflet.css'

function numberedIcon(n: number) {
  return L.divIcon({
    className: 'route-marker',
    html: `<span class="route-marker__n">${n}</span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

function FitBounds({
  points,
  route,
  maxZoom,
}: {
  points: MapPoint[]
  route: LatLng[] | null
  maxZoom: number
}) {
  const map = useMap()

  useEffect(() => {
    if (route && route.length > 1) {
      const bounds = L.latLngBounds(route)
      map.fitBounds(bounds, { padding: [24, 24], maxZoom })
      return
    }
    if (points.length === 0) return
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], Math.min(12, maxZoom))
      return
    }
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]))
    map.fitBounds(bounds, { padding: [24, 24], maxZoom })
  }, [map, points, route, maxZoom])

  return null
}

function markerNumber(name: string, fallback: number) {
  const matched = name.match(/^(\d+)\.\s/)
  return matched ? Number(matched[1]) : fallback
}

function markerLabel(name: string) {
  return name.replace(/^\d+\.\s*/, '')
}

type DayMapProps = {
  points: MapPoint[]
  showRoute?: boolean
  heightClass?: string
  fitMaxZoom?: number
  staticMap?: boolean
}

export function DayMap({
  points,
  showRoute = true,
  heightClass = 'day-map__canvas',
  fitMaxZoom = 11,
  staticMap = false,
}: DayMapProps) {
  const [route, setRoute] = useState<LatLng[] | null>(null)
  const [routeStatus, setRouteStatus] = useState<'idle' | 'loading' | 'ready' | 'fallback'>(
    'idle',
  )

  const pointsKey = points
    .map((p) => `${p.lng.toFixed(5)},${p.lat.toFixed(5)}`)
    .join(';')

  useEffect(() => {
    if (!showRoute || points.length < 2) {
      setRoute(null)
      setRouteStatus('idle')
      return
    }

    let cancelled = false
    setRouteStatus('loading')
    setRoute(null)

    fetchDrivingRoute(points)
      .then((line) => {
        if (cancelled) return
        if (line && line.length > 1) {
          setRoute(line)
          setRouteStatus('ready')
        } else {
          setRoute(null)
          setRouteStatus('fallback')
        }
      })
      .catch(() => {
        if (cancelled) return
        setRoute(null)
        setRouteStatus('fallback')
      })

    return () => {
      cancelled = true
    }
    // pointsKey captures coordinate identity; avoid refetch on new array refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsKey, showRoute])

  if (points.length === 0) {
    return <p className="map-empty">暂无地图点</p>
  }

  const center: [number, number] = [points[0].lat, points[0].lng]
  const straight: LatLng[] = points.map((p) => [p.lat, p.lng])
  const line = route ?? (routeStatus === 'fallback' ? straight : null)

  return (
    <div className={`day-map${staticMap ? ' day-map--static' : ''}`}>
      <MapContainer
        key={points.map((p) => `${p.name}-${p.lat}-${p.lng}`).join('|')}
        center={center}
        zoom={8}
        scrollWheelZoom={!staticMap}
        dragging={!staticMap}
        doubleClickZoom={!staticMap}
        touchZoom={!staticMap}
        boxZoom={!staticMap}
        keyboard={!staticMap}
        zoomControl={!staticMap}
        className={heightClass}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · 路线 OSRM'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} route={route} maxZoom={fitMaxZoom} />
        {showRoute && line && line.length > 1 ? (
          <Polyline
            positions={line}
            pathOptions={{
              color: '#c4784a',
              weight: 4,
              opacity: 0.9,
              dashArray: routeStatus === 'fallback' ? '6 8' : undefined,
            }}
          />
        ) : null}
        {points.map((point, index) => {
          const n = markerNumber(point.name, index + 1)
          const label = markerLabel(point.name)
          return (
            <Marker
              key={`${point.name}-${point.lat}-${point.lng}-${index}`}
              position={[point.lat, point.lng]}
              icon={numberedIcon(n)}
              interactive={!staticMap}
            >
              {staticMap ? null : (
                <Popup>
                  <strong>
                    {n}. {label}
                  </strong>
                  {point.website ? (
                    <>
                      <br />
                      <a href={point.website} target="_blank" rel="noreferrer">
                        官网
                      </a>
                    </>
                  ) : null}
                </Popup>
              )}
            </Marker>
          )
        })}
      </MapContainer>
      {showRoute && points.length > 1 ? (
        <p className="day-map__hint" aria-live="polite">
          {routeStatus === 'loading'
            ? '正在加载沿道路线…'
            : routeStatus === 'ready'
              ? '沿道路驾驶路线'
              : routeStatus === 'fallback'
                ? '路线服务暂不可用，显示直线示意'
                : null}
        </p>
      ) : null}
    </div>
  )
}
