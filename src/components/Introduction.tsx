import React from 'react';
import { clubImages } from '../data/clubData';

interface IntroductionProps {
  lang: 'en' | 'kr';
}

export const Introduction: React.FC<IntroductionProps> = ({ lang }) => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#F2EFE6] border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#526242] font-semibold">
                {lang === 'en' ? '01 / PERSPECTIVE' : '01 / 새로운 시선'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-normal tracking-tight text-[#26331E] leading-[1.15]">
                {lang === 'en' ? (
                  <>
                    A different kind of <br className="hidden sm:inline" />
                    campus experience.
                  </>
                ) : (
                  <>
                    대학 생활 속에서 만나는 <br className="hidden sm:inline" />
                    완전히 새로운 순간.
                  </>
                )}
              </h2>
            </div>

            {/* Editorial Staccato Rhythm */}
            <div className="space-y-6 text-[#3D4734] leading-relaxed text-base sm:text-lg font-light">
              <p className="font-normal text-lg sm:text-xl text-[#26331E]">
                {lang === 'en'
                  ? 'University life moves quickly.'
                  : '대학 생활은 쉴 새 없이 흘러갑니다.'}
              </p>

              <div className="pl-4 border-l-2 border-[#526242]/30 space-y-1 font-mono text-sm sm:text-base text-[#526242]">
                <p>{lang === 'en' ? 'Classes.' : '강의와 수강신청.'}</p>
                <p>{lang === 'en' ? 'Assignments.' : '끊이지 않는 과제.'}</p>
                <p>{lang === 'en' ? 'Exams.' : '시험과 자격증.'}</p>
                <p>{lang === 'en' ? 'Deadlines.' : '다가오는 마감일들.'}</p>
              </div>

              <p>
                {lang === 'en'
                  ? 'Wing Watchers creates a small reason to pause.'
                  : '윙워처스(Wing Watchers)는 잠시 멈추어 설 수 있는 작은 이유를 선물합니다.'}
              </p>

              <div className="space-y-1 text-xl sm:text-2xl font-editorial italic text-[#2D3924]">
                <p>{lang === 'en' ? 'Step outside.' : '문 밖으로 걸어 나가기.'}</p>
                <p>{lang === 'en' ? 'Slow down.' : '걸음을 늦추기.'}</p>
                <p>{lang === 'en' ? 'Look around.' : '주변을 둘러보기.'}</p>
              </div>

              <p className="text-sm sm:text-base text-[#4C5744]">
                {lang === 'en'
                  ? 'A bird call in the trees. Movement near the water. Changing light across a familiar path. You don’t need experience.'
                  : '나무 사이에서 들려오는 지저귐. 물가에서 반짝이는 날갯짓. 늘 걷던 길 위에 쏟아지는 아침 햇살. 이전의 경험은 중요하지 않습니다.'}
              </p>

              <p className="font-medium text-[#26331E]">
                {lang === 'en' ? 'You just need curiosity.' : '그저 호기심 어린 시선 하나면 충분합니다.'}
              </p>
            </div>

            {/* Philosophy highlight banner */}
            <div className="pt-4 border-t border-subtle">
              <blockquote className="text-sm font-editorial italic text-[#526242]">
                {lang === 'en'
                  ? '“A little more calm. A lot more connection.”'
                  : '“조금 더 차분하게. 훨씬 더 깊이 있게.”'}
              </blockquote>
            </div>
          </div>

          {/* Right Column: Editorial Large Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#EBECE7] aspect-[4/3] group">
              <img
                src={clubImages.campusTrail}
                alt="Tranquil morning nature path near Woosong University campus"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-mono tracking-widest uppercase block text-emerald-200 mb-1">
                  {lang === 'en' ? 'DAEJEON NATURE PATHWAY' : '대전의 자연 산책로'}
                </span>
                <p className="text-sm font-light text-slate-100">
                  {lang === 'en'
                    ? 'Morning light over Daedong Stream, just minutes from the university campus.'
                    : '우송대 캠퍼스에서 불과 몇 분 거리, 대동천의 잔잔한 아침 빛.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
