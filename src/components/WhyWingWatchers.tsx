import React from 'react';
import { Compass, Eye, HeartHandshake, Trees, ArrowRight } from 'lucide-react';

interface WhyWingWatchersProps {
  lang: 'en' | 'kr';
}

export const WhyWingWatchers: React.FC<WhyWingWatchersProps> = ({ lang }) => {
  const cards = [
    {
      num: '01',
      titleEn: 'Slow Down',
      titleKr: '걸음을 늦추다',
      descEn: 'Take a calm break from relentless deadlines, tests, and screens. Spend quiet time in Daejeon’s morning light.',
      descKr: '끝없는 마감과 스크린에서 벗어나 신선한 공기와 아침 햇살 속에서 머리를 비워냅니다.',
      icon: Trees,
    },
    {
      num: '02',
      titleEn: 'Notice More',
      titleKr: '더 깊이 바라보다',
      descEn: 'Learn to recognize birds through silhouette, movement, sound, and habitat without memorizing names.',
      descKr: '이름을 외우려 애쓰지 않아도, 실루엣과 날갯짓, 울음소리와 서식지만으로 생명을 발견하는 눈을 기릅니다.',
      icon: Eye,
    },
    {
      num: '03',
      titleEn: 'Global Community',
      titleKr: '글로벌 유대 & 친구',
      descEn: 'Run by international students, bringing together peers from 30+ countries and Korean students for relaxed, English-first nature walks.',
      descKr: '외국인 유학생들이 직접 이끄는 글로벌 동아리로, 30여 개국 학생들과 한국인 학우들이 편안한 분위기 속에서 대화를 나누며 국경을 초월한 친구가 됩니다.',
      icon: HeartHandshake,
    },
    {
      num: '04',
      titleEn: 'Keep Exploring',
      titleKr: '새로운 대전을 만나다',
      descEn: 'Discover parks, hidden streams, wooded footpaths, and river wetlands across Daejeon.',
      descKr: '늘 보던 학교 앞 골목을 넘어 대동천, 갑천 갈대밭, 식장산 숲길까지 대전의 숨은 자연을 탐험합니다.',
      icon: Compass,
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F3] border-b border-[#8C826C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with clean vertical rhythm */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#526242] block mb-3">
            {lang === 'en' ? '02 / WHY WING WATCHERS' : '02 / 왜 윙워처스인가'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#242E1F] mb-4">
            {lang === 'en' ? 'A quiet rhythm in a busy semester.' : '숨 가쁜 학기 중 마주하는 고요한 리듬.'}
          </h2>
          <p className="text-[#595241] font-light text-base sm:text-lg leading-relaxed">
            {lang === 'en'
              ? 'Birdwatching is simply the art of giving your full attention to the living world around you.'
              : '탐조는 복잡한 학문이 아닙니다. 살아 숨 쉬는 주변 세계에 온전한 주의를 기울이는 연습입니다.'}
          </p>
        </div>

        {/* Four Balanced Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="group p-8 sm:p-10 rounded-2xl bg-[#EFE9DC]/60 hover:bg-[#EFE9DC] border border-[#8C826C]/25 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-sm tracking-widest text-[#7C7461]">
                      {card.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/80 text-[#2D3924] border border-[#8C826C]/20 group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#242E1F] tracking-tight mb-3">
                    {lang === 'en' ? card.titleEn : card.titleKr}
                  </h3>

                  <p className="text-[#524B3B] text-base leading-relaxed font-light">
                    {lang === 'en' ? card.descEn : card.descKr}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-[#8C826C]/15 flex items-center justify-between text-xs text-[#7C7461] font-mono">
                  <span>WING WATCHERS ETHOS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200 text-[#2D3924]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
