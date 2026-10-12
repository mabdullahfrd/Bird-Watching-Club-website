import magpieImg from '../assets/images/bird_oriental_magpie_1791727982471.jpg';
import greatTitImg from '../assets/images/bird_great_tit_1791727782932.jpg';
import kingfisherImg from '../assets/images/bird_kingfisher_1791727729290.jpg';
import greyHeronImg from '../assets/images/bird_grey_heron_1791728031352.jpg';
import mandarinDuckImg from '../assets/images/bird_mandarin_duck_1791727754114.jpg';
import daurianRedstartImg from '../assets/images/bird_daurian_redstart_1791727810242.jpg';
import pygmyWoodpeckerImg from '../assets/images/bird_pygmy_woodpecker_1791727851653.jpg';
import bulbulImg from '../assets/images/bird_brown_bulbul_1791727893616.jpg';
import barnSwallowImg from '../assets/images/bird_barn_swallow_1791727940257.jpg';
import turtleDoveImg from '../assets/images/hero_cinematic_bird_1790579429363.jpg';
import { BirdCallId } from '../utils/audioAmbiance';

export interface BirdQuizQuestion {
  id: string;
  image: string;
  nameEn: string;
  nameKr: string;
  nameRomanized: string;
  scientificName: string;
  callId?: BirdCallId;
  soundPhonetic: string;
  habitatInDaejeon: {
    en: string;
    kr: string;
  };
  visualClue: {
    en: string;
    kr: string;
  };
  keyFieldMarks: {
    en: string[];
    kr: string[];
  };
  funFact: {
    en: string;
    kr: string;
  };
  options: {
    en: string;
    kr: string;
    romanized?: string;
  }[];
  correctIndex: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Campus & Garden' | 'River & Wetland' | 'Forest & Foothill';
}

