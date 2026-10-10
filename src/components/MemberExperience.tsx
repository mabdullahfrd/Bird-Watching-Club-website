import React from 'react';
import { Check, X as Cross } from 'lucide-react';

interface MemberExperienceProps {
  lang: 'en' | 'kr';
}

export const MemberExperience: React.FC<MemberExperienceProps> = ({ lang }) => {
  const notNeeded = [
    { en: 'Previous birdwatching experience', kr: '이전의 조류 관찰 경험' },
    { en: 'Expensive high-magnification binoculars', kr: '수십만 원대 고가 쌍안경' },
    { en: 'Professional photography equipment', kr: '무거운 전문 카메라나 망원렌즈' },
    { en: 'Specialist biological knowledge', kr: '어려운 생물학적 지식이나 학명' },
  ];

  const toBring = [
    { en: 'Curiosity about living creatures', kr: '살아있는 생명에 대한 열린 호기심' },
    { en: 'Comfortable walking shoes & weather layers', kr: '걷기 편한 운동화와 편안한 옷차림' },
    { en: 'Respect for wildlife & natural silence', kr: '야생동물에 대한 존중과 조용한 태도' },
    { en: 'A willingness to pause and explore', kr: '잠시 멈추어 서서 둘러보려는 마음' },
  ];

  return (
    <section className="py-24 bg-[#FAF8F3] border-b border-[#8C826C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#526242] block mb-3">
            {lang === 'en' ? '10 / INCLUSIVE COMMUNITY' : '10 / 누구에게나 열린 자리'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#242E1F] mb-3">
            {lang === 'en' ? 'Made for every major.' : '모든 전공의 학생들을 위해.'}
          </h2>
          <p className="text-xl sm:text-2xl font-editorial italic text-[#526242] mb-4">
            {lang === 'en' ? 'Beginners included.' : '초보자 대환영.'}
          </p>
          <p className="text-base sm:text-lg text-[#526458] font-light leading-relaxed">
            {lang === 'en'
              ? 'Whether you study Culinary Arts, Business at SolBridge, Nursing, Media Design, or Railroad Engineering at Woosong—nature does not ask for your major.'
              : '솔브릿지 경영, 글로벌 조리, 간호, 미디어 디자인, 철도 물류까지—우송대학교의 어떤 전공을 공부하고 있든 자연 앞에서는 모두가 같은 탐조자입니다.'}
          </p>
        </div>

        {/* Comparison Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* What You Don't Need */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-subtle space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-subtle">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                <Cross className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-editorial font-medium text-[#1E2320]">
                {lang === 'en' ? 'You don’t need:' : '필요하지 않은 것들:'}
              </h3>
            </div>

            <ul className="space-y-4">
              {notNeeded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#506256] font-light">
                  <span className="text-stone-400 font-mono text-xs pt-0.5">✕</span>
                  <span>{lang === 'en' ? item.en : item.kr}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What You Can Bring */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#1E3125] text-white border border-[#1E3125] shadow-lg space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#304B3A] flex items-center justify-center text-[#E5D7A3]">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-editorial font-medium text-white">
                {lang === 'en' ? 'You can simply bring:' : '준비하면 좋은 것들:'}
              </h3>
            </div>

            <ul className="space-y-4">
              {toBring.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#D7E3DC] font-light">
                  <span className="text-[#E5D7A3] font-mono text-xs pt-0.5">✓</span>
                  <span>{lang === 'en' ? item.en : item.kr}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Welcoming Statement */}
        <div className="text-center mt-12">
          <p className="text-lg sm:text-xl font-editorial italic text-[#1F3325]">
            {lang === 'en'
              ? '“Bring a friend. Come alone. Either way, you belong here.”'
              : '“친구와 함께여도 좋고, 혼자 와도 좋습니다. 이곳에서는 누구든 환영받습니다.”'}
          </p>
        </div>
      </div>
    </section>
  );
};
