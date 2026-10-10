// Images generated for the Wing Watchers project
export const clubImages = {
  clubLogo: '/src/assets/images/wingwatchers_official_logo_1791614837114.jpg',
  heroBird: '/src/assets/images/hero_cinematic_bird_1790579429363.jpg',
  campusTrail: '/src/assets/images/campus_nature_intro_1790579445021.jpg',
  riverHeron: '/src/assets/images/daejeon_river_birds_1790579456395.jpg',
  magpie: '/src/assets/images/field_note_magpie_1790579468402.jpg',
  studentWalk: '/src/assets/images/student_walk_nature_1790579481170.jpg',
};

export interface FieldNote {
  id: string;
  species: string;
  koreanName: string;
  date: string;
  location: string;
  habitat: string;
  weather: string;
  confidence: 'Curious Beginner' | 'Likely Match' | 'Confirmed Observation';
  observer: string;
  whatINoticed: string;
  whatImStillWondering: string;
  image: string;
  tag: string;
  isExample: boolean;
}

export interface Activity {
  id: string;
  title: string;
  koreanTitle: string;
  category: 'walk' | 'creative' | 'community';
  duration: string;
  description: string;
  koreanDescription: string;
  takeaway: string;
}

export interface SeasonInfo {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  title: string;
  koreanTitle: string;
  theme: string;
  koreanTheme: string;
  description: string;
  birdsToNotice: string[];
  recommendedPace: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  koreanTitle: string;
  date: string;
  time: string;
  meetingPoint: string;
  difficulty: 'Very Gentle' | 'Gentle Walk' | 'Moderate Stroll';
  duration: string;
  spotsTotal: number;
  spotsFilled: number;
  description: string;
  gearNeeded: string;
  isExample: boolean;
}

export interface Waypoint {
  id: string;
  name: string;
  koreanName: string;
  distanceFromCampus: string;
  environment: string;
  highlight: string;
  notableBirds: string[];
  bestTime: string;
  note: string;
}

export const sampleFieldNotes: FieldNote[] = [
  {
    id: 'fn-1',
    species: 'Oriental Magpie',
    koreanName: '까치 (Kkachi)',
    date: '2026-09-18',
    location: 'Woosong West Campus Lawn & Pine Grove',
    habitat: 'Open turf adjacent to mature Korean red pines',
    weather: 'Crisp morning, 18°C, clear skies',
    confidence: 'Confirmed Observation',
    observer: 'Campus Morning Walkers',
    whatINoticed: 'In direct sunlight, the black tail feathers flashed a brilliant metallic petroleum emerald and deep violet. Walked with a jaunty swagger, tilting its head sideways before picking up an acorn.',
    whatImStillWondering: 'Why do they prefer constructing large spherical twig nests in the highest fork of roadside pines rather than deeper in the woodland?',
    image: clubImages.magpie,
    tag: 'Campus Resident',
    isExample: true,
  },
  {
    id: 'fn-2',
    species: 'Oriental Turtle Dove',
    koreanName: '멧비둘기 (Met-bidulgi)',
    date: '2026-09-21',
    location: 'Daedong Stream Walkway near Woosong',
    habitat: 'Weeping willow branch overhanging running water',
    weather: 'Misty overcast dawn, 15°C',
    confidence: 'Confirmed Observation',
    observer: 'SolBridge Student Observer',
    whatINoticed: 'Distinctive black-and-silver striped patch on the side of the neck. Soft four-tone rhythmic cooing ("croo-coo-coo-croo") that echoed under the pedestrian bridge before motor traffic began.',
    whatImStillWondering: 'How does their subtle wing whistling sound change between takeoff and a glide across the stream?',
    image: clubImages.heroBird,
    tag: 'Woodland Songbird',
    isExample: true,
  },
  {
    id: 'fn-3',
    species: 'Grey Heron',
    koreanName: '왜가리 (Waegari)',
    date: '2026-09-24',
    location: 'Gapcheon River Reeds, Daejeon',
    habitat: 'Shallow gravel riffles surrounded by tall Phragmites reeds',
    weather: 'Golden hour twilight, 21°C',
    confidence: 'Confirmed Observation',
    observer: 'River Walk Group',
    whatINoticed: 'Stood completely motionless for over seven minutes with neck folded back into an S-curve, then struck downward faster than the eye could register, surfacing with a small silver minnow.',
    whatImStillWondering: 'Do individual herons guard territorial sections of the riverbed across consecutive seasons, or do they rotate based on water depth?',
    image: clubImages.riverHeron,
    tag: 'River Wetland',
    isExample: true,
  },
  {
    id: 'fn-4',
    species: 'Vinous-throated Parrotbill',
    koreanName: '붉은머리오목눈이 (Bulgeunmeori-omoknuni)',
    date: '2026-09-25',
    location: 'Sikjangsan Forest Footpath Boundary',
    habitat: 'Dense blackberry brambles and wild raspberry thicket',
    weather: 'Bright morning breeze, 19°C',
    confidence: 'Likely Match',
    observer: 'Weekend Trail Walkers',
    whatINoticed: 'A lively flock of twelve tiny chestnut-brown balls bouncing through the brambles like popcorn. Constant high-pitched chirping chatter ("seed-seed-seed") keeping the flock connected.',
    whatImStillWondering: 'How do they navigate dense thorny brush at high speed without catching their long round tails on briers?',
    image: clubImages.campusTrail,
    tag: 'Thicket Flocks',
    isExample: true,
  },
];

