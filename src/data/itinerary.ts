export type DriveSegment = {
  from: string
  to: string
  miles: number
  duration: string
}

export type Activity = {
  time?: string
  duration?: string
  title: string
  optional?: boolean
  kind: 'travel' | 'visit' | 'meal' | 'rest' | 'note'
  /** 官网；不填则按 title 匹配当日 mapPoints */
  website?: string
}

/** 按访问顺序排列；website 为官网（可点开） */
export type MapPoint = {
  name: string
  lat: number
  lng: number
  website?: string
}

export type DayPlan = {
  day: number
  date: string
  weekday: string
  /** 一天一句话说清楚：今天主线是什么（说明用中文，地名英文） */
  headline: string
  /** 总览用：当天要去的关键节点（同城项目不展开） */
  where: string[]
  /** 体感负荷，如 ★☆☆☆☆ */
  loadLabel?: string
  /** 执行提示（一句话） */
  tip?: string
  /** 当天开始时间 */
  startTime: string
  /** 当天结束 / 休息时间 */
  endTime: string
  route: string
  totalDrive: string
  driveNote?: string
  drives: DriveSegment[]
  activities: Activity[]
  lodging: string
  /** 当日停靠点，数组顺序 = 实际顺序 */
  mapPoints: MapPoint[]
}

export const trip = {
  title: 'New Mexico · 8天7晚',
  startDate: '2026-09-26',
  endDate: '2026-10-03',
  origin: 'Seattle (SEA)',
  nights: 7,
  style:
    '自驾：US-550 北上 Cortez → Mesa Verde / Shiprock / Bisti → Socorro → White Sands → Carlsbad → Santa Fe → Balloon Fiesta',
  lodgingChain: [
    'Cortez, CO',
    'Farmington, NM',
    'Socorro, NM',
    'Carlsbad, NM',
    'Santa Fe ×2',
    'Albuquerque, NM',
  ],
  overviewStops: [
    { name: 'SEA', dayLabels: 'D1 / D8', days: [1, 8] },
    {
      name: 'Albuquerque',
      dayLabels: 'D1 · D7–8',
      days: [1, 7, 8],
      lat: 35.0844,
      lng: -106.6504,
    },
    {
      name: 'Cortez',
      dayLabels: 'D1–2',
      days: [1, 2],
      lat: 37.3489,
      lng: -108.5859,
    },
    {
      name: 'Mesa Verde',
      dayLabels: 'D2',
      days: [2],
      lat: 37.1841,
      lng: -108.4887,
    },
    {
      name: 'Shiprock',
      dayLabels: 'D2',
      days: [2],
      lat: 36.6875,
      lng: -108.8365,
    },
    {
      name: 'Bisti',
      dayLabels: 'D3',
      days: [3],
      lat: 36.2597,
      lng: -108.2406,
    },
    {
      name: 'Socorro',
      dayLabels: 'D3–4',
      days: [3, 4],
      lat: 34.0584,
      lng: -106.8914,
    },
    {
      name: 'White Sands',
      dayLabels: 'D4',
      days: [4],
      lat: 32.7798,
      lng: -106.1714,
    },
    {
      name: 'Carlsbad',
      dayLabels: 'D4–5',
      days: [4, 5],
      lat: 32.1478,
      lng: -104.5567,
    },
    {
      name: 'Santa Fe',
      dayLabels: 'D5–7',
      days: [5, 6, 7],
      lat: 35.687,
      lng: -105.9378,
    },
    {
      name: 'Balloon Fiesta',
      dayLabels: 'D8',
      days: [8],
      lat: 35.1947,
      lng: -106.5969,
    },
    { name: 'SEA', dayLabels: 'D8', days: [8] },
  ],
  overviewRoute: [
    'SEA',
    'Albuquerque',
    'Cortez',
    'Mesa Verde',
    'Shiprock',
    'Bisti',
    'Socorro',
    'White Sands',
    'Carlsbad',
    'Santa Fe',
    'Balloon Fiesta',
    'SEA',
  ],
}

