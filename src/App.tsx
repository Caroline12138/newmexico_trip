import { useState } from 'react'
import {
  activityMapPoint,
  activityWebsite,
  days,
  driveDurationLabel,
  driveRouteStops,
  formatDate,
  formatDayWhere,
  restItem,
  scheduleItems,
  trip,
  tripDriveRoute,
  type DayPlan,
  type DriveStop,
  type MapPoint,
} from './data/itinerary'
import { DayMap } from './components/DayMap'
import { preferredDriveUrl } from './lib/mapsNav'
import { isTripDayToday, resolveTodayDay, todayIso } from './lib/today'
import { usePwa } from './lib/usePwa'
import './App.css'

type View = 'general' | number

function initialView(): View {
  const iso = todayIso()
  if (iso >= trip.startDate && iso <= trip.endDate) {
    return resolveTodayDay().day
  }
  return 'general'
}

function NavBtn({
  lat,
  lng,
  label = '导航',
  className = 'nav-btn',
}: {
  lat: number
  lng: number
  label?: string
  className?: string
}) {
  return (
    <a
      className={className}
      href={preferredDriveUrl(lat, lng)}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  )
}

function DrivePath({ stops }: { stops: DriveStop[] }) {
  if (stops.length === 0) return null

  return (
    <div className="drive-path">
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
              <div className="drive-path__body">
                <span className="drive-path__name">{stop.name}</span>
                {typeof stop.lat === 'number' && typeof stop.lng === 'number' ? (
                  <NavBtn lat={stop.lat} lng={stop.lng} className="nav-btn nav-btn--inline" />
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function StatusBar({
  offline,
  canInstall,
  onInstall,
  onJumpToday,
  showTodayJump,
}: {
  offline: boolean
  canInstall: boolean
  onInstall: () => void
  onJumpToday: () => void
  showTodayJump: boolean
}) {
  if (!offline && !canInstall && !showTodayJump) return null

  return (
    <div className="status-bar" role="status">
      {offline ? (
        <span className="status-bar__chip status-bar__chip--warn">
          离线 · 日程可用，地图需联网
        </span>
      ) : null}
      {showTodayJump ? (
        <button type="button" className="status-bar__action" onClick={onJumpToday}>
          今天
        </button>
      ) : null}
      {canInstall ? (
        <button type="button" className="status-bar__action" onClick={onInstall}>
          安装到主屏幕
        </button>
      ) : null}
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
          <p className="glance__style">自驾：{tripDriveRoute()}</p>
          <p className="glance__lodge">住宿：{trip.lodgingChain.join(' → ')}</p>
        </div>

        <div className="glance__block">
          <h2>每天去哪</h2>
          <div className="day-grid" aria-label="每日卡片">
            {days.map((day) => {
              const isToday = isTripDayToday(day)
              return (
                <button
                  key={day.day}
                  type="button"
                  className={`day-tile${isToday ? ' is-today' : ''}`}
                  onClick={() => onSelectDay(day.day)}
                >
                  <div className="day-tile__top">
                    <span className="day-tile__id">
                      D{day.day}
                      {isToday ? ' · 今天' : ''}
                    </span>
                    <span className="day-tile__date">
                      {formatDate(day.date)} {day.weekday}
                    </span>
                  </div>
                  <p className="day-tile__what">{day.headline}</p>
                  <p className="day-tile__where">{formatDayWhere(day)}</p>
                  <p className="day-tile__meta">
                    {day.startTime}–{day.endTime} · {driveDurationLabel(day)}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="glance__block">
          <h2>整趟驾驶路线</h2>
          <DayMap
            points={tripMapPoints}
            heightClass="day-map__canvas day-map__canvas--trip"
            fitMaxZoom={8}
            staticMap
            straightOnly
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
  const schedule = scheduleItems(day)
  const rest = restItem(day)
  const landWhere = day.where.filter((name) => name !== 'SEA')
  const sameCity = landWhere.length <= 1
  const routeStops = driveRouteStops(day)
  const showDrives = routeStops.length > 0
  const today = isTripDayToday(day)
  const detailItems = schedule.filter(
    (a) => a.detail && (a.kind === 'visit' || a.kind === 'meal'),
  )

  return (
    <main className="page page--detail">
      <header className="detail-head">
        <button type="button" className="back" onClick={onBack}>
          ← 回总览
        </button>
        <p className="detail-head__kicker">
          D{day.day} · {formatDate(day.date)} {day.weekday}
          {today ? ' · 今天' : ''}
        </p>
        <h1 className="detail-head__title">{day.headline}</h1>
        <p className="detail-head__meta">
          <span>
            {day.startTime}–{day.endTime}
          </span>
          {!sameCity ? <span>开车 {driveDurationLabel(day)}</span> : null}
        </p>
        <p className="detail-head__where">途经 {formatDayWhere(day)}</p>
      </header>

      <section className="section section--tight">
        <h2>今天做什么</h2>
        <div className="plan-grid">
          {schedule.map((activity, index) => {
            const heavy = activity.kind === 'visit' || activity.kind === 'meal'
            const site = activityWebsite(activity.title, day, activity.website)
            const point = activityMapPoint(activity.title, day)
            return (
              <article
                key={`${activity.title}-${index}`}
                className={`plan-tile${heavy ? ' is-heavy' : ' is-light'}`}
              >
                <p className="plan-tile__time">
                  {activity.time ?? '时间灵活'}
                  {activity.duration ? ` · ${activity.duration}` : ''}
                </p>
                <p className="plan-tile__title">{activity.title}</p>
                <div className="plan-tile__actions">
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
                  {point ? (
                    <NavBtn
                      lat={point.lat}
                      lng={point.lng}
                      className="nav-btn nav-btn--inline"
                    />
                  ) : null}
                </div>
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

      {detailItems.length > 0 ? (
        <section className="section section--tight">
          <h2>景点详情</h2>
          <div className="detail-notes">
            {detailItems.map((activity, index) => (
              <article
                key={`detail-${activity.title}-${index}`}
                className="detail-note"
              >
                {activity.theme ? (
                  <p className="detail-note__theme">{activity.theme}</p>
                ) : null}
                <h3 className="detail-note__title">{activity.title}</h3>
                <p className="detail-note__body">{activity.detail}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {day.suggestions && day.suggestions.length > 0 ? (
        <section className="section section--tight">
          <h2>本日建议</h2>
          <p className="section-lead">除已安排外，顺路或天气备用可考虑：</p>
          <ul className="day-suggestions">
            {day.suggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {showDrives ? (
        <section className="section section--tight">
          <h2>分段车程</h2>
          <DrivePath stops={routeStops} />
        </section>
      ) : null}
    </main>
  )
}

function App() {
  const [view, setView] = useState<View>(initialView)
  const { offline, canInstall, install } = usePwa()
  const current = typeof view === 'number' ? days.find((d) => d.day === view) : null
  const todayDay = resolveTodayDay()
  const inTrip =
    todayIso() >= trip.startDate && todayIso() <= trip.endDate
  const showTodayJump = inTrip && view !== todayDay.day

  return (
    <div className="app">
      <StatusBar
        offline={offline}
        canInstall={canInstall}
        onInstall={() => void install()}
        onJumpToday={() => setView(todayDay.day)}
        showTodayJump={showTodayJump}
      />
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
            {isTripDayToday(day) ? '·今' : ''}
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