export const exploreWaypoints: Waypoint[] = [
  {
    id: 'wp-1',
    name: 'Woosong Campus Red Pine Trails',
    koreanName: '우송대 캠퍼스 소나무 숲길',
    distanceFromCampus: '0 min (On Campus)',
    environment: 'Academic campus, red pines, turf groves',
    highlight: 'Accessible in between classes for a 15-minute quiet reset.',
    notableBirds: ['Oriental Magpie', 'Tree Sparrow', 'Brown-eared Bulbul', 'Great Tit'],
    bestTime: '07:30 – 08:30 (Before morning lectures)',
    note: 'Look high in the pine tops for foraging titmice andListen for cheerful chirps near the student union courtyard.',
  },
  {
    id: 'wp-2',
    name: 'Daedong Stream Natural Corridor',
    koreanName: '대동천 수변 산책로',
    distanceFromCampus: '8 min walk from East Campus',
    environment: 'Urban stream, emergent reeds, stone weirs',
    highlight: 'Gentle paved walking path following the slow water flow toward Gapcheon.',
    notableBirds: ['White Wagtail', 'Spot-billed Duck', 'Common Kingfisher', 'Grey Heron'],
    bestTime: 'Morning or late afternoon golden hour',
    note: 'Spot-billed ducks often sleep on warm rocks in midstream during noon sun.',
  },
  {
    id: 'wp-3',
    name: 'Uam Historical Park & Heritage Pond',
    koreanName: '우암사적공원 연못 & 고목원',
    distanceFromCampus: '15 min walk / 5 min bus',
    environment: 'Traditional architecture, ancient zelkova trees, lotus pond',
    highlight: 'Historic tranquility with old-growth canopies providing shelter for forest songbirds.',
    notableBirds: ['Eurasian Nuthatch', 'Japanese Pygmy Woodpecker', 'Varied Tit', 'Daurian Redstart'],
    bestTime: 'Early morning weekends',
    note: 'Woodpeckers can often be located by their rhythmic tapping on dead oak branches.',
  },
  {
    id: 'wp-4',
    name: 'Gapcheon River Ecological Wetlands',
    koreanName: '갑천 생태습지 & 억새밭',
    distanceFromCampus: '20 min via Daejeon Metro / Bus',
    environment: 'Wide river, sandbars, dense reed beds, flood plains',
    highlight: 'Daejeon’s premier bird haven where seasonal migrants rest during spring and autumn.',
    notableBirds: ['Great Egret', 'Mallard', 'Eurasian Teal', 'Little Grebe', 'Black-crowned Night Heron'],
    bestTime: 'Autumn & Winter mornings',
    note: 'Bring binoculars if possible, or share club binoculars to observe wading birds across the wide water.',
  },
  {
    id: 'wp-5',
    name: 'Sikjangsan Foothill Woodlands',
    koreanName: '식장산 숲길 트레일',
    distanceFromCampus: '25 min bus from Woosong',
    environment: 'Deciduous mountain forest, mossy boulders, mountain streams',
    highlight: 'Step into true mountain wilderness with expansive views over Daejeon valley.',
    notableBirds: ['Eurasian Jay', 'Oriental Dollarbird', 'Pale Thrush', 'Coal Tit'],
    bestTime: 'Spring migration & crisp autumn mornings',
    note: 'Gentle hiking boots or sturdy sneakers recommended for uneven forest terrain.',
  },
];