export const days: DayPlan[] = [
  {
    day: 1,
    date: '2026-09-26',
    weekday: '周六',
    headline: '落地 Albuquerque，沿 US-550 北上，夜宿 Cortez',
    where: ['Albuquerque', 'Cortez'],
    loadLabel: '从容平稳 ★☆☆☆☆',
    tip: '第一天专心行车就位，不抢日落；途经 Cuba / Farmington 轻松休整晚餐',
    startTime: '14:00',
    endTime: '21:00',
    route: 'Seattle (SEA) → Albuquerque → US-550 → Cortez, CO',
    totalDrive: '250 mi / 约 3.8h',
    driveNote: '景观道 US-550；建议 Cuba 或 Farmington 停晚餐',
    lodging: 'Cortez, CO',
    drives: [
      {
        from: 'Albuquerque International Sunport',
        to: 'Cortez, CO',
        miles: 250,
        duration: '3h 45m',
      },
    ],
    activities: [
      {
        time: '14:00',
        title: '落地 Albuquerque International Sunport，提车',
        kind: 'travel',
      },
      {
        time: '14:30',
        title: '沿 US-550 景观道北上（途经 Cuba / Farmington 可休整）',
        kind: 'travel',
      },
      {
        time: '傍晚',
        title: 'Farmington 一带轻松晚餐，不赶日落',
        kind: 'meal',
      },
      {
        time: '21:00',
        title: '抵达 Cortez 入住休息',
        kind: 'rest',
      },
    ],
    mapPoints: [
      {
        name: 'Albuquerque International Sunport',
        lat: 35.0402,
        lng: -106.6091,
        website: 'https://www.abqsunport.com/',
      },
      {
        name: 'Farmington',
        lat: 36.7281,
        lng: -108.2187,
        website: 'https://www.farmingtonnm.org/',
      },
      {
        name: 'Cortez, CO',
        lat: 37.3489,
        lng: -108.5859,
        website: 'https://www.cityofcortez.com/',
      },
    ],
  },
  {
    day: 2,
    date: '2026-09-27',
    weekday: '周日',
    headline: 'Mesa Verde Cliff Palace + 傍晚 Shiprock 黄金日落',
    where: ['Mesa Verde', 'Shiprock', 'Farmington'],
    loadLabel: '深度舒适 ★★☆☆☆',
    tip: '上午探秘悬崖遗址，傍晚从容拍 Shiprock；夜宿 Farmington',
    startTime: '08:00',
    endTime: '20:30',
    route: 'Cortez → Mesa Verde → Shiprock → Farmington',
    totalDrive: '75 mi / 约 1.5h',
    lodging: 'Farmington, NM',
    drives: [
      {
        from: 'Cortez, CO',
        to: 'Mesa Verde National Park · Chapin Mesa',
        miles: 35,
        duration: '50m',
      },
      {
        from: 'Mesa Verde National Park · Chapin Mesa',
        to: 'Shiprock',
        miles: 25,
        duration: '30m',
      },
      {
        from: 'Shiprock',
        to: 'Farmington',
        miles: 15,
        duration: '20m',
      },
    ],
    activities: [
      {
        time: '08:00 – 13:00',
        duration: '约 5h',
        title: 'Mesa Verde：Cliff Palace 导览 + 观景',
        kind: 'visit',
      },
      {
        time: '下午',
        title: '前往 Shiprock 一带就位',
        kind: 'travel',
      },
      {
        time: '傍晚',
        duration: '约 1h',
        title: 'Shiprock 黄金日落摄影',
        kind: 'visit',
      },
      {
        time: '20:30',
        title: '抵达 Farmington 入住',
        kind: 'rest',
      },
    ],
    mapPoints: [
      {
        name: 'Cortez, CO',
        lat: 37.3489,
        lng: -108.5859,
        website: 'https://www.cityofcortez.com/',
      },
      {
        name: 'Mesa Verde National Park · Chapin Mesa',
        lat: 37.1841,
        lng: -108.4887,
        website: 'https://www.nps.gov/meve/',
      },
      {
        name: 'Shiprock',
        lat: 36.6875,
        lng: -108.8365,
        website: 'https://www.nps.gov/places/shiprock.htm',
      },
      {
        name: 'Farmington',
        lat: 36.7281,
        lng: -108.2187,
        website: 'https://www.farmingtonnm.org/',
      },
    ],
  },
  {
    day: 3,
    date: '2026-09-28',
    weekday: '周一',
    headline: '清晨 Bisti 异星荒原徒步，午后南下 Socorro',
    where: ['Bisti/De-Na-Zin', 'Socorro'],
    loadLabel: '探索充实 ★★☆☆☆',
    tip: '住宿南移至 Socorro，为次日白沙削减约 75 mi / 1.5h 车程',
    startTime: '07:00',
    endTime: '20:00',
    route: 'Farmington → Bisti → Socorro',
    totalDrive: '230 mi / 约 3.75h',
    driveNote: '上午徒步后长途南下，预留补给与休息',
    lodging: 'Socorro, NM',
    drives: [
      {
        from: 'Farmington',
        to: 'Bisti/De-Na-Zin Wilderness',
        miles: 40,
        duration: '45m',
      },
      {
        from: 'Bisti/De-Na-Zin Wilderness',
        to: 'Socorro',
        miles: 190,
        duration: '3h 15m',
      },
    ],
    activities: [
      {
        time: '07:00 – 11:00',
        duration: '4h',
        title: 'Bisti/De-Na-Zin Wilderness 荒原徒步',
        kind: 'visit',
      },
      {
        time: '午后',
        title: '南下前往 Socorro 入住',
        kind: 'travel',
      },
      {
        time: '20:00',
        title: 'Socorro 休息，为明日白沙蓄力',
        kind: 'rest',
      },
    ],
    mapPoints: [
      {
        name: 'Farmington',
        lat: 36.7281,
        lng: -108.2187,
        website: 'https://www.farmingtonnm.org/',
      },
      {
        name: 'Bisti/De-Na-Zin Wilderness',
        lat: 36.2597,
        lng: -108.2406,
        website: 'https://www.blm.gov/visit/bisti-de-na-zin-wilderness',
      },
      {
        name: 'Socorro',
        lat: 34.0584,
        lng: -106.8914,
        website: 'https://www.socorronm.gov/',
      },
    ],
  },
  {
    day: 4,
    date: '2026-09-29',
    weekday: '周二',
    headline: 'PistachioLand + White Sands 滑沙日落，夜宿 Carlsbad',
    where: ['PistachioLand', 'White Sands', 'Carlsbad'],
    loadLabel: '从容适度 ★★☆☆☆',
    tip: '从 Socorro 出发车程约 4.75h（比从更北出发省约 1h+）；白沙玩到日落后再进 Carlsbad',
    startTime: '08:00',
    endTime: '21:00',
    route: 'Socorro → PistachioLand → White Sands → Carlsbad',
    totalDrive: '280 mi / 约 4.75h',
    driveNote: '中午前到 Alamogordo 一带；日落后翻山进 Carlsbad',
    lodging: 'Carlsbad, NM',
    drives: [
      {
        from: 'Socorro',
        to: 'PistachioLand',
        miles: 110,
        duration: '1h 45m',
      },
      {
        from: 'PistachioLand',
        to: 'White Sands National Park',
        miles: 20,
        duration: '25m',
      },
      {
        from: 'White Sands National Park',
        to: 'Carlsbad',
        miles: 150,
        duration: '2h 45m',
      },
    ],
    activities: [
      {
        time: '08:00',
        title: '从 Socorro 南下',
        kind: 'travel',
      },
      {
        time: '上午',
        duration: '30–45m',
        title: 'PistachioLand 开心果园打卡',
        kind: 'visit',
      },
      {
        time: '下午 – 日落',
        duration: '约 4h',
        title: 'White Sands National Park：滑沙与日落',
        kind: 'visit',
      },
      {
        time: '日落后',
        title: '驱车前往 Carlsbad 入住',
        kind: 'travel',
      },
      {
        time: '21:00',
        title: 'Carlsbad 休息',
        kind: 'rest',
      },
    ],
    mapPoints: [
      {
        name: 'Socorro',
        lat: 34.0584,
        lng: -106.8914,
        website: 'https://www.socorronm.gov/',
      },
      {
        name: 'PistachioLand',
        lat: 32.8176,
        lng: -106.0094,
        website: 'https://www.pistachioland.com/',
      },
      {
        name: 'White Sands National Park',
        lat: 32.7798,
        lng: -106.1714,
        website: 'https://www.nps.gov/whsa/',
      },
      {
        name: 'Carlsbad',
        lat: 32.4207,
        lng: -104.2288,
        website: 'https://www.cityofcarlsbadnm.com/',
      },
    ],
  },
  {
    day: 5,
    date: '2026-09-30',
    weekday: '周三',
    headline: 'Carlsbad Caverns → Roswell UFO McDonald’s → 16:45 进驻 Santa Fe',
    where: ['Carlsbad Caverns', 'Roswell', 'Santa Fe'],
    loadLabel: '充实渐佳 ★★☆☆☆',
    tip: '08:00 进溶洞、不逛 UFO 馆；目标 16:45 抵达已订 Santa Fe 酒店',
    startTime: '08:00',
    endTime: '21:00',
    route: 'Carlsbad Caverns → Roswell → Santa Fe',
    totalDrive: '292 mi / 约 4.8h',
    driveNote: '溶洞约 3h；Roswell 仅飞碟麦当劳快闪打卡',
    lodging: 'Santa Fe, NM',
    drives: [
      {
        from: 'Carlsbad',
        to: 'Carlsbad Caverns National Park',
        miles: 25,
        duration: '35m',
      },
      {
        from: 'Carlsbad Caverns National Park',
        to: 'Roswell UFO McDonald’s',
        miles: 95,
        duration: '1h 30m',
      },
      {
        from: 'Roswell UFO McDonald’s',
        to: 'Santa Fe',
        miles: 172,
        duration: '2h 50m',
      },
    ],
    activities: [
      {
        time: '08:00 – 11:00',
        duration: '3h',
        title: 'Carlsbad Caverns National Park 地心探秘',
        kind: 'visit',
      },
      {
        time: '中午前后',
        duration: '20–30m',
        title: 'Roswell UFO McDonald’s 飞碟造型打卡（720 N Main）',
        kind: 'visit',
      },
      {
        time: '下午',
        title: '北上 Santa Fe',
        kind: 'travel',
      },
      {
        time: '16:45',
        title: '进驻 Santa Fe 已订酒店',
        kind: 'note',
      },
      {
        time: '21:00',
        title: 'Santa Fe 休息',
        kind: 'rest',
      },
    ],
    mapPoints: [
      {
        name: 'Carlsbad Caverns National Park',
        lat: 32.1478,
        lng: -104.5567,
        website: 'https://www.nps.gov/cave/',
      },
      {
        name: 'Roswell UFO McDonald’s',
        lat: 33.4047,
        lng: -104.523,
        website:
          'https://www.mcdonalds.com/us/en-us/location/nm/roswell/720-n-main/2427.html',
      },
      {
        name: 'Santa Fe',
        lat: 35.687,
        lng: -105.9378,
        website: 'https://www.santafe.org/',
      },
    ],
  },
  {
    day: 6,
    date: '2026-10-01',
    weekday: '周四',
    headline: 'Santa Fe 整天：Meow Wolf + Plaza + Ten Thousand Waves + Izanami',
    where: ['Santa Fe'],
    loadLabel: '极度享受 ★☆☆☆☆',
    tip: '连住第 2 晚；温泉与 Izanami 洗去连日自驾疲惫',
    startTime: '10:30',
    endTime: '21:15',
    route: 'Santa Fe（市内短途）',
    totalDrive: '15 mi / 约 0.5h',
    lodging: 'Santa Fe, NM',
    drives: [
      {
        from: 'Santa Fe Downtown',
        to: 'Meow Wolf Santa Fe',
        miles: 6,
        duration: '15 min',
      },
      {
        from: 'Santa Fe Downtown',
        to: 'Ten Thousand Waves',
        miles: 4,
        duration: '15 min',
      },
      {
        from: 'Ten Thousand Waves',
        to: 'Santa Fe Hotel',
        miles: 5,
        duration: '15 min',
      },
    ],
    activities: [
      {
        time: '10:30 – 13:00',
        duration: '2.5h',
        title: '体验 Meow Wolf Santa Fe',
        kind: 'visit',
      },
      {
        time: '下午',
        duration: '1–2h',
        title: 'Santa Fe Plaza 历史广场一带漫步',
        kind: 'visit',
      },
      {
        time: '17:00 – 19:00',
        duration: '2h',
        title: 'Ten Thousand Waves 温泉',
        kind: 'visit',
      },
      {
        time: '19:15 – 21:00',
        title: 'Izanami 日料晚餐',
        kind: 'meal',
      },
      {
        time: '21:15',
        title: '回酒店休息',
        kind: 'rest',
      },
    ],
    mapPoints: [
      {
        name: 'Santa Fe Downtown',
        lat: 35.687,
        lng: -105.9378,
        website: 'https://www.santafe.org/',
      },
      {
        name: 'Meow Wolf Santa Fe',
        lat: 35.6532,
        lng: -105.9903,
        website: 'https://meowwolf.com/visit/santa-fe',
      },
      {
        name: 'Ten Thousand Waves',
        lat: 35.7048,
        lng: -105.9075,
        website: 'https://tenthousandwaves.com/',
      },
      {
        name: 'Izanami',
        lat: 35.7048,
        lng: -105.9075,
        website: 'https://tenthousandwaves.com/dining/izanami/',
      },
    ],
  },
  {
    day: 7,
    date: '2026-10-02',
    weekday: '周五',
    headline: 'Cross of the Martyrs → Madrid → Albuquerque Old Town',
    where: ['Madrid', 'Albuquerque'],
    loadLabel: '悠闲浪漫 ★☆☆☆☆',
    tip: 'Turquoise Trail 打卡；下午逛 Old Town，为次日热气球开幕就位',
    startTime: '09:00',
    endTime: '20:00',
    route: 'Santa Fe → Madrid → Albuquerque Old Town',
    totalDrive: '75 mi / 约 1.5h',
    lodging: 'Albuquerque, NM',
    drives: [
      {
        from: 'Santa Fe',
        to: 'Cross of the Martyrs',
        miles: 2,
        duration: '10 min',
      },
      {
        from: 'Cross of the Martyrs',
        to: 'Madrid',
        miles: 28,
        duration: '40 min',
      },
      {
        from: 'Madrid',
        to: 'Albuquerque Old Town',
        miles: 45,
        duration: '50 min',
      },
    ],
    activities: [
      {
        time: '上午',
        duration: '30–45m',
        title: 'Cross of the Martyrs 俯瞰 Santa Fe',
        kind: 'visit',
      },
      {
        time: '中午前后',
        duration: '1.5–2h',
        title: 'Madrid 绿松石之路嬉皮矿业小镇（Turquoise Trail）',
        kind: 'visit',
      },
      {
        time: '下午',
        duration: '2–3h',
        title: 'Albuquerque Old Town 老城漫步',
        kind: 'visit',
      },
      {
        time: '20:00',
        title: 'Albuquerque 入住，准备明早热气球',
        kind: 'rest',
      },
    ],
    mapPoints: [
      {
        name: 'Cross of the Martyrs',
        lat: 35.6915,
        lng: -105.9322,
        website: 'https://www.santafe.org/',
      },
      {
        name: 'Madrid',
        lat: 35.4006,
        lng: -106.1522,
        website: 'https://www.visitmadridnm.com/',
      },
      {
        name: 'Albuquerque Old Town',
        lat: 35.0964,
        lng: -106.6698,
        website: 'https://www.albuquerqueoldtown.com/',
      },
    ],
  },
  {
    day: 8,
    date: '2026-10-03',
    weekday: '周六',
    headline: 'Balloon Fiesta Mass Ascension 数百球齐飞，早午餐后飞回 Seattle',
    where: ['Balloon Fiesta', 'SEA'],
    loadLabel: '震撼收官 ★☆☆☆☆',
    tip: '2026 热气球节 10/3–10/11，开幕日有 Mass Ascension（约 07:00 起，视天气）；随后 Sawmill 早午餐返程',
    startTime: '05:30',
    endTime: '15:00',
    route: 'Albuquerque → Balloon Fiesta Park → Sunport → Seattle (SEA)',
    totalDrive: '10 mi / 约 0.3h',
    lodging: '飞回 Seattle（无住宿）',
    drives: [
      {
        from: 'Albuquerque Hotel',
        to: 'Albuquerque Balloon Fiesta Park',
        miles: 8,
        duration: '20 min',
      },
      {
        from: 'Albuquerque Balloon Fiesta Park',
        to: 'Albuquerque International Sunport',
        miles: 12,
        duration: '25 min',
      },
    ],
    activities: [
      {
        time: '05:30 – 06:30',
        title: '出发前往 Balloon Fiesta Park（建议早到）',
        kind: 'travel',
      },
      {
        time: '07:00 起',
        duration: '约 2h',
        title: 'Mass Ascension：数百颗热气球大规模齐飞（天气允许时）',
        kind: 'visit',
      },
      {
        time: '上午偏晚',
        title: 'Sawmill Market 早午餐',
        kind: 'meal',
      },
      {
        time: '中午前后',
        title: 'Albuquerque International Sunport：还车 + 值机',
        kind: 'travel',
      },
      {
        time: '下午',
        title: '航班返回 Seattle (SEA)',
        kind: 'travel',
      },
    ],
    mapPoints: [
      {
        name: 'Albuquerque Balloon Fiesta Park',
        lat: 35.1947,
        lng: -106.5969,
        website: 'https://www.balloonfiesta.com/',
      },
      {
        name: 'Sawmill Market',
        lat: 35.0962,
        lng: -106.6584,
        website: 'https://www.sawmillmarket.com/',
      },
      {
        name: 'Albuquerque International Sunport',
        lat: 35.0402,
        lng: -106.6091,
        website: 'https://www.abqsunport.com/',
      },
    ],
  },
]

