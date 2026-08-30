import { days, type DayPlan } from '../data/itinerary'

/** Local calendar day as YYYY-MM-DD */
export function todayIso(now = new Date()) {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Pick the trip day that matches today, else nearest upcoming, else last. */
export function resolveTodayDay(now = new Date()): DayPlan {
  const iso = todayIso(now)
  const exact = days.find((d) => d.date === iso)
  if (exact) return exact
  const upcoming = days.find((d) => d.date > iso)
  if (upcoming) return upcoming
  return days[days.length - 1]
}

export function isTripDayToday(day: DayPlan, now = new Date()) {
  return day.date === todayIso(now)
}