export const clubActivities: Activity[] = [
  {
    id: 'act-1',
    title: 'Campus Bird Walks',
    koreanTitle: '캠퍼스 아침 산책',
    category: 'walk',
    duration: '45 mins',
    description: 'Short morning walks around familiar Woosong campus paths before classes begin. A calm, gentle way to awaken attention.',
    koreanDescription: '수업 전 우송대 캠퍼스를 천천히 거닐며 익숙한 풍경 속 새들의 소리에 귀 기울이는 45분의 아침 산책.',
    takeaway: 'Notice how much nature exists right outside the lecture hall.',
  },
  {
    id: 'act-2',
    title: 'Riverside Observation',
    koreanTitle: '수변 생태 관찰',
    category: 'walk',
    duration: '90 mins',
    description: 'Slow observation along Daedong Stream and Gapcheon riverbanks. Watching herons fish, ducks preen, and swallows glide over water.',
    koreanDescription: '대동천과 갑천변에서 물새들의 사냥과 휴식을 서두르지 않고 관찰하는 시간.',
    takeaway: 'Learn patience and observe natural animal behavior without rushing.',
  },
  {
    id: 'act-3',
    title: 'Photo Walks & Habitats',
    koreanTitle: '필드 포토 워크',
    category: 'creative',
    duration: '2 hours',
    description: 'Casual photography sessions focusing on birds, light through branches, and textures of Daejeon nature. Any phone or camera is welcome.',
    koreanDescription: '스마트폰이든 카메라든 상관없이, 자연의 빛과 새들의 실루엣을 기록하는 포토 워크.',
    takeaway: 'Focus on framing and patience rather than expensive telephoto lenses.',
  },
  {
    id: 'act-4',
    title: 'Birding Passport',
    koreanTitle: '버딩 패스포트 기록',
    category: 'creative',
    duration: 'Ongoing',
    description: 'A physical and digital booklet to stamp routes, sketch feather shapes, and write field notes for personal memories.',
    koreanDescription: '나만의 산책 경로와 스케치, 질문을 모아가는 윙워처스 공식 버딩 여권.',
    takeaway: 'A tactile keepsake of your university outdoor memories.',
  },
  {
    id: 'act-5',
    title: 'Seasonal Photo Challenge',
    koreanTitle: '계절별 포토 챌린지',
    category: 'creative',
    duration: 'Monthly',
    description: 'A creative prompt each month (e.g. "Morning Dew & Feathers", "Silhouettes at Dusk", "Autumn Berry Foragers").',
    koreanDescription: '매달 새로운 자연의 테마를 정해 사진으로 공유하고 소통하는 친근한 챌린지.',
    takeaway: 'Encourages seeing ordinary campus days through an artistic lens.',
  },
  {
    id: 'act-6',
    title: 'Bring-a-Friend Walks',
    koreanTitle: '친구와 함께 산책',
    category: 'community',
    duration: '60 mins',
    description: 'Low-key, extra-friendly walks where members bring roommates or classmates who have never watched birds before.',
    koreanDescription: '새에 대해 아무것도 모르는 룸메이트나 친구도 부담 없이 함께할 수 있는 산책.',
    takeaway: 'Zero intimidation. Just coffee, fresh air, and good company.',
  },
  {
    id: 'act-7',
    title: 'Shared Meals & Field Recap',
    koreanTitle: '산책 후 따뜻한 식사',
    category: 'community',
    duration: '60 mins',
    description: 'Concluding weekend outings with kimbap, bakery treats, or warm noodles nearby while looking over sketches and photos.',
    koreanDescription: '산책을 마친 뒤 캠퍼스 인근에서 따뜻한 식사와 차를 나누며 서로의 사진과 감상을 나누는 시간.',
    takeaway: 'Where casual acquaintances turn into lasting campus friends.',
  },
];

