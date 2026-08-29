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
}

export type MapPoint = {
  name: string
  lat: number
  lng: number
}

export type DayPlan = {
  day: number
  date: string
  weekday: string
  route: string
  totalDrive: string
  driveNote?: string
  drives: DriveSegment[]
  activities: Activity[]
  lodging: string
  restTime: string
  mapPoints: MapPoint[]
}

export const trip = {
  title: '新墨西哥 8天7晚',
  subtitle: '最终行程总览（含每日休息时间与全英文车程明细）',
  startDate: '2026-09-27',
  endDate: '2026-10-04',
  origin: 'Seattle (SEA)',
  overviewRoute: [
    'SEA',
    'Albuquerque',
    'White Sands',
    'Carlsbad',
    'Roswell',
    'Santa Fe',
    'Bisti',
    'Mesa Verde',
    'Balloon Fiesta',
    'SEA',
  ],
}

export const days: DayPlan[] = [
  {
    day: 1,
    date: '2026-09-27',
    weekday: '周日',
    route: 'Seattle (SEA) → Albuquerque (ABQ)',
    totalDrive: '约 20 分钟',
    lodging: 'Albuquerque',
    restTime: '20:30',
    drives: [
      {
        from: 'ABQ Sunport',
        to: 'Albuquerque Downtown',
        miles: 8,
        duration: '20 min',
      },
    ],
    activities: [
      {
        time: '14:00',
        title: '落地 Albuquerque International Sunport (ABQ) 提车',
        kind: 'travel',
      },
      {
        time: '16:00 – 18:30',
        duration: '2.5h',
        title: '漫步 Albuquerque Old Town 老城街区',
        kind: 'visit',
      },
      {
        time: '19:00 – 20:00',
        title: '特色晚餐，超市采购物资',
        kind: 'meal',
      },
      { time: '20:30', title: 'Rest Time', kind: 'rest' },
    ],
    mapPoints: [
      { name: 'ABQ Sunport', lat: 35.0402, lng: -106.6091 },
      { name: 'Albuquerque Old Town', lat: 35.0964, lng: -106.6698 },
      { name: 'Albuquerque Downtown', lat: 35.0844, lng: -106.6504 },
    ],
  },
  {
    day: 2,
    date: '2026-09-28',
    weekday: '周一',
    route: 'Albuquerque → White Sands → Alamogordo',
    totalDrive: '约 3 小时 45 分',
    lodging: 'Alamogordo',
    restTime: '21:00',
    drives: [
      {
        from: 'Albuquerque',
        to: 'Alamogordo',
        miles: 210,
        duration: '3h 15m',
      },
      {
        from: 'Alamogordo',
        to: 'White Sands NP',
        miles: 15,
        duration: '15 min',
      },
      {
        from: 'White Sands NP',
        to: 'Alamogordo',
        miles: 15,
        duration: '15 min',
      },
    ],
    activities: [
      {
        time: '08:30',
        title: '出发南下',
        kind: 'travel',
      },
      {
        time: '11:45',
        duration: '30m',
        title: '打卡 PistachioLand',
        kind: 'visit',
      },
      {
        time: '14:30 – 19:00',
        duration: '4.5h',
        title: 'White Sands National Park 深度玩（滑沙/落日）',
        kind: 'visit',
      },
      {
        time: '19:15',
        title: '回 Alamogordo 晚餐（无夜间山路）',
        kind: 'meal',
      },
      { time: '21:00', title: 'Rest Time', kind: 'rest' },
    ],
    mapPoints: [
      { name: 'Albuquerque', lat: 35.0844, lng: -106.6504 },
      { name: 'PistachioLand', lat: 32.8176, lng: -106.0094 },
      { name: 'White Sands NP', lat: 32.7798, lng: -106.1714 },
      { name: 'Alamogordo', lat: 32.8995, lng: -105.9603 },
    ],
  },
  {
    day: 3,
    date: '2026-09-29',
    weekday: '周二',
    route: 'Alamogordo → Carlsbad Caverns → Roswell',
    totalDrive: '约 4 小时 15 分',
    lodging: 'Roswell',
    restTime: '20:00',
    drives: [
      {
        from: 'Alamogordo',
        to: 'Carlsbad Caverns NP',
        miles: 145,
        duration: '2h 45m',
      },
      {
        from: 'Carlsbad Caverns NP',
        to: 'Roswell',
        miles: 95,
        duration: '1h 30m',
      },
    ],
    activities: [
      {
        time: '08:00',
        title: '出发走 US-82 穿越 Sacramento Mountains 松林',
        kind: 'travel',
      },
      {
        time: '11:00 – 15:00',
        duration: '4.0h',
        title: 'Carlsbad Caverns National Park 地下溶洞探秘',
        kind: 'visit',
      },
      {
        time: '16:30 – 18:30',
        duration: '2.0h',
        title: '漫步 Roswell UFO District 外星人街区',
        kind: 'visit',
      },
      { time: '20:00', title: 'Rest Time', kind: 'rest' },
    ],
    mapPoints: [
      { name: 'Alamogordo', lat: 32.8995, lng: -105.9603 },
      { name: 'Carlsbad Caverns NP', lat: 32.1478, lng: -104.5567 },
      { name: 'Roswell UFO District', lat: 33.3943, lng: -104.523 },
    ],
  },
  {
    day: 4,
    date: '2026-09-30',
    weekday: '周三',
    route: 'Roswell → Madrid → Santa Fe',
    totalDrive: '约 3 小时 40 分',
    lodging: 'Santa Fe',
    restTime: '21:00',
    drives: [
      { from: 'Roswell', to: 'Madrid', miles: 180, duration: '3h 00m' },
      { from: 'Madrid', to: 'Santa Fe', miles: 28, duration: '40 min' },
    ],
    activities: [
      { time: '09:00', title: '出发北上', kind: 'travel' },
      {
        time: '12:00 – 13:30',
        duration: '1.5h',
        title: '游览 Madrid 艺术小镇与午餐',
        kind: 'visit',
      },
      {
        time: '14:30',
        title: '抵 Santa Fe 办入住',
        kind: 'note',
      },
      {
        time: '15:00 – 18:30',
        duration: '3.5h',
        title: 'Santa Fe Plaza、Loretto Chapel 奇迹阶梯、Canyon Road 画廊街',
        kind: 'visit',
      },
      {
        time: '18:30',
        title: 'Cross of the Martyrs 俯瞰落日',
        kind: 'visit',
      },
      { time: '21:00', title: 'Rest Time', kind: 'rest' },
    ],
    mapPoints: [
      { name: 'Roswell', lat: 33.3943, lng: -104.523 },
      { name: 'Madrid', lat: 35.4006, lng: -106.1522 },
      { name: 'Santa Fe Plaza', lat: 35.687, lng: -105.9378 },
      { name: 'Cross of the Martyrs', lat: 35.6915, lng: -105.9322 },
    ],
  },
  {
    day: 5,
    date: '2026-10-01',
    weekday: '周四',
    route: 'Santa Fe（全天沉浸艺术与双重水疗）',
    totalDrive: '约 30 分钟',
    lodging: 'Santa Fe',
    restTime: '21:15',
    drives: [
      {
        from: 'Santa Fe Downtown',
        to: 'Meow Wolf',
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
        to: 'Hotel',
        miles: 4,
        duration: '15 min',
      },
    ],
    activities: [
      {
        time: '10:30 – 13:00',
        duration: '2.5h',
        title: '沉浸式体验 Meow Wolf Santa Fe',
        kind: 'visit',
      },
      {
        time: '15:00 – 16:30',
        duration: '1.5h',
        title: '【水疗一】酒店专属 Spa 深层按摩',
        kind: 'visit',
      },
      {
        time: '17:00 – 19:00',
        duration: '2.0h',
        title: '【水疗二】Ten Thousand Waves 山间日式私汤温泉',
        kind: 'visit',
      },
      {
        time: '19:15 – 21:00',
        title: '园区内知名餐厅 Izanami 享用精致日料晚餐',
        kind: 'meal',
      },
      { time: '21:15', title: 'Rest Time', kind: 'rest' },
    ],
    mapPoints: [
      { name: 'Santa Fe Downtown', lat: 35.687, lng: -105.9378 },
      { name: 'Meow Wolf', lat: 35.6532, lng: -105.9903 },
      { name: 'Ten Thousand Waves', lat: 35.7048, lng: -105.9075 },
    ],
  },
  {
    day: 6,
    date: '2026-10-02',
    weekday: '周五',
    route: 'Santa Fe → Aztec → Bisti → Shiprock → Cortez',
    totalDrive: '约 5 小时 10 分',
    driveNote: '分 5 段短途',
    lodging: 'Cortez',
    restTime: '21:15',
    drives: [
      {
        from: 'Santa Fe',
        to: 'Aztec Ruins',
        miles: 165,
        duration: '2h 45m',
      },
      {
        from: 'Aztec Ruins',
        to: 'Farmington',
        miles: 15,
        duration: '15 min',
      },
      {
        from: 'Farmington',
        to: 'Bisti/De-Na-Zin',
        miles: 36,
        duration: '40 min',
      },
      {
        from: 'Bisti/De-Na-Zin',
        to: 'Shiprock',
        miles: 42,
        duration: '45 min',
      },
      {
        from: 'Shiprock',
        to: 'Cortez',
        miles: 42,
        duration: '45 min',
      },
    ],
    activities: [
      {
        time: '11:15 – 12:00',
        duration: '45m',
        title: '顺路看 Aztec Ruins 地下 Great Kiva',
        optional: true,
        kind: 'visit',
      },
      {
        time: '14:15 – 17:15',
        duration: '3.0h',
        title: 'Bisti/De-Na-Zin Wilderness Area 恶地徒步（外星人王座/碎蛋区）',
        kind: 'visit',
      },
      {
        time: '18:00 – 18:50',
        duration: '50m',
        title: '在 Indian Route 13 定格 Shiprock 绝美落日',
        kind: 'visit',
      },
      { time: '21:15', title: 'Rest Time', kind: 'rest' },
    ],
    mapPoints: [
      { name: 'Santa Fe', lat: 35.687, lng: -105.9378 },
      { name: 'Aztec Ruins', lat: 36.8356, lng: -107.9981 },
      { name: 'Farmington', lat: 36.7281, lng: -108.2187 },
      { name: 'Bisti/De-Na-Zin', lat: 36.2597, lng: -108.2406 },
      { name: 'Shiprock', lat: 36.6875, lng: -108.8365 },
      { name: 'Cortez', lat: 37.3489, lng: -108.5859 },
    ],
  },
  {
    day: 7,
    date: '2026-10-03',
    weekday: '周六',
    route: 'Cortez → Mesa Verde → Albuquerque → Balloon Fiesta',
    totalDrive: '约 5 小时 20 分',
    driveNote: '含山路与返程',
    lodging: 'Albuquerque',
    restTime: '21:30',
    drives: [
      {
        from: 'Cortez',
        to: 'Chapin Mesa',
        miles: 31,
        duration: '45 min',
      },
      {
        from: 'Chapin Mesa',
        to: 'Park Entrance',
        miles: 21,
        duration: '45 min',
      },
      {
        from: 'Park Entrance',
        to: 'Albuquerque',
        miles: 215,
        duration: '3h 30m',
      },
      {
        from: 'Albuquerque Hotel',
        to: 'Balloon Fiesta Park',
        miles: 10,
        duration: '20 min',
      },
    ],
    activities: [
      {
        time: '08:15 – 13:00',
        duration: '4.0h',
        title: 'Mesa Verde National Park 悬崖古城（Cliff Palace 导览 + 观景环线）',
        kind: 'visit',
      },
      {
        time: '13:45 – 17:30',
        title: '驱车返回 Albuquerque 酒店稍作休整',
        kind: 'travel',
      },
      {
        time: '18:45 – 21:00',
        duration: '2.2h',
        title:
          'Balloon Fiesta Park 参加晚场（看 Twilight Twinkle Glow™ 喷火亮灯秀与烟花）',
        kind: 'visit',
      },
      { time: '21:30', title: 'Rest Time', kind: 'rest' },
    ],
    mapPoints: [
      { name: 'Cortez', lat: 37.3489, lng: -108.5859 },
      { name: 'Chapin Mesa', lat: 37.1841, lng: -108.4887 },
      { name: 'Mesa Verde Entrance', lat: 37.3374, lng: -108.4797 },
      { name: 'Albuquerque', lat: 35.0844, lng: -106.6504 },
      { name: 'Balloon Fiesta Park', lat: 35.1947, lng: -106.5969 },
    ],
  },
  {
    day: 8,
    date: '2026-10-04',
    weekday: '周日',
    route: 'Albuquerque → Sunport (ABQ) → Seattle (SEA)',
    totalDrive: '约 20 分钟',
    lodging: '返程 Seattle',
    restTime: '自然醒',
    drives: [
      {
        from: 'Albuquerque Downtown',
        to: 'ABQ Sunport',
        miles: 8,
        duration: '20 min',
      },
    ],
    activities: [
      {
        title: '彻底睡到自然醒（告别 04:30 抢早与堵车）',
        kind: 'rest',
      },
      {
        time: '10:00 – 12:00',
        title: 'Sawmill Market 享用悠闲早午餐',
        kind: 'meal',
      },
      {
        time: '12:30',
        title: '抵达 Sunport 还车与值机',
        kind: 'travel',
      },
      {
        time: '15:00',
        title: '搭乘航班返回 Seattle (SEA)',
        kind: 'travel',
      },
    ],
    mapPoints: [
      { name: 'Sawmill Market', lat: 35.0962, lng: -106.6584 },
      { name: 'ABQ Sunport', lat: 35.0402, lng: -106.6091 },
    ],
  },
]

export function formatDate(iso: string) {
  const [, month, day] = iso.split('-')
  return `${month}-${day}`
}
