import React from 'react';
import { Check, X as Cross } from 'lucide-react';

interface MemberExperienceProps {
  lang: 'en' | 'kr';
}

export const MemberExperience: React.FC<MemberExperienceProps> = ({ lang }) => {
  const notNeeded = [
    { en: 'Korean language fluency (all walks guided in English with bilingual assistance)', kr: '한국어 유창성 (모든 산책은 영어로 편안하게 진행되며 한국어 소통도 원활)' },
    { en: 'Previous birdwatching or hiking experience', kr: '이전의 조류 관찰이나 등산 경험' },
    { en: 'Expensive binoculars or professional camera gear (free club loan provided)', kr: '고가 쌍안경이나 무거운 카메라 (동아리 무료 대여 쌍안경 제공)' },
    { en: 'Specialist biological knowledge or Latin taxonomy memorization', kr: '어려운 생물학적 지식이나 학명 암기' },
  ];

  const toBring = [
    { en: 'Curiosity to discover Korea’s outdoors with global classmates from 30+ nations', kr: '30여 개국에서 온 글로벌 학우들과 대전의 자연을 탐험할 호기심' },
    { en: 'Comfortable walking sneakers & seasonal weather layers', kr: '걷기 편한 운동화와 계절에 맞는 편안한 옷차림' },
    { en: 'Respect for wildlife distance & Leave-No-Trace ethical care', kr: '야생동물에 대한 존중과 흔적을 남기지 않는 LNT 수칙' },
    { en: 'An open heart to pause, listen, and make international friends in Daejeon', kr: '잠시 멈추어 귀 기울이고 새로운 외국인 친구들을 만날 열린 마음' },
  ];

  return (
    <section className="py-24 bg-[#FAF8F3] border-b border-[#8C826C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#526242] block mb-3">
            {lang === 'en' ? '10 / GLOBAL & INCLUSIVE COMMUNITY' : '10 / 글로벌 포용 커뮤니티'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#242E1F] mb-3">
            {lang === 'en' ? 'Made for every major & nationality.' : '모든 전공과 모든 국적의 학생들을 위해.'}
          </h2>
          <p className="text-xl sm:text-2xl font-editorial italic text-[#526242] mb-4">
            {lang === 'en' ? 'Run by international students. Beginners welcome.' : '외국인 유학생 주도 동아리. 초보자 대환영.'}
          </p>
          <p className="text-base sm:text-lg text-[#526458] font-light leading-relaxed">
            {lang === 'en'
              ? 'Whether you study at SolBridge Business School, Endicott College of International Studies, Culinary Arts, Railroad Logistics, or Nursing at Woosong—nature does not ask for your nationality or Korean test score.'
              : '솔브릿지 국제경영, 엔디컷 칼리지, 글로벌 조리, 철도물류, 간호까지—우송대학교의 어떤 전공, 어떤 나라에서 왔든 자연 앞에서는 모두가 호기심 가득한 동등한 탐조자입니다.'}
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