export const seasonalCalendar: SeasonInfo[] = [
  {
    season: 'spring',
    title: 'Beginner Bird ID & Song Awakening',
    koreanTitle: '봄 — 기초 조류 관찰 & 새들의 지저귐',
    theme: 'Learn the basics together as buds burst open',
    koreanTheme: '봄꽃과 함께 찾아오는 소리를 배우는 계절',
    description: 'As trees leaf out across Woosong, birds sing at peak volume to establish breeding territories. Perfect for beginners to learn to distinguish birds by sound.',
    birdsToNotice: ['Brown-eared Bulbul', 'Oriental Turtle Dove', 'Japanese Pygmy Woodpecker', 'Great Tit'],
    recommendedPace: '1 main outing each month + optional weekend morning tea strolls',
  },
  {
    season: 'summer',
    title: 'Local Nature Walk & Shaded Canopies',
    koreanTitle: '여름 — 그늘진 수변과 숲길 산책',
    theme: 'Explore cooler routes along waterways',
    koreanTheme: '이른 아침 강변과 나무 그늘을 따라 걷는 여유',
    description: 'Avoid midday heat by walking along Daedong Stream at dawn or under ancient zelkovas at Uam Historical Park. Watch juvenile birds learning to forage.',
    birdsToNotice: ['Grey Heron', 'Little Egret', 'Barn Swallow', 'Black-crowned Night Heron'],
    recommendedPace: 'Early 07:00 AM outings + shaded evening bird walks',
  },
  {
    season: 'autumn',
    title: 'Migration Challenge & Rich Colors',
    koreanTitle: '가을 — 철새 이동 관찰 & 단풍 트레일',
    theme: 'Notice seasonal movement across Korea',
    koreanTheme: '대전을 거쳐 남쪽으로 이동하는 철새들의 물결',
    description: 'Korea sits on the East Asian–Australasian Flyway. Millions of birds journey south. Gapcheon wetland fills with migratory waterfowl and colorful autumn light.',
    birdsToNotice: ['Daurian Redstart', 'Rustic Bunting', 'Eurasian Wigeon', 'Mallard'],
    recommendedPace: 'Biannual wetlands expedition + campus leaf walks',
  },
  {
    season: 'winter',
    title: 'Year-End Recap & Winter Waterfowl',
    koreanTitle: '겨울 — 한 해의 기록 정리 & 겨울 철새',
    theme: 'Save records and welcome new student leaders',
    koreanTheme: '앙상한 나뭇가지 속 선명한 관찰과 동아리 인수인계',
    description: 'With bare branches, spotting birds is easier than ever! Waterfowl gather on ice-free river sections. We bind the yearly journal and welcome the next leadership cohort.',
    birdsToNotice: ['Spot-billed Duck', 'Common Teal', 'Eurasian Jay', 'Oriental Magpie'],
    recommendedPace: 'Clear sunny afternoon walks + cozy indoor archive sessions',
  },
];