export function formatDate(iso: string) {
  const [, month, day] = iso.split('-')
  return `${month}-${day}`
}

/** 当日开车总英里 */
export function totalMiles(day: DayPlan) {
  return day.drives.reduce((sum, d) => sum + d.miles, 0)
}

/** 要做的事项数（不含「休息」收尾） */
export function actionCount(day: DayPlan) {
  return day.activities.filter((a) => a.kind !== 'rest').length
}

/** 必做事项（去掉可选） */
export function mustDoCount(day: DayPlan) {
  return day.activities.filter((a) => a.kind !== 'rest' && !a.optional).length
}

/** 日程主列表：休息单独当收尾，不混在做事清单里 */
export function scheduleItems(day: DayPlan) {
  return day.activities.filter((a) => a.kind !== 'rest')
}

export function restItem(day: DayPlan) {
  return day.activities.find((a) => a.kind === 'rest')
}

export type DriveStop = {
  index: number
  name: string
  lat?: number
  lng?: number
  website?: string
  legFromPrev?: { miles: number; duration: string }
}

function matchPoint(name: string, points: MapPoint[]) {
  const exact = points.find((p) => p.name === name)
  if (exact) return exact
  const ranked = [...points].sort((a, b) => b.name.length - a.name.length)
  return (
    ranked.find((p) => name.includes(p.name) || p.name.includes(name)) ??
    ranked.find((p) => {
      const short = p.name
        .split(/[·/]/)[0]
        .replace(/\s+National.*$/i, '')
        .trim()
      return short.length >= 5 && (name.includes(short) || short.includes(name))
    })
  )
}