export const BIRD_QUIZ_DATA: BirdQuizQuestion[] = [
  {
    id: 'bird-magpie',
    image: magpieImg,
    nameEn: 'Oriental Magpie',
    nameKr: '까치',
    nameRomanized: 'Kkachi',
    scientificName: 'Pica serica',
    callId: 'magpie',
    soundPhonetic: '"Kack-kack-kack!" rapid sharp chatter',
    habitatInDaejeon: {
      en: 'Woosong West Campus lawn & roadside Korean red pines',
      kr: '우송대 서캠퍼스 잔디밭 및 대전 가로수 솔밭',
    },
    visualClue: {
      en: 'Notice the glossy metallic blue-green sheen on the wings and long tail, pure white belly, and jaunty swagger.',
      kr: '날개와 긴 꼬리의 신비로운 에메랄드·청람색 광택과 눈처럼 새하얀 배를 눈여겨보세요.',
    },
    keyFieldMarks: {
      en: [
        'Pure white belly and shoulder scapular patches contrasting with jet-black head',
        'Long graduated tail reflecting iridescent blue-green hues in direct sun',
        'Stout black bill, often seen hopping confidently on campus grass',
      ],
      kr: [
        '검은 머리와 대조되는 선명한 흰색 배와 어깨 깃',
        '햇빛 아래서 영롱하게 빛나는 긴 계단식 꼬리 깃털',
        '캠퍼스 잔디밭을 당당하게 걸어 다니는 튼튼한 검은 부리',
      ],
    },
    funFact: {
      en: 'In Korea, the magpie is celebrated as an auspicious bearer of good news. They can pass mirror self-recognition tests!',
      kr: '한국에서는 기쁜 소식을 전하는 길조로 사랑받으며, 거울 속 자신을 인지할 수 있는 놀라운 지능을 지녔습니다!',
    },
    options: [
      { en: 'Oriental Magpie', kr: '까치', romanized: 'Kkachi' },
      { en: 'Eurasian Jay', kr: '어치', romanized: 'Eochi' },
      { en: 'Brown-eared Bulbul', kr: '직박구리', romanized: 'Jikbakguri' },
      { en: 'Large-billed Crow', kr: '큰부리까마귀', romanized: 'Keunburi-kkamagwi' },
    ],
    correctIndex: 0,
    difficulty: 'Beginner',
    category: 'Campus & Garden',
  },
  {
    id: 'bird-kingfisher',
    image: kingfisherImg,
    nameEn: 'Common Kingfisher',
    nameKr: '물총새',
    nameRomanized: 'Mulchongsae',
    scientificName: 'Alcedo atthis',
    callId: 'kingfisher',
    soundPhonetic: '"Chee-keee!" sharp high-pitched piercing whistle',
    habitatInDaejeon: {
      en: 'Clear pools of Daedong Stream & Gapcheon River willow perches',
      kr: '대동천 맑은 여울 및 갑천 버드나무 가지',
    },
    visualClue: {
      en: 'Look at the electric turquoise-blue back feathers and warm orange-chestnut underbelly, paired with a long dagger bill.',
      kr: '물 위를 비추는 눈부신 청록색 등 깃털과 붉은 오렌지빛 배, 물고기를 낚아채는 긴 단검 부리를 확인하세요.',
    },
    keyFieldMarks: {
      en: [
        'Electric azure-blue and turquoise upperparts that catch sunlight',
        'Vivid orange-chestnut belly, chin, and ear coverts',
        'Disproportionately long, sharp dagger-like bill for underwater fishing dives',
      ],
      kr: [
        '물빛을 닮은 찬란한 코발트 에메랄드빛 등 깃털',
        '선명한 오렌지 밤색 가슴과 배',
        '물속 피라미를 정확히 사냥하기 위한 곧고 날카로운 부리',
      ],
    },
    funFact: {
      en: 'The aerodynamic bill of the Kingfisher inspired the nose design of Japanese bullet trains to eliminate tunnel sonic booms.',
      kr: '물에 뛰어들 때 저항이 없는 물총새의 부리 구조는 고속철도 신칸센의 앞머리 설계 모델이 되었습니다.',
    },
    options: [
      { en: 'Blue Rock Thrush', kr: '바다직박구리', romanized: 'Bada-jikbakguri' },
      { en: 'Common Kingfisher', kr: '물총새', romanized: 'Mulchongsae' },
      { en: 'Fairy Pitta', kr: '팔색조', romanized: 'Palsaekjo' },
      { en: 'White Wagtail', kr: '알락할미새', romanized: 'Allak-halmisae' },
    ],
    correctIndex: 1,
    difficulty: 'Intermediate',
    category: 'River & Wetland',
  },
  {
    id: 'bird-great-tit',
    image: greatTitImg,
    nameEn: 'Great Tit',
    nameKr: '박새',
    nameRomanized: 'Baksae',
    scientificName: 'Parus minor',
    callId: 'tit',
    soundPhonetic: '"Tsi-tsi-pin! Tsi-tsi-pin!" cheerful high song',
    habitatInDaejeon: {
      en: 'Woosong East & West campus garden trees and pine groves',
      kr: '우송대 캠퍼스 정원수 및 대전 도심 솔밭',
    },
    visualClue: {
      en: 'Notice the crisp black central "necktie" running down the white breast and the clean white cheek patch.',
      kr: '하얀 가슴 한가운데를 가로지르는 선명한 검은색 "넥타이" 줄무늬와 하얀 뺨을 확인하세요.',
    },
    keyFieldMarks: {
      en: [
        'Black central necktie stripe down breast (wider on males)',
        'Glossy blue-black cap and bright white cheek patches',
        'Olive-green back and grey-blue wings with a thin white wingbar',
      ],
      kr: [
        '가슴 중앙에 뚜렷한 검은색 넥타이 띠 (수컷일수록 폭이 넓음)',
        '윤기 나는 검은 머리덮개와 순백색 뺨',
        '등의 올리브 녹색과 날개의 은은한 흰 줄무늬',
      ],
    },
    funFact: {
      en: 'Great Tits have a compositional syntax: they combine different alarm notes in specific grammar rules to warn neighbours!',
      kr: '박새는 특정 문법 규칙에 맞춰 음표를 조합하여 천적의 종류와 위험을 동료들에게 알리는 언어 능력을 가지고 있습니다!',
    },
    options: [
      { en: 'Marsh Tit', kr: '쇠박새', romanized: 'Soe-baksae' },
      { en: 'Varied Tit', kr: '곤줄박이', romanized: 'Gonjulbagi' },
      { en: 'Great Tit', kr: '박새', romanized: 'Baksae' },
      { en: 'Vinous-throated Parrotbill', kr: '붉은머리오목눈이', romanized: 'Omoknuni' },
    ],
    correctIndex: 2,
    difficulty: 'Beginner',
    category: 'Campus & Garden',
  },
  {
    id: 'bird-mandarin-duck',
    image: mandarinDuckImg,
    nameEn: 'Mandarin Duck',
    nameKr: '원앙',
    nameRomanized: 'Won-ang',
    scientificName: 'Aix galericulata',
    soundPhonetic: '"Uwick-uwick" gentle whistling water call',
    habitatInDaejeon: {
      en: 'Hanbat Arboretum lotus ponds & Yudeung Stream tranquil bends',
      kr: '한밭수목원 연못 및 유등천 고요한 여울',
    },
    visualClue: {
      en: 'Admire the unbelievable ornamental colors: prominent orange sail feathers rising on the back and multicolored crest.',
      kr: '등 뒤로 솟아오른 주황빛 부채꼴 날개 깃(돛 깃)과 화려한 무지갯빛 볏을 확인하세요.',
    },
    keyFieldMarks: {
      en: [
        'Large fan-shaped orange "sail" feathers standing upright from back',
        'Crest of glossy copper, emerald, and cobalt flowing down the nape',
        'Delicate red-pink bill and white crescent eyebrow stripe',
      ],
      kr: [
        '등 위로 도드라지게 솟아난 부채 모양의 주황색 은행잎 깃',
        '구리빛, 청록빛, 감청색이 조화롭게 흐르는 우아한 머리 볏',
        '붉은 분홍빛 부리와 눈 뒤로 길게 뻗은 흰색 반달 눈썹선',
      ],
    },
    funFact: {
      en: 'In traditional Korean culture, wooden carved Mandarin Ducks (Wonang-set) are gifted at weddings symbolizing lifelong devotion.',
      kr: '한국 전통 혼례에서 평생의 사랑과 화목을 기원하며 목각 원앙 한 쌍을 선물하는 풍습이 있습니다.',
    },
    options: [
      { en: 'Mallard', kr: '청둥오리', romanized: 'Cheongdung-ori' },
      { en: 'Spot-billed Duck', kr: '흰뺨검둥오리', romanized: 'Huimbaem-geomdung-ori' },
      { en: 'Mandarin Duck', kr: '원앙', romanized: 'Won-ang' },
      { en: 'Common Teal', kr: '쇠오리', romanized: 'Soe-ori' },
    ],
    correctIndex: 2,
    difficulty: 'Intermediate',
    category: 'River & Wetland',
  },
  {
    id: 'bird-daurian-redstart',
    image: daurianRedstartImg,
    nameEn: 'Daurian Redstart',
    nameKr: '딱새',
    nameRomanized: 'Ttaksae',
    scientificName: 'Phoenicurus auroreus',
    callId: 'tit',
    soundPhonetic: '"Ttak! Ttak! Tsi-tsi-pin" clicking pebbles like stones',
    habitatInDaejeon: {
      en: 'Uam Historical Park stone walls & hillside autumn orchards',
      kr: '우암사적공원 돌담길 및 산기슭 가을 과수원',
    },
    visualClue: {
      en: 'Notice the bold contrast: silver-grey cap, jet-black throat and face, vivid bright orange belly, and white wing patch.',
      kr: '은백색 정수리, 검은 얼굴 가면, 선명한 주황색 배와 날개의 흰 점 무늬를 주목하세요.',
    },
    keyFieldMarks: {
      en: [
        'Brilliant orange underparts and rump that tremble when perching',
        'Silver-white cap contrasting sharply with pitch-black face and throat',
        'Clear white patch (wing triangle) visible when perching on exposed twigs',
      ],
      kr: [
        '나뭇가지에 앉아 꼬리를 상하로 까딱거릴 때 빛나는 주황색 배',
        '검은 얼굴 가면과 턱밑을 돋보이게 하는 은빛 정수리',
        '어두운 날개 중앙에 선명하게 박힌 흰색 삼각 반점',
      ],
    },
    funFact: {
      en: 'Its Korean name "Ttaksae" comes from its sharp territorial call, which sounds exactly like two pebbles striking together ("Ttak! Ttak!").',
      kr: '한국어 이름 "딱새"는 조약돌 두 개를 딱딱 부딪치는 듯한 특유의 경계 울음소리에서 유래되었습니다.',
    },
    options: [
      { en: 'Daurian Redstart', kr: '딱새', romanized: 'Ttaksae' },
      { en: 'Red-flanked Bluetail', kr: '유리딱새', romanized: 'Yuri-ttaksae' },
      { en: 'Siberian Stonechat', kr: '검은딱새', romanized: 'Geomeun-ttaksae' },
      { en: 'Blue-and-White Flycatcher', kr: '쇠유리딱새', romanized: 'Soe-yuritaksae' },
    ],
    correctIndex: 0,
    difficulty: 'Intermediate',
    category: 'Forest & Foothill',
  },
  {
    id: 'bird-pygmy-woodpecker',
    image: pygmyWoodpeckerImg,
    nameEn: 'Japanese Pygmy Woodpecker',
    nameKr: '쇠딱따구리',
    nameRomanized: 'Soe-ttakttaguri',
    scientificName: 'Yungipicus kizuki',
    callId: 'woodpecker',
    soundPhonetic: '"Gii-gii!" raspy call + rapid wooden drumming',
    habitatInDaejeon: {
      en: 'Sikjangsan mountain trails & old campus oak groves',
      kr: '식장산 숲길 참나무 및 캠퍼스 고목',
    },
    visualClue: {
      en: 'Look at the horizontal black-and-white ladder stripes running across its back as it climbs tree bark vertically.',
      kr: '나무줄기를 수직으로 타고 오를 때 등에 나타나는 흑백 가로 사다리 줄무늬를 확인하세요.',
    },
    keyFieldMarks: {
      en: [
        'Small sparrow-sized body with barred black-and-white horizontal ladder pattern',
        'Stiff tail feathers used as a tripod support against tree trunks',
        'Short chisel-like bill actively tapping for hidden insect larvae',
      ],
      kr: [
        '참새 크기만 한 작은 몸집에 등에 선명한 가로 사다리 줄무늬',
        '나무줄기를 단단히 지지하는 빳빳한 쐐기형 꼬리 깃',
        '나무껍질 속 벌레를 찾아 두드리는 짧고 단단한 정 모양 부리',
      ],
    },
    funFact: {
      en: 'Korea’s smallest woodpecker! Its spongy skull cushions impacts so it never gets concussions while drumming.',
      kr: '한국에서 가장 작은 딱따구리입니다! 충격을 흡수하는 두개골 구조 덕분에 시속 20km로 나무를 쪼아도 뇌진탕에 걸리지 않습니다.',
    },
    options: [
      { en: 'Great Spotted Woodpecker', kr: '오색딱따구리', romanized: 'Osaek-ttakttaguri' },
      { en: 'Japanese Pygmy Woodpecker', kr: '쇠딱따구리', romanized: 'Soe-ttakttaguri' },
      { en: 'Grey-headed Woodpecker', kr: '청딱따구리', romanized: 'Cheong-ttakttaguri' },
      { en: 'Eurasian Nuthatch', kr: '동고비', romanized: 'Donggobi' },
    ],
    correctIndex: 1,
    difficulty: 'Intermediate',
    category: 'Forest & Foothill',
  },
  {
    id: 'bird-grey-heron',
    image: greyHeronImg,
    nameEn: 'Grey Heron',
    nameKr: '왜가리',
    nameRomanized: 'Waegari',
    scientificName: 'Ardea cinerea',
    callId: 'heron',
    soundPhonetic: '"Kraa-ank!" prehistoric harsh croak in flight',
    habitatInDaejeon: {
      en: 'Gapcheon River gravel shallows & Daedong Stream stone weirs',
      kr: '갑천 자갈 여울 및 대동천 징검다리 웅덩이',
    },
    visualClue: {
      en: 'Standing nearly one meter tall like a statue in shallow river waters with an elegant long dagger yellow beak and black crest plumes.',
      kr: '강변 얕은 물가에 석상처럼 고요히 서 있는 1미터 키의 대형 회색 몸체와 노란 단검 부리를 보세요.',
    },
    keyFieldMarks: {
      en: [
        'Tall wading bird with silver-grey back, white neck with vertical black streaks',
        'Slender black crest plumes draping backward from head',
        'Long sharp yellowish-orange bill and slow majestic wingbeats in flight',
      ],
      kr: [
        '은회색 날개와 목 앞면에 검은 줄무늬가 있는 대형 섭금류',
        '머리 뒤로 우아하게 드리워진 가느다란 검은 댕기 깃',
        '날카로운 긴 황색 부리와 크고 느긋한 날갯짓 비행',
      ],
    },
    funFact: {
      en: 'Despite having a massive 1.8-meter wingspan, Grey Herons weigh only about 1.5 kg thanks to ultralight hollow avian bones.',
      kr: '날개 폭이 1.8미터에 달하지만, 속이 빈 뼈 구조 덕분에 몸무게는 약 1.5kg에 불과합니다.',
    },
    options: [
      { en: 'Great Egret', kr: '대백로', romanized: 'Dae-baekno' },
      { en: 'Black-crowned Night Heron', kr: '해오라기', romanized: 'Haeoragi' },
      { en: 'Grey Heron', kr: '왜가리', romanized: 'Waegari' },
      { en: 'Oriental White Stork', kr: '황새', romanized: 'Hwangsae' },
    ],
    correctIndex: 2,
    difficulty: 'Beginner',
    category: 'River & Wetland',
  },
  {
    id: 'bird-brown-bulbul',
    image: bulbulImg,
    nameEn: 'Brown-eared Bulbul',
    nameKr: '직박구리',
    nameRomanized: 'Jikbakguri',
    scientificName: 'Hypsipetes amaurotis',
    callId: 'bulbul',
    soundPhonetic: '"Pee-yo! Pyeot-pyeot!" loud gregarious song',
    habitatInDaejeon: {
      en: 'Everywhere across Daejeon—campus fruiting shrubs and persimmon trees',
      kr: '대전 시내 전역—캠퍼스 화단 및 감나무 숲',
    },
    visualClue: {
      en: 'Notice the slate grey feathers, messy spiky head crest, and the distinctive warm chestnut-brown patch on its ear/cheek.',
      kr: '회색빛 몸체와 삐죽삐죽 솟은 머리 깃, 그리고 귀 뒤편의 붉은 밤색 뺨 반점을 주목하세요.',
    },
    keyFieldMarks: {
      en: [
        'Warm rusty chestnut-brown ear-covert patch behind the eye',
        'Spiky slight crest giving it an inquisitive, energetic appearance',
        'Medium-long tail and undulating roller-coaster flapping flight style',
      ],
      kr: [
        '눈 뒤 뺨 쪽에 자리 잡은 선명한 밤색(갈색) 귀 깃털 무늬',
        '호기심 어린 인상을 주는 뾰족한 머리 관깃',
        '날개를 접었다 펴며 파도타듯 날아가는 파동형 비행',
      ],
    },
    funFact: {
      en: 'They adore sweet autumn persimmons and camellia flower nectar, acting as vital seed dispersers in Korean urban ecosystems.',
      kr: '달콤한 가을 감과 동백꽃 꿀을 좋아하여 도심 속 씨앗과 꽃가루를 퍼뜨리는 생태계의 부지런한 정원사입니다.',
    },
    options: [
      { en: 'Brown-eared Bulbul', kr: '직박구리', romanized: 'Jikbakguri' },
      { en: 'Pale Thrush', kr: '흰배지빠귀', romanized: 'Huinbae-jibbagwi' },
      { en: 'Eurasian Tree Sparrow', kr: '참새', romanized: 'Chamsae' },
      { en: 'Eurasian Jay', kr: '어치', romanized: 'Eochi' },
    ],
    correctIndex: 0,
    difficulty: 'Beginner',
    category: 'Campus & Garden',
  },
  {
    id: 'bird-barn-swallow',
    image: barnSwallowImg,
    nameEn: 'Barn Swallow',
    nameKr: '제비',
    nameRomanized: 'Jebi',
    scientificName: 'Hirundo rustica',
    callId: 'swallow',
    soundPhonetic: '"Tsiv-tsiv-vit!" swift musical twitter in flight',
    habitatInDaejeon: {
      en: 'Traditional market eaves & Daedong Stream open skies',
      kr: '대전 전통시장 처마 밑 및 대동천 상공',
    },
    visualClue: {
      en: 'Look at the glossy metallic deep navy back, rich chestnut-red throat and forehead, creamy belly, and deeply forked tail streamer.',
      kr: '감청색 등 깃털과 붉은 갈색 턱밑, 그리고 깊게 갈라진 날렵한 V자형 제비꼬리를 확인하세요.',
    },
    keyFieldMarks: {
      en: [
        'Deeply forked "swallowtail" with long outer tail streamer feathers',
        'Glossy metallic blue-navy upperparts and dark chestnut chin',
        'Agile, sweeping flight hunting airborne insects right above rivers',
      ],
      kr: [
        '깊게 갈라진 특유의 V자형 날렵한 꼬리 깃털',
        '빛에 따라 청남색으로 반짝이는 등과 붉은 갈색 턱',
        '물 위를 스치듯 빠르게 활공하며 곤충을 사냥하는 비행술',
      ],
    },
    funFact: {
      en: 'Featured in famous Korean folklore "Heungbu and Nolbu", they migrate thousands of miles and return faithfully to the exact same rooftop nest.',
      kr: '흥부전 설화의 주인공으로, 매년 수천 킬로미터를 날아 자신이 태어난 처마 밑 둥지를 정확히 다시 찾아옵니다.',
    },
    options: [
      { en: 'Barn Swallow', kr: '제비', romanized: 'Jebi' },
      { en: 'Pacific Swift', kr: '칼새', romanized: 'Kalsae' },
      { en: 'House Martin', kr: '귀제비', romanized: 'Gwi-jebi' },
      { en: 'Asian House Martin', kr: '흰털발제비', romanized: 'Hwintelbal-jebi' },
    ],
    correctIndex: 0,
    difficulty: 'Beginner',
    category: 'Campus & Garden',
  },
  {
    id: 'bird-turtle-dove',
    image: turtleDoveImg,
    nameEn: 'Oriental Turtle Dove',
    nameKr: '멧비둘기',
    nameRomanized: 'Met-bidulgi',
    scientificName: 'Streptopelia orientalis',
    callId: 'dove',
    soundPhonetic: '"Croo-coo-coo-croo" rhythmic 4-tone woodland coo',
    habitatInDaejeon: {
      en: 'Daedong Stream walkway weeping willows & campus gardens',
      kr: '대동천 버드나무 산책로 및 우송대 캠퍼스 화단',
    },
    visualClue: {
      en: 'Look at the scalloped rufous-brown wing feathers and the iconic black-and-silver diagonal striped neck patch.',
      kr: '날개의 붉은 갈색 비늘 무늬와 목덜미 옆면의 선명한 흑백 사선 줄무늬 패치를 확인하세요.',
    },
    keyFieldMarks: {
      en: [
        'Prominent black-and-silver striped diagonal badge on side of neck',
        'Warm rufous scaling pattern across wing coverts unlike city pigeons',
        'Soft pinkish-vinous breast and musical whistling wing flight noise',
      ],
      kr: [
        '목 옆면에 훈장처럼 박힌 흑백 사선 줄무늬 패치',
        '일반 도시 비둘기와 다른 날개의 따뜻한 붉은 갈색 비늘 무늬',
        '은은한 포도주빛 가슴과 날아오를 때 나는 독특한 날개 바람 소리',
      ],
    },
    funFact: {
      en: 'Unlike feral city pigeons, Oriental Turtle Doves are wild forest birds that mate for life and deliver rhythmic dawn woodland calls.',
      kr: '도심 속 집비둘기와 달리 숲과 하천에 사는 야생 비둘기로, 평생 한 짝과 해로하며 대전의 아침을 깨우는 정겨운 4음절 소리를 냅니다.',
    },
    options: [
      { en: 'Rock Dove (Feral Pigeon)', kr: '집비둘기', romanized: 'Jip-bidulgi' },
      { en: 'Oriental Turtle Dove', kr: '멧비둘기', romanized: 'Met-bidulgi' },
      { en: 'Little Egret', kr: '쇠백로', romanized: 'Soe-baekno' },
      { en: 'Common Cuckoo', kr: '뻐꾸기', romanized: 'Bbeokkugi' },
    ],
    correctIndex: 1,
    difficulty: 'Beginner',
    category: 'Campus & Garden',
  },
];