export const sampleEvents: ClubEvent[] = [
  {
    id: 'evt-1',
    title: 'Campus Morning Walk & Pine Grove Discovery',
    koreanTitle: '캠퍼스 아침 산책 & 솔밭 관찰회',
    date: 'Saturday, Oct 10',
    time: '08:30 AM – 09:30 AM',
    meetingPoint: 'Woosong West Campus Main Clock Tower',
    difficulty: 'Very Gentle',
    duration: '60 mins',
    spotsTotal: 15,
    spotsFilled: 9,
    description: 'A slow morning stroll before study sessions. We will look for tits, bulbuls, and magpies among campus red pines. Binoculars provided for sharing.',
    gearNeeded: 'Comfortable sneakers, light jacket. No prior experience needed!',
    isExample: true,
  },
  {
    id: 'evt-2',
    title: 'Gapcheon River Reeds & Waterfowl Stroll',
    koreanTitle: '갑천 갈대밭 & 수변 물새 탐사',
    date: 'Sunday, Oct 18',
    time: '09:00 AM – 11:00 AM',
    meetingPoint: 'Gapcheon Ecological Park Bridge Entrance',
    difficulty: 'Gentle Walk',
    duration: '2 hours',
    spotsTotal: 18,
    spotsFilled: 12,
    description: 'Discover grey herons, egrets, and early winter ducks along Daejeon’s widest river. We will conclude with hot tea at a nearby cafe.',
    gearNeeded: 'Walking shoes, water bottle, camera or phone if you wish.',
    isExample: true,
  },
  {
    id: 'evt-3',
    title: 'Uam Historical Park: Twilight Birds & Heritage Trees',
    koreanTitle: '우암사적공원 해질녘 탐조 & 고목 쉼터',
    date: 'Friday, Oct 23',
    time: '04:30 PM – 06:00 PM',
    meetingPoint: 'Uam Historical Park Front Gate (우암사적공원 정문)',
    difficulty: 'Very Gentle',
    duration: '90 mins',
    spotsTotal: 14,
    spotsFilled: 7,
    description: 'Watch evening bird activity as songbirds return to their roosting perches in old zelkova trees against the autumn sunset.',
    gearNeeded: 'Warm layers as temperature drops after dusk.',
    isExample: true,
  },
];

export const ethicalPrinciples = [
  {
    number: '01',
    title: 'Keep Distance',
    koreanTitle: '적정 거리 유지하기',
    description: 'Watch wildlife without encroaching. If a bird pauses its feeding, raises its head alarmingly, or shifts restlessly, you are too close. Step back quietly.',
  },
  {
    number: '02',
    title: 'Keep Noise Low',
    koreanTitle: '조용하고 침착한 태도',
    description: 'Speak in hushed whispers. Silence phone ringers. Let the natural soundscape remain undisturbed for birds and fellow nature lovers.',
  },
  {
    number: '03',
    title: 'Leave No Trace',
    koreanTitle: '흔적 남기지 않기 (LNT)',
    description: 'Take only photographs and quiet memories. Pack out every scrap of litter, snack wrapper, and stray thread. Leave habitat pristine.',
  },
  {
    number: '04',
    title: 'Never Chase or Feed Wildlife',
    koreanTitle: '먹이 주거나 쫓지 않기',
    description: 'Bread and processed snacks disrupt natural digestion and induce unnatural dependence. Let wild animals find their own seasonal food.',
  },
  {
    number: '05',
    title: 'Stay Away from Nests',
    koreanTitle: '둥지와 번식지 보호',
    description: 'Never approach or photograph nesting birds or vulnerable fledglings. Human scent trails can draw predators to breeding grounds.',
  },
  {
    number: '06',
    title: 'Follow Local Guidance',
    koreanTitle: '산책로 준수 & 안내 따르기',
    description: 'Stick to established walking trails to prevent soil compaction and root damage. Respect park signs, wetland barriers, and university regulations.',
  },
];

export const leadershipRoles = [
  {
    role: 'President',
    koreanRole: '회장',
    summary: 'Guiding the club vision, coordinating campus permissions, and greeting new members.',
  },
  {
    role: 'Vice President',
    koreanRole: '부회장',
    summary: 'Bridging Korean and international students, helping organize logistics and meeting spots.',
  },
  {
    role: 'Events & Route Planning',
    koreanRole: '기획 & 코스 탐색',
    summary: 'Scouting safe walking routes around Daejeon, monitoring weather, and scheduling monthly dates.',
  },
  {
    role: 'Photography & Media',
    koreanRole: '사진 & 아카이브',
    summary: 'Curating the digital field journal, gathering member photos, and maintaining ethical photo practices.',
  },
  {
    role: 'Communications',
    koreanRole: '홍보 & 소통',
    summary: 'Managing announcements on campus bulletin boards, club group chats, and student sign-ups.',
  },
  {
    role: 'Members & Walkers',
    koreanRole: '회원 & 탐조자',
    summary: 'The heart of Wing Watchers. Showing up with curiosity, walking together, and sharing attention.',
  },
];