/** 分段车程与地图共用的有序停靠点（同一套编号） */
export function driveRouteStops(day: DayPlan): DriveStop[] {
  if (day.drives.length === 0) return []
  const names = [day.drives[0].from, ...day.drives.map((d) => d.to)]
  return names.map((name, i) => {
    const point = matchPoint(name, day.mapPoints)
    return {
      index: i + 1,
      name,
      lat: point?.lat,
      lng: point?.lng,
      website: point?.website,
      legFromPrev:
        i > 0
          ? {
              miles: day.drives[i - 1].miles,
              duration: day.drives[i - 1].duration,
            }
          : undefined,
    }
  })
}

/** 有坐标的停靠点，供地图绘制（编号与分段车程一致） */
export function driveRouteMapPoints(day: DayPlan): MapPoint[] {
  return driveRouteStops(day)
    .filter(
      (s): s is DriveStop & { lat: number; lng: number } =>
        typeof s.lat === 'number' && typeof s.lng === 'number',
    )
    .map((s) => ({
      name: `${s.index}. ${s.name}`,
      lat: s.lat,
      lng: s.lng,
      website: s.website,
    }))
}

/** 活动卡片上的官网：优先 activity.website，否则用地点名匹配 */
export function activityWebsite(title: string, day: DayPlan, explicit?: string) {
  if (explicit) return explicit
  const ranked = [...day.mapPoints].sort((a, b) => b.name.length - a.name.length)
  const full = ranked.find((p) => title.includes(p.name))
  if (full?.website) return full.website
  return ranked.find((p) => {
    const short = p.name
      .split(/[·/]/)[0]
      .replace(/\s+National.*$/i, '')
      .trim()
    return short.length >= 5 && title.includes(short)
  })?.website
}
