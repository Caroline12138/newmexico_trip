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
  /** 这个点「看什么 / 玩什么」的主题（非票务细则） */
  theme?: string
  /** 路上执行用的具体内容（票务/怎么玩/注意点） */
  detail?: string
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
  /** 体感负荷，如 ★☆☆☆☆（仅规划备注，界面不展示） */
  loadLabel?: string
  /** 执行提示（界面不展示） */
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
  /** 除已安排外，当天顺路/天气备用的可选建议 */
  suggestions?: string[]
}

export const trip = {
  title: 'New Mexico · 8天7晚',
  startDate: '2026-09-26',
  endDate: '2026-10-03',
  origin: 'Seattle (SEA)',
  nights: 7,
  style: '', // 由 tripDriveRoute() 生成：同日 / ，跨日 →
  lodgingChain: [
    'Cortez, CO',
    'Farmington',
    'Socorro',
    'Carlsbad',
    'Santa Fe ×2',
    'Albuquerque',
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
    startTime: '14:00',
    endTime: '21:00',
    route: 'Seattle (SEA) → Albuquerque → US-550 → Cortez, CO',
    totalDrive: '250 mi / 约 3.8h',
    driveNote: '景观道 US-550；建议 Cuba 或 Farmington 停晚餐',
    lodging: 'Cortez, CO',
    suggestions: [
      'Cuba 或 Farmington 加油+吃饭（US-550 中段选择少，油量低别硬撑）。',
      '若落地偏早、精力好：可在 Albuquerque Old Town 短停 45–60 分钟再北上（会压缩到 Cortez 的余量）。',
      '第一天不建议绕 Chaco / Four Corners：土路+时间风险大，留给后面有空余的日子。',
    ],
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
        detail:
          'ABQ Sunport 有租车柜台。提车后确认油量、导航离线包与应急水。出机场接 US-550 北上 Cortez。',
      },
      {
        time: '14:30',
        title: '沿 US-550 景观道北上（途经 Cuba / Farmington 可休整）',
        kind: 'travel',
        theme: '四角地区景观公路 · 行车就位',
        detail:
          'US-550 是四角地区经典景观公路，经 Cuba、Bloomfield/Farmington。沿途加油站不多，油量偏低时尽早加油。',
      },
      {
        time: '傍晚',
        title: 'Farmington 一带轻松晚餐，不赶日落',
        kind: 'meal',
        detail:
          'Farmington 餐饮选择多于 Cuba。吃完再开约 45–60 分钟到 Cortez，不必为日落压时间。',
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
    headline: 'Mesa Verde Cliff Palace + 傍晚 Shiprock',
    where: ['Mesa Verde', 'Shiprock', 'Farmington'],
    startTime: '08:00',
    endTime: '20:30',
    route: 'Cortez → Mesa Verde → Shiprock → Farmington',
    totalDrive: '75 mi / 约 1.5h',
    lodging: 'Farmington',
    suggestions: [
      'Cliff Palace 没票：改逛 Chapin Mesa 博物馆 + Spruce Tree House 观景台 / Mesa Top Loop 自驾观景点，仍能看到悬崖居所全貌。',
      '体力好且有票：可再加 Balcony House（梯子更多、更刺激），两场导览之间至少留 1.5–2 小时。',
      'Cortez 出发前可去 Mesa Verde 访客中心确认当日开放；Four Corners 纪念碑绕路约 40 分钟单向，只适合整体很早结束时。',
    ],
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
        website: 'https://www.recreation.gov/ticket/233362/ticket/502',
        theme: '先祖普韦布洛悬崖居所 · 北美最大 Cliff Palace',
        detail:
          '北美最大悬崖居所；2026 护林员导览须在 Recreation.gov 预订（提前 14 天、山区时间早 8 点放票，约 $8/人）。导览约 45–60 分钟：不平整石阶 + 约 4 架梯子，高差约 100 英尺，步行约 0.25 mi。入口到 Cliff Palace 车程请预留约 75 分钟，须提前约 15 分钟到集合点；无手机信号，票要预先下载或打印。公园海拔约 7000–7500 英尺，带水、穿防滑鞋。无票也可在观景点远眺。',
      },
      {
        time: '下午',
        title: '前往 Shiprock 一带就位',
        kind: 'travel',
        detail:
          '建议走 US-491 / Indian Service Route 13 铺装路。纳瓦霍圣地：禁止驶入通往岩体的土路，禁止攀爬靠近岩体。',
      },
      {
        time: '傍晚',
        duration: '约 1h',
        title: 'Shiprock 日落摄影',
        kind: 'visit',
        theme: '纳瓦霍圣地远眺 · 火山岩柱剪影',
        detail:
          'Tsé Bitʼaʼí「带翼之岩」，海拔约 7178 英尺火山岩柱。合法观景点：ISR 13（南侧岩脉对齐经典构图）或 US-491 路边。车辆完全停在路肩外，用长焦拍摄。日落适合从 491 看剪影；勿越野、勿用无人机（需纳瓦霍许可）。附近无设施。',
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
    headline: '清晨 Bisti 荒原徒步，午后南下 Socorro',
    where: ['Bisti/De-Na-Zin', 'Socorro'],
    startTime: '07:00',
    endTime: '20:00',
    route: 'Farmington → Bisti → Socorro',
    totalDrive: '230 mi / 约 3.75h',
    driveNote: '上午徒步后长途南下，预留补给与休息',
    lodging: 'Socorro',
    suggestions: [
      'Bisti 入口土路雨后封死：改去同区域 Ah-Shi-Sle-Pah Wilderness（同样恶地，人更少），或直接南下省体力。',
      'Farmington 出发前加满油、买够水与午餐；荒原内无补给。',
      '傍晚到 Socorro 后若还有光：可开去 Very Large Array（VLA，西侧约 50 分钟）看射电望远镜阵列，关门时间需查当日。',
    ],
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
        theme: '白垩纪恶地 · 石林与石化木摄影',
        detail:
          'BLM 管理的约 4.5 万英亩恶地：石林 hoodoo、石化木与白垩纪地层。无标记步道，靠 GPS/离线地图越野走。常用入口：Bisti Trailhead（Farmington 南 NM-371 约 36 mi → CR 7297）。停车处仅有信息牌与野餐棚，无厕所无水无信号。干天普通车通常可到；雨后泥泞可能完全不能走，出发前可问 BLM Farmington（505-564-7600）。每人至少带 2–3L 水、防晒、硬底鞋；所有垃圾带走。',
      },
      {
        time: '午后',
        title: '南下前往 Socorro 入住',
        kind: 'travel',
        detail:
          '出 Bisti 后补水加油再南下。住 Socorro 是为第二天去白沙缩短车程。',
      },
      {
        time: '20:00',
        title: 'Socorro 休息',
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
    headline: 'PistachioLand + White Sands，夜宿 Carlsbad',
    where: ['PistachioLand', 'White Sands', 'Carlsbad'],
    startTime: '08:00',
    endTime: '21:00',
    route: 'Socorro → PistachioLand → White Sands → Carlsbad',
    totalDrive: '280 mi / 约 4.75h',
    driveNote: '中午前到 Alamogordo 一带；日落后翻山进 Carlsbad',
    lodging: 'Carlsbad',
    suggestions: [
      '早上从 Socorro 南下可经 Bosque del Apache（观鸟湿地，偏候鸟季更值）；时间紧就直奔 Alamogordo。',
      '白沙若因导弹试验封路：查 NPS 通告，可改 Alamogordo 航天博物馆或 Three Rivers Petroglyphs，再决定是否改道。',
      'PistachioLand 只想拍照：巨型开心果雕塑外拍 10 分钟即可，不必硬排农场车导览。',
    ],
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
        detail: '经 I-25 / US-380 等往 Alamogordo 方向。PistachioLand 约 9:00 开门。',
      },
      {
        time: '上午',
        duration: '30–45m',
        title: 'PistachioLand 开心果园打卡',
        kind: 'visit',
        theme: '公路地标 · 巨型开心果拍照',
        detail:
          'Alamogordo 北 US-54/70，地址 7320 Hwy 54/70。招牌是约 30 英尺「世界最大开心果」雕塑。Country Store 约 9:00–17:00：免费试吃开心果与品酒（需 ID）、冰淇淋与伴手礼。农场敞篷车导览约每小时整点 10:00–16:00，约 $5/人、20–30 分钟（官网可预约）。短停自拍+店内即可，不必硬排长导览。',
      },
      {
        time: '下午 – 日落',
        duration: '约 4h',
        title: 'White Sands National Park：滑沙与日落',
        kind: 'visit',
        theme: '石膏白沙丘 · 滑沙 + 日落',
        detail:
          '世界最大石膏沙丘田。通常 7:00 开门，关门约日落前后（以官网当日时间为准）。Dunes Drive 往返约 16 mi（前段柏油、后段压实石膏路，普通车可走）。游客中心礼品店可租/买塑料滑沙碟，需打蜡才滑得动。选陡、无植被的沙坡；日落前 60–90 分钟找路边停靠点走入沙丘。注意：毗邻导弹试验场，偶发封路几小时，出发前查 NPS 通告。带足水，沙丘易迷路，始终能看见车。',
      },
      {
        time: '日落后',
        title: '驱车前往 Carlsbad 入住',
        kind: 'travel',
        detail: '出园后东行约 2.5–3h。山区夜路注意动物与油量。',
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
    headline: 'Carlsbad 溶洞探秘 → Roswell 飞碟麦当劳打卡 → 进驻 Santa Fe',
    where: ['Carlsbad Caverns', 'Roswell', 'Santa Fe'],
    startTime: '08:00',
    endTime: '21:00',
    route: 'Carlsbad Caverns → Roswell → Santa Fe',
    totalDrive: '292 mi / 约 4.8h',
    driveNote: '溶洞约 3h；Roswell 仅飞碟麦当劳快闪打卡',
    lodging: 'Santa Fe',
    suggestions: [
      '溶洞想多看：优先 Natural Entrance 下坡进洞再逛 Big Room；腿脚紧或赶时间则电梯直达。',
      '时间富余可加 Living Desert Zoo（Carlsbad 沙漠动植物），但会挤压到 Santa Fe 的余量。',
      '按计划只做飞碟麦当劳快闪；UFO 博物馆好看但易拖 1–2 小时。',
    ],
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
        title: 'Carlsbad Caverns National Park',
        kind: 'visit',
        website: 'https://www.recreation.gov/ticket/234637/ticket/10086811',
        theme: '世界级石灰岩溶洞 · Big Room 自助探索',
        detail:
          '需先在 Recreation.gov 订「Timed Entry」（约 $1/人，只锁入洞时段），到游客中心再买门票（16 岁及以上约 $15，年票可用）。游客中心约 9:00–17:00；最晚入洞约 14:30，电梯最晚出洞约 16:45。自助两条线：① Natural Entrance 下坡步行约 1.25 mi 进洞再接 Big Room；② 电梯直达 Big Room（环线约 1.25 mi）。护林员付费小团导览目前多暂停，以官网为准。洞内恒温湿冷，带外套与防滑鞋；禁触摸岩层。早场有利于赶 Roswell + Santa Fe。',
      },
      {
        time: '中午前后',
        duration: '20–30m',
        title: 'Roswell UFO McDonald’s（720 N Main）',
        kind: 'visit',
        theme: '飞碟造型麦当劳 · 公路快闪打卡',
        detail:
          '主街上飞碟造型麦当劳，专为外拍打卡。停车拍照或买杯饮料即可，不必进 UFO 博物馆（省时间赶 Santa Fe）。',
      },
      {
        time: '下午',
        title: '北上 Santa Fe',
        kind: 'travel',
        detail: '约 3h 车程。预留进市区与找酒店时间，目标约 16:45 入住。',
      },
      {
        time: '16:45',
        title: '进驻 Santa Fe 已订酒店',
        kind: 'note',
        detail: '连住两晚；确认明早 Meow Wolf / 温泉预约。',
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
    headline: 'Santa Fe：Meow Wolf 沉浸艺术 + Plaza 老城漫步 + 温泉 + Izanami 日料',
    where: ['Santa Fe'],
    startTime: '10:30',
    endTime: '21:15',
    route: 'Santa Fe（市内短途）',
    totalDrive: '15 mi / 约 0.5h',
    lodging: 'Santa Fe',
    suggestions: [
      'Plaza 时段可加：Canyon Road 画廊街、圣方济大教堂、Loretto 螺旋楼梯教堂（步行可达，选 1–2 个即可）。',
      '想看艺术史：Georgia O’Keeffe Museum 很贴 Santa Fe，但要单独买票、占下午时间。',
      '这一天已满，不建议再加 Bandelier（来回约 2h+）。',
    ],
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
        title: 'Meow Wolf Santa Fe（House of Eternal Return）',
        kind: 'visit',
        theme: '沉浸式叙事艺术 · 可探索房间',
        detail:
          '地址 1352 Rufina Cir。沉浸式艺术装置：从看似普通的房子进入 85+ 房间的可探索叙事空间（可走可爬）。需选时段购票（成人常见约 $32 起，孩子更低；以官网日历为准），时段易满。一般营业约 10:00–20:00，以购票页为准。穿舒适鞋；可下 App 看隐藏剧情。馆内有 Float 餐饮。建议预留 2–3 小时。',
      },
      {
        time: '下午',
        duration: '1–2h',
        title: 'Santa Fe Plaza 一带漫步',
        kind: 'visit',
        theme: 'Plaza 老城广场 · 廊道与教堂漫步',
        detail:
          '美国最古老首府之一的中心广场：Palace of the Governors 廊道、圣方济大教堂、Canyon Road 画廊区都在步行范围内。适合咖啡、逛店、补水休息，不必排满博物馆。',
      },
      {
        time: '17:00 – 19:00',
        duration: '2h',
        title: 'Ten Thousand Waves 温泉',
        kind: 'visit',
        theme: '日式温泉 · 松柏林汤屋',
        detail:
          '日式温泉度假村（松柏林中，距市中心约 10–15 分钟车程）。所有服务须预约：私人汤屋套间可提前约 45 天订；「Reserved Community Soaking」限约 10 人、多只能提前 72 小时订。电话 505-982-9304 / 官网订。含热水池、部分带桑拿/更衣室；饮酒后不建议入浴。',
      },
      {
        time: '19:15 – 21:00',
        title: 'Izanami 日料晚餐',
        kind: 'meal',
        theme: '温泉园内居酒屋 · 小盘日料',
        detail:
          '温泉园区内的居酒屋风小盘料理，日本酒选择很多。室内外座位；强烈建议预约（505-428-6409 或官网）。可与泡汤同晚衔接。',
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
    headline: '十字架山俯瞰 → Madrid 矿镇画廊村 → Albuquerque 老城',
    where: ['Madrid', 'Albuquerque'],
    startTime: '09:00',
    endTime: '20:00',
    route: 'Santa Fe → Madrid → Albuquerque Old Town',
    totalDrive: '75 mi / 约 1.5h',
    lodging: 'Albuquerque',
    suggestions: [
      'Turquoise Trail 上可顺路停 Cerrillos（更安静的旧矿镇），Madrid 人太多时可作备选。',
      '到 ABQ 后若还有精力：Petroglyph National Monument 或 Balloon Museum（为明早热身），别玩太晚。',
      '酒店尽量选北城 / 靠近 Balloon Fiesta Park 或 I-25，明早 4 点出门更省事。',
    ],
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
        theme: '十字架观景 · 俯瞰 Santa Fe 老城',
        detail:
          'Paseo de Peralta 附近小山丘上的白色十字架纪念地，有铺装步道与说明牌。可俯瞰老城区与 Sangre de Cristo 山。从 Plaza 步行约 15 分钟，或就近停车短停拍照。',
      },
      {
        time: '中午前后',
        duration: '1.5–2h',
        title: 'Madrid（Turquoise Trail）',
        kind: 'visit',
        theme: '绿松石之路矿镇 · 画廊与主街',
        detail:
          'NM-14 绿松石之路上的旧煤矿小镇（读作 MAD-rid）。1970 年代起被艺术家盘活：画廊、古着店、咖啡馆沿公路一字排开，周末人多需注意路边停车。可步行逛主街、午饭，不必安排固定景点。',
      },
      {
        time: '下午',
        duration: '2–3h',
        title: 'Albuquerque Old Town',
        kind: 'visit',
        theme: '1706 年老城 Plaza · 土坯廊道',
        detail:
          '1706 年建城核心：Plaza、圣菲利普内里教堂、土坯店铺与廊道手作市集。适合散步、买绿松石小物、晚饭。为明早 Balloon Fiesta 选靠近北城或方便上高速的酒店更省事。',
      },
      {
        time: '20:00',
        title: 'Albuquerque 入住',
        kind: 'rest',
        detail: '明早约 4:00–4:30 就要出门，提前设闹钟、备好现金停车费。',
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
    headline: 'Balloon Fiesta Mass Ascension，早午餐后返程 Seattle',
    where: ['Balloon Fiesta', 'SEA'],
    startTime: '05:30',
    endTime: '15:00',
    route: 'Albuquerque → Balloon Fiesta Park → Sunport → Seattle (SEA)',
    totalDrive: '10 mi / 约 0.3h',
    lodging: '飞回 Seattle（无住宿）',
    suggestions: [
      '现场停车常只收现金约 $20；也可买 Park & Ride（含接驳+门票）。',
      'Mass Ascension 若因风取消：可改去 Anderson Abruzzo Balloon Museum，或直接早去机场从容还车。',
      'Sawmill 若排队太长：机场航站楼餐饮也可，优先保住安检余量。',
    ],
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
        title: '出发前往 Balloon Fiesta Park',
        kind: 'travel',
        detail:
          '地址约 4401 Alameda Blvd NE。周末早场门约 4:30 开；建议 4:00–4:30 到。现场停车约 $20/场次且常只收现金；也可买 Park & Ride（含接驳+门票）。官网 2026 年票约 4/3 起售，早场成人约 $20，12 岁及以下免费。',
      },
      {
        time: '07:00 起',
        duration: '约 2h',
        title: 'Mass Ascension（天气允许时）',
        kind: 'visit',
        theme: '世界最大热气球升空 · Mass Ascension',
        detail:
          '世界最大热气球节开幕周末常规项目：Dawn Patrol 日出前试风，约 7:00 起两波共 500+ 球升空，过程约 2 小时。完全看天气，风力过大可能取消。可在场地上近距离看充气与起飞。早场时段大约到 11:00。',
      },
      {
        time: '上午偏晚',
        title: 'Sawmill Market 早午餐',
        kind: 'meal',
        theme: '旧锯木厂美食集市 · 多档口早午餐',
        detail:
          '旧锯木厂改建的美食集市（多档口），适合快速吃一顿再赶机场。确认航班时间，预留还车与安检。',
      },
      {
        time: '中午前后',
        title: 'Sunport：还车 + 值机',
        kind: 'travel',
        detail: '按租车合约加油还车；国际/国内安检高峰请再留余量。',
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

/** 展示用地名：仅 Cortez 标州，其余去掉 , NM */
export function formatPlace(name: string) {
  const trimmed = name.trim()
  if (/^cortez\b/i.test(trimmed)) return 'Cortez, CO'
  return trimmed.replace(/,\s*NM\b/i, '').replace(/,\s*New Mexico\b/i, '').trim()
}

/** 同日地点用 / 连接 */
export function formatDayWhere(day: DayPlan) {
  return day.where.map(formatPlace).join(' / ')
}

/**
 * 整趟自驾文案：同一天用 /，不同天用 →
 * 例：Albuquerque / Cortez, CO → Mesa Verde / Shiprock / Farmington → …
 */
export function tripDriveRoute() {
  return days.map(formatDayWhere).join(' → ')
}

/** 从 totalDrive（如 "250 mi / 约 3.8h"）取出行车时长 */
export function driveDurationLabel(day: DayPlan) {
  const parts = day.totalDrive.split('/').map((s) => s.trim())
  if (parts.length >= 2) return parts[parts.length - 1]
  return day.totalDrive
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

function matchActivityPoint(title: string, day: DayPlan) {
  const ranked = [...day.mapPoints].sort((a, b) => b.name.length - a.name.length)
  const full = ranked.find((p) => title.includes(p.name))
  if (full) return full
  return ranked.find((p) => {
    const short = p.name
      .split(/[·/]/)[0]
      .replace(/\s+National.*$/i, '')
      .trim()
    return short.length >= 5 && title.includes(short)
  })
}

/** 活动卡片上的官网：优先 activity.website，否则用地点名匹配 */
export function activityWebsite(title: string, day: DayPlan, explicit?: string) {
  if (explicit) return explicit
  return matchActivityPoint(title, day)?.website
}

/** 活动对应地图点（有坐标则可导航） */
export function activityMapPoint(title: string, day: DayPlan) {
  return matchActivityPoint(title, day)
}

/** 路上「下一站」：分段车程的第一个目的地（有坐标） */
export function nextDriveTarget(day: DayPlan): DriveStop | null {
  const stops = driveRouteStops(day)
  const dest = stops.find(
    (s, i) =>
      i > 0 && typeof s.lat === 'number' && typeof s.lng === 'number',
  )
  return dest ?? null
}
