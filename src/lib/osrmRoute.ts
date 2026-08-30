import type { MapPoint } from '../data/itinerary'

export type LatLng = [number, number]

const cache = new Map<string, LatLng[]>()

function routeKey(points: MapPoint[]) {
  return points.map((p) => `${p.lng.toFixed(5)},${p.lat.toFixed(5)}`).join(';')
}

type OsrmRouteResponse = {
  code: string
  routes?: Array<{
    geometry: {
      coordinates: [number, number][]
    }
  }>
}

/** Fetch a road-following driving route via the public OSRM demo server. */
export async function fetchDrivingRoute(
  points: MapPoint[],
): Promise<LatLng[] | null> {
  if (points.length < 2) return null

  const key = routeKey(points)
  const cached = cache.get(key)
  if (cached) return cached

  const coords = points.map((p) => `${p.lng},${p.lat}`).join(';')
  const url =
    `https://router.project-osrm.org/route/v1/driving/${coords}` +
    '?overview=full&geometries=geojson&steps=false'

  const res = await fetch(url)
  if (!res.ok) return null

  const data = (await res.json()) as OsrmRouteResponse
  if (data.code !== 'Ok' || !data.routes?.[0]?.geometry?.coordinates?.length) {
    return null
  }

  // GeoJSON is [lng, lat]; Leaflet wants [lat, lng]
  const line: LatLng[] = data.routes[0].geometry.coordinates.map(
    ([lng, lat]) => [lat, lng],
  )
  cache.set(key, line)
  return line
}
