import React, { useState } from 'react';
import { clubImages } from '../data/clubData';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { ambianceAudio, BirdCallId } from '../utils/audioAmbiance';

interface NoticeMoreProps {
  lang: 'en' | 'kr';
}

type CategoryKey = 'shape' | 'movement' | 'sound' | 'habitat' | 'size' | 'colour';

export const NoticeMoreInteractive: React.FC<NoticeMoreProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('shape');
  const [exploredCategories, setExploredCategories] = useState<Set<CategoryKey>>(new Set(['shape']));
  const [playingBird, setPlayingBird] = useState<string | null>(null);

  const observationDetails: Record<
    CategoryKey,
    {
      titleEn: string;
      titleKr: string;
      questionEn: string;
      questionKr: string;
      cuesEn: string[];
      cuesKr: string[];
      fieldTipEn: string;
      fieldTipKr: string;
    }
  > = {
    shape: {
      titleEn: 'Shape & Silhouette',
      titleKr: '실루엣과 체형',
      questionEn: 'What does the bird’s overall silhouette remind you of?',
      questionKr: '새의 전체적인 실루엣과 부리, 꼬리 모양은 어떠한가요?',
      cuesEn: [
        'Long dagger bill vs. short conical seed-cracking beak',
        'Crested head crown or sleek streamlined skull',
        'Long slender neck folded like an S vs. compact round body',
        'Tail shape: notched, wedge-shaped, or long paddle',
      ],
      cuesKr: [
        '물고기를 찌르는 단검형 부리 vs 씨앗을 깨는 두툼한 원추형 부리',
        '머리 깃이 솟아있는지, 둥글고 매끈한 머리인지',
        '목을 S자로 접은 형태인지, 털 뭉치처럼 통통하고 둥근 체형인지',
        '꼬리 깃이 부채꼴인지, 길게 뻗었는지, 짧게 잘려있는지',
      ],
      fieldTipEn: 'In bright dawn backlight, colors vanish. Silhouette is always your most reliable identifier.',
      fieldTipKr: '역광 속에서는 색이 보이지 않습니다. 실루엣은 언제나 가장 정직한 단서입니다.',
    },
    movement: {
      titleEn: 'Movement & Posture',
      titleKr: '움직임과 걸음걸이',
      questionEn: 'How does it walk, fly, swim, or perch?',
      questionKr: '걷는 방식, 날갯짓하는 리듬, 나뭇가지에 앉는 자세는 어떤가요?',
      cuesEn: [
        'Hops with both feet together (like sparrows) or walks foot-over-foot (like wagtails & magpies)',
        'Undulating roller-coaster flight vs. direct straight glide',
        'Tail constantly wagging up and down near water edges',
        'Spiraling vertically up tree bark (treecreepers and woodpeckers)',
      ],
      cuesKr: [
        '두 발로 깡총깡총 뛰는지(참새 등), 양발을 번갈아 성큼성큼 걷는지(할미새, 까치)',
        '물결치듯 오르내리는 비행인지, 직선으로 빠르게 활공하는지',
        '물가에서 꽁지깃을 쉴 새 없이 위아래로 까딱이는지',
        '나무줄기를 나선형으로 빙빙 타고 오르는지',
      ],
      fieldTipEn: 'Movement reveals muscle architecture and feeding habits even through dense foliage.',
      fieldTipKr: '나뭇잎에 가려져 있어도 움직이는 버릇만으로 새의 무리를 짐작할 수 있습니다.',
    },
    sound: {
      titleEn: 'Sound & Rhythm',
      titleKr: '울음소리와 리듬',
      questionEn: 'What tempo, pitch, and timbre does its call carry?',
      questionKr: '어떤 박자, 음높이, 음색으로 숲과 하늘을 채우나요?',
      cuesEn: [
        'Repetitive rhythmic cooing: "croo-coo-coo-croo" (Oriental Turtle Dove)',
        'Sharp metallic alarm rattle: "chack-chack-chack" (Magpie)',
        'Sweet fluid cascading warbles from high oak branches (Tits & Warblers)',
        'Dry mechanical tapping against hollow deadwood (Pygmy Woodpecker)',
      ],
      cuesKr: [
        '규칙적인 4음절의 부드러운 구구 구구— (멧비둘기)',
        '금속성으로 날카롭게 짖는 깍- 깍- 깍- 경계음 (까치)',
        '나뭇가지 높은 곳에서 맑게 굴러가는 지저귐 (박새, 휘파람새)',
        '마른 고목을 일정하게 두드리는 또르르륵 목탁 소리 (쇠딱따구리)',
      ],
      fieldTipEn: 'Close your eyes for 30 seconds. Birding by ear often discovers twice as many species.',
      fieldTipKr: '30초만 눈을 감아보세요. 소리에 귀 기울이면 눈으로 볼 때보다 두 배의 새를 만납니다.',
    },
    habitat: {
      titleEn: 'Habitat & Setting',
      titleKr: '서식지와 배경',
      questionEn: 'Where are you observing it right now in Daejeon?',
      questionKr: '지금 대전의 어떤 환경에서 마주치셨나요?',
      cuesEn: [
        'Emergent reeds and shallow pebble gravel (Gapcheon River)',
        'Red pine crowns and mown university turf (Woosong Campus)',
        'Dense thorny briars and wild berries (Forest trail edge)',
        'Historic tile roofs and ancient zelkovas (Uam Historical Park)',
      ],
      cuesKr: [
        '자갈과 키 큰 갈대밭이 어우러진 얕은 여울 (갑천 수변)',
        '붉은 소나무 상층부와 잔디밭 (우송대학교 캠퍼스)',
        '가시 덤불과 야생 열매가 무성한 수풀가 (산책로 가장자리)',
        '기와지붕과 수백 년 된 느티나무 고목 (우암사적공원)',
      ],
      fieldTipEn: 'Birds specialize in exact niches. Knowing the plants around you tells you which bird to expect.',
      fieldTipKr: '새들은 특화된 환경을 찾아옵니다. 주변 식생을 알면 어떤 새가 올지 알 수 있습니다.',
    },
    size: {
      titleEn: 'Size Comparison',
      titleKr: '크기 가늠하기',
      questionEn: 'Compared to common reference birds, how large is it?',
      questionKr: '우리에게 익숙한 기준 새들과 비교했을 때 어떤가요?',
      cuesEn: [
        'Sparrow-sized (12–15 cm): Fits in a coffee mug',
        'Dove / Pigeon-sized (30–33 cm): Substantial body, rounded chest',
        'Crow / Magpie-sized (45–50 cm): Bold, broad wingspan',
        'Heron / Egret-sized (90–100 cm): Stilt-legged, stands hip-high',
      ],
      cuesKr: [
        '참새 크기 (약 12~15cm): 커피 머그잔에 쏙 들어갈 만큼 작음',
        '비둘기 크기 (약 30~33cm): 도톰한 가슴과 적당한 무게감',
        '까치/까마귀 크기 (약 45~50cm): 널찍한 날개와 긴 꼬리',
        '왜가리/백로 크기 (약 90~100cm): 사람 무릎에서 허리까지 오는 긴 다리',
      ],
      fieldTipEn: 'Always use reference birds: "Is it smaller than a sparrow, or bigger than a pigeon?"',
      fieldTipKr: '항상 기준을 세우세요: "참새보다 작은가? 비둘기보다 큰가?"',
    },
    colour: {
      titleEn: 'Color & Contrast',
      titleKr: '색감과 패턴',
      questionEn: 'What distinctive markings or feather patterns draw your gaze?',
      questionKr: '어떤 독특한 무늬나 깃털의 색조가 눈길을 사로잡나요?',
      cuesEn: [
        'White wing flash visible only when taking off into flight',
        'Eyestripe or bright cheek patch contrasting against crown',
        'Scaly feather margins on the back creating a fishnet texture',
        'Iridescent sheen that shifts between navy blue and bottle green',
      ],
      cuesKr: [
        '날아오를 때만 드러나는 날개깃의 새하얀 띠',
        '눈을 가로지르는 검은 눈선이나 눈부신 흰 뺨 무늬',
        '등 깃털 가장자리의 비늘 모양 그물 패턴',
        '빛의 각도에 따라 군청색에서 에메랄드로 바뀌는 은은한 광택',
      ],
      fieldTipEn: 'Check the head and the wings first. Contrast markings are species signature badges.',
      fieldTipKr: '머리와 날개 끝을 먼저 보세요. 대비가 뚜렷한 표식은 새들의 고유한 명함입니다.',
    },
  };

  const categories: CategoryKey[] = ['shape', 'movement', 'sound', 'habitat', 'size', 'colour'];

  const handleSelectCategory = (cat: CategoryKey) => {
    setActiveCategory(cat);
    setExploredCategories((prev) => new Set([...prev, cat]));
  };

  const handlePlaySampleBird = (birdId: BirdCallId) => {
    setPlayingBird(birdId);
    ambianceAudio.playBirdCall(birdId);
    setTimeout(() => {
      setPlayingBird(null);
    }, 1200);
  };

  const current = observationDetails[activeCategory];
  const allExplored = exploredCategories.size >= 5;

  return (
    <section id="notice-more" className="py-24 bg-[#263120] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D4C79B]" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#D2C9B3]">
              {lang === 'en' ? '03 / OBSERVATION SKILLS' : '03 / 감각적 관찰 훈련'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-editorial font-light tracking-tight text-white mb-4">
            {lang === 'en' ? 'Look closer.' : '이름을 묻기 전에, 먼저 자세히 바라보기.'}
          </h2>

          <p className="text-base sm:text-lg text-[#E6DECB]/90 font-light leading-relaxed">
            {lang === 'en'
              ? 'Beginners often freeze trying to memorize Latin binomials or species names. But real birdwatching begins with curiosity: observing what the living creature is actually doing right in front of you.'
              : '초보자들은 흔히 수많은 새의 이름을 외워야 한다는 부담감에 멈칫합니다. 하지만 진짜 탐조는 눈앞의 생명이 무엇을 하고 있는지 호기심을 갖고 관찰하는 것에서 시작합니다.'}
          </p>
        </div>

        {/* 6 Category Selection Buttons */}
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8AF98] block mb-3">
            {lang === 'en' ? 'Choose an Observation Dimension:' : '관찰의 6가지 렌즈 선택:'}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {categories.map((cat, idx) => {
              const isSelected = activeCategory === cat;
              const hasExplored = exploredCategories.has(cat);
              const info = observationDetails[cat];
              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-[#FAF8F3] text-[#242E1F] border-[#FAF8F3] shadow-lg -translate-y-0.5'
                      : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-mono ${
                        isSelected ? 'text-[#6C634F]' : 'text-[#A89F88]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    {hasExplored && (
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          isSelected ? 'text-[#526242]' : 'text-[#8C826C]'
                        }`}
                      />
                    )}
                  </div>
                  <div className="font-semibold text-xs sm:text-sm truncate">
                    {lang === 'en' ? info.titleEn.split(' ')[0] : info.titleKr.split(' ')[0]}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      isSelected ? 'text-[#526242]' : 'text-[#B8AF98]'
                    }`}
                  >
                    {lang === 'en' ? info.titleEn : info.titleKr}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Panel: Photo & Bird Audio Sample */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden bg-black/30 border border-white/15 aspect-[4/3] group shadow-2xl">
              <img
                src={clubImages.riverHeron}
                alt="Grey Heron standing quietly among reeds in Daejeon river"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-mono tracking-wider text-[#FAF8F3] bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/15">
                  {lang === 'en' ? 'PRACTICE OBSERVATION' : '현장 관찰 예시'}
                </span>
                <span className="text-xs font-mono text-[#D4C79B] bg-[#242E1F]/80 backdrop-blur-md px-2.5 py-1 rounded-md">
                  Gapcheon, Daejeon
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h4 className="text-xl sm:text-2xl font-editorial font-normal mb-1">
                  {lang === 'en' ? 'Before you name the bird...' : '이 새의 이름을 묻기 전에...'}
                </h4>
                <p className="text-xs sm:text-sm text-[#D8D2BC] font-light">
                  {lang === 'en'
                    ? 'What do your eyes and ears tell you about this moment?'
                    : '당신의 눈과 귀는 지금 이 순간 무엇을 발견하고 있나요?'}
                </p>
              </div>
            </div>

            {/* Quick Audio Triggers for this section */}
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#D4C79B]" />
                <span className="text-xs font-mono text-[#E6DECB]">
                  {lang === 'en' ? 'Sample Bird Calls:' : '대표 새소리 들어보기:'}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handlePlaySampleBird('dove')}
                  className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                    playingBird === 'dove'
                      ? 'bg-[#D4C79B] text-[#242E1F] border-[#D4C79B]'
                      : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                  }`}
                >
                  {lang === 'en' ? '🕊️ Dove Coo' : '🕊️ 멧비둘기'}
                </button>
                <button
                  onClick={() => handlePlaySampleBird('tit')}
                  className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                    playingBird === 'tit'
                      ? 'bg-[#D4C79B] text-[#242E1F] border-[#D4C79B]'
                      : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                  }`}
                >
                  {lang === 'en' ? '🐤 Tit Bell' : '🐤 박새/곤줄박이'}
                </button>
                <button
                  onClick={() => handlePlaySampleBird('heron')}
                  className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                    playingBird === 'heron'
                      ? 'bg-[#D4C79B] text-[#242E1F] border-[#D4C79B]'
                      : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                  }`}
                >
                  {lang === 'en' ? '🦆 Heron Call' : '🦆 왜가리'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Detailed Dimension Card */}
          <div className="lg:col-span-6 bg-[#FAF8F3] text-[#242E1F] rounded-2xl p-7 sm:p-9 shadow-xl border border-white/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#8C826C]/20 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#526242] block mb-1">
                    {lang === 'en' ? 'FOCUS DIMENSION' : '집중 관찰 포인트'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#242E1F]">
                    {lang === 'en' ? current.titleEn : current.titleKr}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#7C7461]">
                    {exploredCategories.size}/6 {lang === 'en' ? 'Explored' : '완료'}
                  </span>
                </div>
              </div>

              {/* Guiding Question */}
              <div className="p-4 rounded-xl bg-[#EFE9DC] border border-[#8C826C]/20 mb-6">
                <p className="text-sm sm:text-base font-editorial italic text-[#2D3924]">
                  “{lang === 'en' ? current.questionEn : current.questionKr}”
                </p>
              </div>

              {/* Checklist Cues */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6B6350] block">
                  {lang === 'en' ? 'What to Look and Listen For:' : '구체적인 포착 단서:'}
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#384530]">
                  {(lang === 'en' ? current.cuesEn : current.cuesKr).map((cue, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#526242] mt-2 shrink-0" />
                      <span className="leading-relaxed">{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Field Tip */}
            <div className="pt-5 border-t border-[#8C826C]/20">
              <div className="flex items-start gap-2.5 text-xs text-[#526242]">
                <Sparkles className="w-4 h-4 shrink-0 text-[#8C826C] mt-0.5" />
                <p className="font-light italic leading-relaxed">
                  <strong>{lang === 'en' ? 'Club Field Tip: ' : '동아리 필드 팁: '}</strong>
                  {lang === 'en' ? current.fieldTipEn : current.fieldTipKr}
                </p>
              </div>

              {allExplored && (
                <div className="mt-4 p-3 rounded-lg bg-[#EAE4D5] text-xs text-[#2D3924] font-medium text-center">
                  {lang === 'en'
                    ? '✓ You have explored all 6 observational dimensions! You are ready for your first campus walk.'
                    : '✓ 6가지 관찰 차원을 모두 확인하셨습니다! 이제 첫 캠퍼스 탐조에 나설 준비가 되었습니다.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
