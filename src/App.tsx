import { useState } from 'react'
import {
  actionCount,
  activityWebsite,
  days,
  driveRouteMapPoints,
  driveRouteStops,
  formatDate,
  mustDoCount,
  restItem,
  scheduleItems,
  totalMiles,
  trip,
  type DayPlan,
  type DriveStop,
  type MapPoint,
} from './data/itinerary'
import { DayMap } from './components/DayMap'
import './App.css'

type View = 'general' | number

function dayStats(day: DayPlan) {
  const miles = totalMiles(day)
  const actions = actionCount(day)
  const must = mustDoCount(day)
  const optional = actions - must
  return { miles, actions, must, optional }
}

function DrivePath({
  stops,
  note,
  miles,
  legCount,
}: {
  stops: DriveStop[]
  note?: string
  miles: number
  legCount: number
}) {
  if (stops.length === 0) return null

  return (
    <div className="drive-path">
      <p className="drive-path__summary">
        与下方地图编号一致 · {legCount} 段
        {miles > 0 ? ` · ${miles} mi` : ''}
        {note ? ` · ${note}` : ''}
      </p>
      <ol className="drive-path__list">
        {stops.map((stop) => (
          <li key={`${stop.index}-${stop.name}`}>
            {stop.legFromPrev ? (
              <div className="drive-path__leg" aria-hidden="true">
                <span className="drive-path__line" />
                <span className="drive-path__leg-text">
                  {stop.legFromPrev.miles} mi · {stop.legFromPrev.duration}
                </span>
              </div>
            ) : null}
            <div className="drive-path__stop">
              <span className="drive-path__n">{stop.index}</span>
              <span className="drive-path__name">{stop.name}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function GeneralPage({ onSelectDay }: { onSelectDay: (day: number) => void }) {
  const tripMapPoints: MapPoint[] = trip.overviewStops
    .filter((s): s is typeof s & { lat: number; lng: number } =>
      typeof s.lat === 'number' && typeof s.lng === 'number',
    )
    .map((s) => ({ name: s.name, lat: s.lat, lng: s.lng }))

  return (
    <main className="page page--general">
      <section className="glance" aria-label="整体一览">
        <div className="glance__top">
          <h1>{trip.title}</h1>
          <p className="glance__when">
            {formatDate(trip.startDate)} → {formatDate(trip.endDate)} · {days.length}{' '}
            天 {trip.nights} 晚
          </p>
          <p className="glance__style">{trip.style}</p>
          <p className="glance__lodge">住宿：{trip.lodgingChain.join(' → ')}</p>
        </div>

        <div className="glance__block">
          <h2>每天去哪</h2>
          <div className="day-grid" aria-label="每日卡片">
            {days.map((day) => (
              <button
                key={day.day}
                type="button"
                className="day-tile"
                onClick={() => onSelectDay(day.day)}
              >
                <div className="day-tile__top">
                  <span className="day-tile__id">D{day.day}</span>
                  <span className="day-tile__date">
                    {formatDate(day.date)} {day.weekday}
                  </span>
                </div>
                <p className="day-tile__what">{day.headline}</p>
                <p className="day-tile__where">{day.where.join(' → ')}</p>
                {day.loadLabel ? (
                  <p className="day-tile__load">{day.loadLabel}</p>
                ) : null}
                <p className="day-tile__meta">
                  {day.startTime}–{day.endTime} · 车 {day.totalDrive}
                  <br />
                  住 {day.lodging}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="glance__block">
          <h2>整趟驾驶路线</h2>
          <DayMap
            points={tripMapPoints}
            heightClass="day-map__canvas day-map__canvas--trip"
            fitMaxZoom={8}
            staticMap
          />
        </div>
      </section>
    </main>
  )
}

function DayPage({
  day,
  onBack,
}: {
  day: DayPlan
  onBack: () => void
}) {
  const { miles } = dayStats(day)
  const schedule = scheduleItems(day)
  const rest = restItem(day)
  const landWhere = day.where.filter((name) => name !== 'SEA')
  const sameCity = landWhere.length <= 1
  const routeStops = driveRouteStops(day)
  const routeMapPoints = driveRouteMapPoints(day)
  const showRouteMap = !sameCity && routeMapPoints.length > 1
  const showDrives = routeStops.length > 0

  return (
    <main className="page page--detail">
      <header className="detail-head">
        <button type="button" className="back" onClick={onBack}>
          ← 回总览
        </button>
        <p className="detail-head__kicker">
          D{day.day} · {formatDate(day.date)} {day.weekday}
        </p>
        <h1 className="detail-head__title">{day.headline}</h1>
        <p className="detail-head__meta">
          <span>{day.startTime}–{day.endTime}</span>
          {!sameCity ? <span>开车 {day.totalDrive}</span> : null}
        </p>
        <p className="detail-head__where">途经 {day.where.join(' → ')}</p>
        {day.loadLabel ? (
          <p className="detail-head__load">{day.loadLabel}</p>
        ) : null}
        {day.tip ? <p className="detail-head__tip">{day.tip}</p> : null}
      </header>

      <section className="section section--tight">
        <h2>今天做什么</h2>
        <div className="plan-grid">
          {schedule.map((activity, index) => {
            const heavy = activity.kind === 'visit' || activity.kind === 'meal'
            const site = activityWebsite(activity.title, day, activity.website)
            return (
              <article
                key={`${activity.title}-${index}`}
                className={`plan-tile${heavy ? ' is-heavy' : ' is-light'}${
                  activity.optional ? ' is-optional' : ''
                }`}
              >
                <p className="plan-tile__time">
                  {activity.time ?? '时间灵活'}
                  {activity.duration ? ` · ${activity.duration}` : ''}
                  {activity.optional ? ' · 可选' : ''}
                </p>
                <p className="plan-tile__title">{activity.title}</p>
                {site ? (
                  <a
                    className="plan-tile__link"
                    href={site}
                    target="_blank"
                    rel="noreferrer"
                  >
                    官网
                  </a>
                ) : null}
              </article>
            )
          })}
          {rest ? (
            <article className="plan-tile is-rest">
              <p className="plan-tile__time">{rest.time ?? day.endTime}</p>
              <p className="plan-tile__title">{rest.title}</p>
            </article>
          ) : null}
        </div>
      </section>

      {showDrives ? (
        <section className="section section--tight">
          <h2>分段车程</h2>
          <DrivePath
            stops={routeStops}
            note={day.driveNote}
            miles={miles}
            legCount={day.drives.length}
          />
        </section>
      ) : null}

      {showRouteMap ? (
        <section className="section section--tight">
          <h2>地图（编号同上）</h2>
          <DayMap
            points={routeMapPoints}
            fitMaxZoom={12}
            heightClass="day-map__canvas day-map__canvas--day"
          />
        </section>
      ) : null}
    </main>
  )
}

function App() {
  const [view, setView] = useState<View>('general')
  const current = typeof view === 'number' ? days.find((d) => d.day === view) : null

  return (
    <div className="app">
      <nav className="tabs" aria-label="页面切换">
        <button
          type="button"
          className={view === 'general' ? 'is-active' : undefined}
          onClick={() => setView('general')}
        >
          总览
        </button>
        {days.map((day) => (
          <button
            key={day.day}
            type="button"
            className={view === day.day ? 'is-active' : undefined}
            onClick={() => setView(day.day)}
          >
            D{day.day}
          </button>
        ))}
      </nav>

      {view === 'general' ? (
        <GeneralPage onSelectDay={setView} />
      ) : current ? (
        <DayPage day={current} onBack={() => setView('general')} />
      ) : null}
    </div>
  )
}

export default App
