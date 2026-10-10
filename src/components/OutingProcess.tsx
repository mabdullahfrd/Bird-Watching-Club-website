import React, { useState } from 'react';
import { Calendar, Eye, PenLine, Compass, CloudSun, Clock, VolumeX } from 'lucide-react';

interface OutingProcessProps {
  lang: 'en' | 'kr';
}

export const OutingProcess: React.FC<OutingProcessProps> = ({ lang }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: '01',
      titleEn: 'Meet & Plan',
      titleKr: '모임과 사전 확인',
      taglineEn: 'Gather calmly before the walk begins',
      taglineKr: '출발 전 안전과 경로를 함께 점검합니다',
      icon: Compass,
      pointsEn: [
        'Check walking route & trail conditions',
        'Review current Daejeon morning weather and wind',
        'Coordinate public transit or walking path from Woosong',
        'Agree on expected return time so nobody feels rushed',
      ],
      pointsKr: [
        '당일 걸을 코스와 산책로 노면 상태 확인',
        '대전 아침 날씨 및 바람 세기 체크',
        '우송대에서 도보 혹은 대중교통 이동 동선 점검',
        '학업에 지장 없도록 귀가 및 해산 예정 시간 공유',
      ],
      detailEn: 'We distribute shared club binoculars and field notebooks. New members are paired with friendly returning walkers.',
      detailKr: '동아리 공용 쌍안경과 필드 노트를 나누며, 처음 온 멤버가 어색하지 않도록 따뜻하게 안내합니다.',
    },
    {
      step: '02',
      titleEn: 'Walk & Watch',
      titleKr: '천천히 걷고 바라보기',
      taglineEn: 'Slow pace, hushed voices, open senses',
      taglineKr: '서두르지 않는 걸음과 낮은 목소리',
      icon: Eye,
      pointsEn: [
        'Stay together as a gentle, compact group',
        'Walk slowly without sudden jerking movements',
        'Look up into canopies and down near stream reeds',
        'Listen for subtle rustles and territorial morning calls',
        'Observe without approaching too close or disturbing birds',
      ],
      pointsKr: [
        '너무 퍼지지 않고 컴팩트하게 함께 걷기',
        '새들이 놀라지 않도록 천천히, 부드러운 발걸음으로',
        '나뭇가지 높은 곳과 물가 갈대숲을 고루 살피기',
        '바람 소리 너머 들려오는 작은 지저귐에 귀 기울이기',
        '야생의 거리를 지키며 간섭 없이 조용히 관찰하기',
      ],
      detailEn: 'Silence is welcomed. There is no requirement to keep small talk going—simply share the peace of the trail.',
      detailKr: '굳이 억지로 말을 채우지 않아도 괜찮습니다. 자연이 들려주는 소리를 함께 나누는 것만으로 충분합니다.',
    },
    {
      step: '03',
      titleEn: 'Record & Share',
      titleKr: '기록하고 이야기 나누기',
      taglineEn: 'Turn observations into lasting memories',
      taglineKr: '순간의 관찰을 따뜻한 기록으로 남깁니다',
      icon: PenLine,
      pointsEn: [
        'Record date, exact location, and weather in field notebook',
        'Describe the bird’s actions, habits, and colors',
        'Share phone photographs and sketches in club chat',
        'Note questions: "What was it searching for under that stone?"',
        'Optional warm tea or snack near campus to close the walk',
      ],
      pointsKr: [
        '필드 노트에 날짜, 발견 장소, 당시 날씨 메모',
        '새의 생김새뿐 아니라 무엇을 먹고 있었는지 행동 기록',
        '스마트폰 사진이나 서툰 스케치도 동아리 채널에 공유',
        '궁금증 남기기: "돌 틈에서 무엇을 찾고 있었을까?"',
        '학교 근처에서 따뜻한 차나 김밥을 나누며 마무리',
      ],
      detailEn: 'Every question is celebrated. You do not need to identify the exact species to have a meaningful observation.',
      detailKr: '모든 호기심과 의문은 소중합니다. 정확한 종 이름을 알아맞히지 못해도 관찰 자체가 빛납니다.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F3] border-b border-[#8C826C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#526242] block mb-3">
            {lang === 'en' ? '04 / THE OUTING RHYTHM' : '04 / 탐조 산책의 흐름'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#242E1F] mb-4">
            {lang === 'en' ? 'How a walk unfolds.' : '윙워처스 탐조는 이렇게 진행됩니다.'}
          </h2>
          <p className="text-[#595241] font-light text-base sm:text-lg text-balance">
            {lang === 'en'
              ? 'From the morning meeting point to the final warm tea, every outing is designed to be gentle and low-stress.'
              : '아침 모임 장소에서 시작해 따뜻한 차 한 잔으로 끝나는 시간까지, 모든 과정은 여유롭고 편안합니다.'}
          </p>
        </div>

        {/* Interactive Step Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-[#EFE9DC] border border-[#8C826C]/20">
            {steps.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeStep === idx
                    ? 'bg-[#FAF8F3] text-[#242E1F] shadow-sm font-semibold'
                    : 'text-[#6C634F] hover:text-[#242E1F]'
                }`}
              >
                <span>{s.step}. </span>
                <span>{lang === 'en' ? s.titleEn : s.titleKr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Step Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-subtle">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 space-y-4">
              <span className="font-mono text-3xl sm:text-4xl text-[#395340] font-light">
                {steps[activeStep].step}
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#152219]">
                {lang === 'en' ? steps[activeStep].titleEn : steps[activeStep].titleKr}
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6D61] font-light">
                {lang === 'en' ? steps[activeStep].taglineEn : steps[activeStep].taglineKr}
              </p>
              <div className="pt-4 border-t border-subtle text-xs text-[#6D7E73] font-light">
                {lang === 'en' ? steps[activeStep].detailEn : steps[activeStep].detailKr}
              </div>
            </div>

            <div className="md:col-span-8 pl-0 md:pl-6 md:border-l border-subtle space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#687C6F] block">
                {lang === 'en' ? 'Core Practices:' : '함께 지키는 실천 사항:'}
              </span>
              <ul className="space-y-3">
                {(lang === 'en' ? steps[activeStep].pointsEn : steps[activeStep].pointsKr).map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#34443A] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#395340] mt-2 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Memorable Golden Statement */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <blockquote className="p-8 rounded-2xl bg-[#EBEBE4]/60 border border-subtle">
            <p className="text-xl sm:text-2xl md:text-3xl font-editorial italic text-[#1F3325] leading-snug">
              {lang === 'en'
                ? '“The goal is attention, not a long checklist.”'
                : '“우리의 목표는 많은 종을 체크하는 것이 아니라, 온전한 주의를 기울이는 것입니다.”'}
            </p>
            <cite className="block mt-3 text-xs font-mono tracking-widest uppercase text-[#55695C] not-italic">
              — Wing Watchers Field Philosophy
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
