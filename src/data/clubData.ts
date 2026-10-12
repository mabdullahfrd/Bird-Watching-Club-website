import officialClubLogo from '../assets/images/wingwatchers_official_logo_1791614837114.jpg';

// Images for the Wing Watchers project
export const clubImages = {
  clubLogo: officialClubLogo,
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
  koreanMeetingPoint?: string;
  difficulty: 'Very Gentle' | 'Gentle Walk' | 'Moderate Stroll';
  duration: string;
  spotsTotal: number;
  spotsFilled: number;
  description: string;
  koreanDescription?: string;
  gearNeeded: string;
  koreanGearNeeded?: string;
  isExample: boolean;
  category?: 'campus' | 'river' | 'forest' | 'workshop' | 'social';
  leader?: string;
  targetSpecies?: string[];
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
  {
    id: 'act-8',
    title: 'Binocular Bootcamp & Optics Loan',
    koreanTitle: '쌍안경 부트캠프 & 무료 장비 대여',
    category: 'walk',
    duration: '30 mins',
    description: 'Hands-on practice adjusting interpupillary distance, focusing diopters, and spotting fast-moving birds in canopy shadows.',
    koreanDescription: '동아리 보유 쌍안경을 올바르게 맞추고 초점을 신속하게 잡는 법을 배우는 친절한 기초 세션.',
    takeaway: 'Demystifies optical gear so anyone can see feathers in needle-sharp clarity.',
  },
  {
    id: 'act-9',
    title: 'Bioacoustics & Soundscape Recording',
    koreanTitle: '새소리 녹음 & 자연 음향 워크숍',
    category: 'creative',
    duration: '75 mins',
    description: 'Using mobile mics and field recorders to capture morning bird duets, water sounds, and wind through campus pines.',
    koreanDescription: '스마트폰 마이크와 레코더로 이른 아침 새들의 이중창과 바람 소리를 녹음하여 나만의 사운드스케이프를 제작.',
    takeaway: 'Deep listening changes how you experience campus everyday.',
  },
  {
    id: 'act-10',
    title: 'Campus Bird-Safe Glass Project',
    koreanTitle: '버드세이버 윈도우 케어 프로젝트',
    category: 'community',
    duration: '90 mins',
    description: 'Mapping glass skywalks on campus and placing unobtrusive dot patterns to prevent window collisions.',
    koreanDescription: '캠퍼스 내 유리 난간과 통창 구역을 점검하고 조류 충돌을 방지하는 친환경 도트 테이프 부착 봉사.',
    takeaway: 'Active stewardship that directly protects local urban wildlife.',
  },
  {
    id: 'act-11',
    title: 'Dawn Chorus & Thermos Coffee',
    koreanTitle: '새벽 합창 & 모닝 보온병 커피',
    category: 'walk',
    duration: '50 mins',
    description: 'Gathering at first light as birds sing their territories awake, accompanied by warm drip coffee or barley tea.',
    koreanDescription: '해가 뜨는 순간 울려 퍼지는 새들의 여명 합창을 따뜻한 차 한 잔과 함께 온전히 맞이하는 고요한 시간.',
    takeaway: 'The quietest, most rejuvenating start to a university week.',
  },
  {
    id: 'act-12',
    title: 'Bird Trivia & Field Guide Exchange',
    koreanTitle: '동아리 버드 퀴즈 & 도감 교환회',
    category: 'community',
    duration: '60 mins',
    description: 'Casual evening meetups to test bird calls, browse vintage illustrated guidebooks, and share stickers.',
    koreanDescription: '저녁 시간에 모여 재미있는 새소리 맞히기 퀴즈를 풀고, 세계 각국의 도감과 스티커를 교환하는 파티.',
    takeaway: 'Laughter, cozy campus camaraderie, and surprising bird facts.',
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
    meetingPoint: 'Woosong West Campus Main Clock Tower (우송대 서캠퍼스 시계탑)',
    koreanMeetingPoint: '우송대 서캠퍼스 본관 시계탑 앞',
    difficulty: 'Very Gentle',
    duration: '60 mins',
    spotsTotal: 15,
    spotsFilled: 9,
    description: 'A slow morning stroll before study sessions. We will look for tits, bulbuls, and magpies among campus red pines. Binoculars provided for sharing.',
    koreanDescription: '수업 전 캠퍼스를 가볍게 걷는 아침 산책. 서캠퍼스 소나무 숲에서 박새, 직박구리, 까치를 관찰합니다. 초보자용 쌍안경 무료 대여.',
    gearNeeded: 'Comfortable sneakers, light jacket. No prior experience needed!',
    koreanGearNeeded: '편안한 운동화, 가벼운 외투. 쌍안경은 동아리에서 준비합니다.',
    category: 'campus',
    leader: 'Tariq Mansoor (SolBridge Senior, Uzbekistan) & Min-ji Park (Woosong Liaison)',
    targetSpecies: ['Oriental Magpie', 'Great Tit', 'Brown-eared Bulbul'],
    isExample: true,
  },
  {
    id: 'evt-2',
    title: 'Gapcheon River Reeds & Waterfowl Stroll',
    koreanTitle: '갑천 갈대밭 & 수변 물새 탐사',
    date: 'Sunday, Oct 18',
    time: '09:00 AM – 11:00 AM',
    meetingPoint: 'Gapcheon Ecological Park Bridge Entrance',
    koreanMeetingPoint: '갑천 생태공원 보도교 입구 (대전 유성구/서구 경계)',
    difficulty: 'Gentle Walk',
    duration: '2 hours',
    spotsTotal: 18,
    spotsFilled: 12,
    description: 'Discover grey herons, egrets, and early winter ducks along Daejeon’s widest river. We will conclude with hot tea at a nearby cafe.',
    koreanDescription: '대전의 젖줄 갑천의 넓은 갈대숲을 거닐며 왜가리, 백로, 월동 오리류를 관찰합니다. 산책 후 인근 카페에서 따뜻한 차 한 잔.',
    gearNeeded: 'Walking shoes, water bottle, camera or phone if you wish.',
    koreanGearNeeded: '도보용 편한 신발, 개인 텀블러, 카메라 또는 스마트폰.',
    category: 'river',
    leader: 'Liam Henderson (SolBridge Student, UK) & Elena Rostova (Endicott College)',
    targetSpecies: ['Grey Heron', 'Common Kingfisher', 'Spot-billed Duck', 'Little Egret'],
    isExample: true,
  },
  {
    id: 'evt-3',
    title: 'Uam Historical Park: Twilight Birds & Heritage Trees',
    koreanTitle: '우암사적공원 해질녘 탐조 & 고목 쉼터',
    date: 'Friday, Oct 23',
    time: '04:30 PM – 06:00 PM',
    meetingPoint: 'Uam Historical Park Front Gate (우암사적공원 정문)',
    koreanMeetingPoint: '우암사적공원 정문 홍살문 앞 (동구 충정로)',
    difficulty: 'Very Gentle',
    duration: '90 mins',
    spotsTotal: 14,
    spotsFilled: 7,
    description: 'Watch evening bird activity as songbirds return to their roosting perches in old zelkova trees against the autumn sunset.',
    koreanDescription: '고풍스러운 한옥과 수백 년 된 느티나무 숲 사이로 해질녘 보금자리를 찾아 돌아오는 산새들의 저녁 비행을 바라봅니다.',
    gearNeeded: 'Warm layers as temperature drops after dusk.',
    koreanGearNeeded: '일몰 후 기온이 내려가므로 따뜻한 겉옷을 준비하세요.',
    category: 'forest',
    leader: 'Amina Kadyrova (SolBridge Finance, Kazakhstan) & Su-bin Choi (Design)',
    targetSpecies: ['Varied Tit', 'Japanese Pygmy Woodpecker', 'Daurian Redstart'],
    isExample: true,
  },
  {
    id: 'evt-4',
    title: 'Daedong Sky Park & Hillside Songbirds Sunrise Walk',
    koreanTitle: '대동하늘공원 일출 & 언덕길 산새 탐조',
    date: 'Saturday, Oct 31',
    time: '07:00 AM – 08:30 AM',
    meetingPoint: 'Daedong Sky Park Famous Windmill (대동 하늘공원 풍차 앞)',
    koreanMeetingPoint: '대동하늘공원 정상 풍차 앞 벤치',
    difficulty: 'Gentle Walk',
    duration: '90 mins',
    spotsTotal: 16,
    spotsFilled: 11,
    description: 'Catch sunrise overlooking all of Daejeon while watching hillside buntings, tits, and hawks catching thermal updrafts over Daedong hill.',
    koreanDescription: '대동 언덕 위에서 대전 도심 전경과 일출을 함께 감상합니다. 언덕 능선을 타고 날아오르는 맹금류와 덤불 속 멧새들을 관찰합니다.',
    gearNeeded: 'Sturdy sneakers, windbreaker jacket, hot drink thermos.',
    koreanGearNeeded: '접지력 좋은 운동화, 방풍 자켓, 따뜻한 텀블러 음료.',
    category: 'campus',
    leader: 'Kenji Sato (Exchange Student, Japan) & Jin-woo Kang (Railroad)',
    targetSpecies: ['Meadow Bunting', 'Common Kestrel', 'Vinous-throated Parrotbill'],
    isExample: true,
  },
  {
    id: 'evt-5',
    title: 'Hanbat Arboretum: Forest Ecology & Autumn Migrants',
    koreanTitle: '한밭수목원 가을 단풍 & 산림 철새 워크',
    date: 'Saturday, Nov 07',
    time: '09:30 AM – 12:00 PM',
    meetingPoint: 'Hanbat Arboretum West Garden Fountain (한밭수목원 서원 분수대)',
    koreanMeetingPoint: '한밭수목원 서원 입구 분수대 광장',
    difficulty: 'Gentle Walk',
    duration: '2.5 hours',
    spotsTotal: 20,
    spotsFilled: 14,
    description: 'Stroll through Korea’s premier artificial urban arboretum. Thick oak leaves and wetlands host migrating thrushes, warblers, and nuthatches.',
    koreanDescription: '도심 속 대규모 인공수목원의 울창한 참나무 숲과 습지를 거닐며 남쪽으로 이동 중인 개똥지빠귀와 동고비를 만납니다.',
    gearNeeded: 'Comfortable walking shoes, field notebook or phone camera.',
    koreanGearNeeded: '걷기 편한 신발, 필기구 또는 카메라 스마트폰.',
    category: 'forest',
    leader: 'David Olatunji (Software Engineering, Nigeria) & Hannah Lee (Endicott)',
    targetSpecies: ['Eurasian Nuthatch', 'Pale Thrush', 'Brambling', 'Hawfinch'],
    isExample: true,
  },
  {
    id: 'evt-6',
    title: 'Binoculars 101 & Campus Field Drawing Workshop',
    koreanTitle: '쌍안경 마스터 & 캠퍼스 필드 드로잉 워크숍',
    date: 'Wednesday, Nov 11',
    time: '05:00 PM – 06:30 PM',
    meetingPoint: 'Woosong West Library Outdoor Pergola (서캠퍼스 도서관 야외 쉼터)',
    koreanMeetingPoint: '서캠퍼스 우송도서관 앞 야외 테라스 파골라',
    difficulty: 'Very Gentle',
    duration: '90 mins',
    spotsTotal: 12,
    spotsFilled: 6,
    description: 'Learn the exact physics of focusing binoculars like an ornithologist, followed by a beginner-friendly 30-minute quick-sketch session of campus pigeons and magpies.',
    koreanDescription: '쌍안경 초점 맞추는 공식 팁을 완벽히 익히고, 캠퍼스 잔디밭에 둘러앉아 30분 동안 쉬운 목탄/연필 크로키를 실습합니다.',
    gearNeeded: 'Sketchbook paper & pencils provided by the club!',
    koreanGearNeeded: '스케치북과 드로잉 펜은 동아리에서 무상 제공합니다.',
    category: 'workshop',
    leader: 'Chloe Martin (SolBridge Exchange, France) & Do-yun Kim (Media Arts)',
    targetSpecies: ['Rock Dove', 'Oriental Turtle Dove', 'Tree Sparrow'],
    isExample: true,
  },
  {
    id: 'evt-7',
    title: 'Yudeung Stream: Kingfisher & Wagtail Corridor',
    koreanTitle: '유등천 물총새 & 할미새 생태 탐사대',
    date: 'Sunday, Nov 15',
    time: '08:30 AM – 10:30 AM',
    meetingPoint: 'Taepyeong Bridge Underpass Riverside Plaza',
    koreanMeetingPoint: '태평교 하부 징검다리 산책로 광장',
    difficulty: 'Gentle Walk',
    duration: '2 hours',
    spotsTotal: 16,
    spotsFilled: 10,
    description: 'Track the vibrant metallic blue flash of the Common Kingfisher diving for tiny river minnows along the calm pools of Yudeung Stream.',
    koreanDescription: '유등천의 맑은 여울목에서 피라미를 사냥하는 에메랄드빛 보석 새 물총새와 꼬리를 까딱이는 백할미새를 집중 추적합니다.',
    gearNeeded: 'Warm morning clothing, binoculars if you have them.',
    koreanGearNeeded: '아침 찬바람을 막아줄 보온 의류, 개인 쌍안경(보유 시).',
    category: 'river',
    leader: 'Liam Henderson (UK) & Nguyen Thi Mai (Culinary Arts, Vietnam)',
    targetSpecies: ['Common Kingfisher', 'White Wagtail', 'Grey Wagtail', 'Little Grebe'],
    isExample: true,
  },
  {
    id: 'evt-8',
    title: 'Sikjangsan Mountain Foothill: Woodpeckers & Forest Song',
    koreanTitle: '식장산 자락 오색딱따구리 & 숲의 소리 산책',
    date: 'Saturday, Nov 21',
    time: '08:00 AM – 11:00 AM',
    meetingPoint: 'Sikjangsan Secheon Recreational Forest Main Gate',
    koreanMeetingPoint: '식장산 세천유원지 생태공원 입구 관리사무소 앞',
    difficulty: 'Moderate Stroll',
    duration: '3 hours',
    spotsTotal: 14,
    spotsFilled: 8,
    description: 'A deeply peaceful woodland trail along a babbling mountain creek. Listen for resonant drumming on dead chestnuts and spot woodpeckers scaling trunks.',
    koreanDescription: '졸졸 흐르는 세천 계곡을 따라 걷는 울창한 숲길. 고사목을 두드리는 경쾌한 드러밍 소리를 따라 오색딱따구리를 찾아봅니다.',
    gearNeeded: 'Sturdy hiking boots/trail shoes, backpack, small snack, water.',
    koreanGearNeeded: '트레킹화/등산화 필수, 배낭, 가벼운 간식, 생수 500ml.',
    category: 'forest',
    leader: 'Malik Aziz (International Relations, Uzbekistan) & Jin-woo Kang',
    targetSpecies: ['Great Spotted Woodpecker', 'Japanese Pygmy Woodpecker', 'Eurasian Jay', 'Varied Tit'],
    isExample: true,
  },
  {
    id: 'evt-9',
    title: 'Winter Waterfowl Census & Gapcheon Weir Walk',
    koreanTitle: '겨울 물새 첫 탐조 & 갑천 보 관찰회',
    date: 'Saturday, Dec 05',
    time: '09:00 AM – 11:30 AM',
    meetingPoint: 'Expo Bridge Observation Deck (엑스포다리 중앙 전망대)',
    koreanMeetingPoint: '대전 엑스포다리 중앙 전망 광장',
    difficulty: 'Gentle Walk',
    duration: '2.5 hours',
    spotsTotal: 22,
    spotsFilled: 15,
    description: 'As northern Siberia freezes over, thousands of migratory ducks settle on Daejeon’s open rivers. Learn to tell mallards, teals, and shovelers apart.',
    koreanDescription: '시베리아에서 날아온 화려한 겨울 철새들의 도착을 축하하는 대규모 관찰회. 청둥오리, 쇠오리, 넓적부리 등 다양한 오리류 구별법을 배웁니다.',
    gearNeeded: 'Extra warm coat, knit gloves, thermos flask.',
    koreanGearNeeded: '방한 패딩, 방한 장갑, 따뜻한 보온병.',
    category: 'river',
    leader: 'Sarah Jenkins (Canada, SolBridge MBA) & Elena Rostova',
    targetSpecies: ['Mallard', 'Common Teal', 'Northern Shoveler', 'Eurasian Wigeon'],
    isExample: true,
  },
  {
    id: 'evt-10',
    title: 'Year-End Sunset Walk & Hot Chocolate Warm-Up',
    koreanTitle: '연말 노을 탐조 & 핫초코 웜업 모임',
    date: 'Friday, Dec 18',
    time: '04:00 PM – 05:45 PM',
    meetingPoint: 'Woosong East Campus Student Center steps',
    koreanMeetingPoint: '우송대 동캠퍼스 학생회관 중앙 계단 앞',
    difficulty: 'Very Gentle',
    duration: '105 mins',
    spotsTotal: 20,
    spotsFilled: 16,
    description: 'Celebrate our first full term of nature walks! A short twilight loop around East Campus pine groves followed by hot chocolate and field passport stamping.',
    koreanDescription: '한 학기 동안 함께 걸어온 발자취를 돌아보는 훈훈한 연말 모임. 동캠퍼스 산책 후 핫초코를 마시며 버딩 패스포트에 기념 스탬프를 찍습니다.',
    gearNeeded: 'Cozy scarf, holiday spirit! Warm drinks provided by the club.',
    koreanGearNeeded: '따뜻한 목도리와 편안한 마음! 따뜻한 음료와 간식은 동아리 지원.',
    category: 'social',
    leader: 'Wing Watchers International Student Council (All Student Guides)',
    targetSpecies: ['Brown-eared Bulbul', 'Tree Sparrow', 'Oriental Magpie'],
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
    role: 'President (International Student Lead)',
    koreanRole: '회장 (외국인 유학생 리더)',
    summary: 'Leading the club vision, welcoming new international and exchange students, and coordinating the seasonal outing calendar.',
  },
  {
    role: 'Vice President & Korean Liaison',
    koreanRole: '부회장 (한국인 대외 협력)',
    summary: 'Bridging international and Korean members, coordinating campus permissions with Woosong University, and local transit.',
  },
  {
    role: 'Events & Route Scouting',
    koreanRole: '기획 & 코스 탐색',
    summary: 'Scouting safe, foreigner-accessible trails across Daejeon and leading weekend walks with clear English commentary.',
  },
  {
    role: 'Global Communications & Media',
    koreanRole: '글로벌 홍보 & 소통',
    summary: 'Managing multi-language announcements across KakaoTalk, WhatsApp, and Instagram for our diverse global member base.',
  },
  {
    role: 'Binoculars & Optics Custodian',
    koreanRole: '공용 장비 & 광학 관리',
    summary: 'Caring for club-owned binoculars, adjusting diopters for first-time birders, and ensuring gear is ready for every outing.',
  },
  {
    role: 'Welcoming & Cultural Bridge Lead',
    koreanRole: '웰컴 & 문화 교류 담당',
    summary: 'Greeting first-year international arrivals, exchange students, and organizing inclusive post-walk tea and meals (halal & vegetarian friendly).',
  },
];
