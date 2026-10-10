import React from 'react';
import { ArrowDown, Sparkles, Volume2, Music2 } from 'lucide-react';
import { clubImages } from '../data/clubData';
import { ClubLogo } from './ClubLogo';
import { ambianceAudio } from '../utils/audioAmbiance';

interface HeroProps {
  lang: 'en' | 'kr';
  onOpenJoin: () => void;
  onOpenAudio?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenJoin, onOpenAudio }) => {
  const handleQuickPlayAudio = () => {
    if (onOpenAudio) {
      onOpenAudio();
    } else {
      ambianceAudio.toggle();
    }
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#242E1F]">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={clubImages.heroBird}
          alt="Oriental Turtle Dove perched on a pine branch in soft morning mist"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#20291B] via-[#20291B]/75 to-[#20291B]/50" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 mb-6 sm:mb-8 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/15 border border-[#E6DECB]/25 backdrop-blur-md">
              <ClubLogo size={22} />
              <span className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#E6DECB]">
                {lang === 'en' ? 'WOOSONG UNIVERSITY · DAEJEON' : '우송대학교 · 대전'}
              </span>
            </div>

            {/* Editorial Headlines with clean baseline spacing */}
            <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-light text-white tracking-tight leading-[0.98]">
                EXPLORE.
              </h1>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-light text-[#E6DECB] tracking-tight leading-[0.98]">
                OBSERVE.
              </h1>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-light text-[#C9C2AE] tracking-tight leading-[0.98]">
                CONNECT.
              </h1>
            </div>

            {/* Supporting statement */}
            <p className="max-w-xl text-base sm:text-lg md:text-xl text-[#E1DEC4] font-light leading-relaxed mb-8 sm:mb-10 text-balance">
              {lang === 'en'
                ? 'A student birdwatching club for curious people, quiet moments, and the nature around us.'
                : '바쁜 대학 생활 속 작은 쉼표. 호기심 어린 눈으로 대전의 자연과 새를 바라보며 함께 걸어가는 우송대학교 탐조 동아리.'}
            </p>

            {/* Action buttons with aligned heights */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <button
                onClick={onOpenJoin}
                className="px-7 py-3.5 bg-[#FAF8F3] hover:bg-white text-[#2D3924] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-all duration-200 shadow-lg text-center"
              >
                {lang === 'en' ? 'JOIN THE CLUB' : '동아리 가입하기'}
              </button>

              <button
                onClick={handleQuickPlayAudio}
                className="px-6 py-3.5 bg-[#526242]/70 hover:bg-[#526242] text-[#FAF8F3] border border-[#E6DECB]/30 font-medium text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-all duration-200 flex items-center justify-center gap-2.5 backdrop-blur-sm"
              >
                <Volume2 className="w-4 h-4 text-[#E6DECB]" />
                <span>{lang === 'en' ? 'LISTEN TO NATURE' : '자연의 소리 듣기'}</span>
              </button>

              <a
                href="#about"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-[#FAF8F3] border border-white/20 font-medium text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-all duration-200 text-center flex items-center justify-center gap-2"
              >
                <span>{lang === 'en' ? 'EXPLORE JOURNEY' : '여정 살펴보기'}</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#E6DECB]" />
              </a>
            </div>
          </div>

          {/* Right Column: High-End Emblem Showcase Card */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 justify-center">
            <div className="relative p-8 rounded-3xl bg-[#FAF8F3]/95 text-[#2D3924] shadow-2xl border border-white/60 max-w-sm w-full backdrop-blur-md">
              <div className="flex justify-center mb-5">
                <ClubLogo size={130} />
              </div>

              <div className="text-center space-y-2 pt-4 border-t border-[#8C826C]/20">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#8C826C] uppercase block">
                  OFFICIAL CLUB EMBLEM
                </span>
                <h3 className="font-editorial text-2xl font-bold tracking-wider text-[#2D3924]">
                  WING WATCHERS
                </h3>
                <p className="text-xs font-mono tracking-widest text-[#526242] uppercase">
                  WOOSONG UNIVERSITY · EST. 2024
                </p>
                <div className="pt-2 text-xs text-[#6B6350] font-light italic leading-relaxed">
                  {lang === 'en'
                    ? '“Explore. Observe. Capture. Share. Connect.”'
                    : '“탐험하고 관찰하며 마주하는 자연의 순간들”'}
                </div>

                <div className="pt-4 mt-2 border-t border-[#8C826C]/15 flex items-center justify-center gap-2 text-[11px] font-mono text-[#526242]">
                  <Music2 className="w-3.5 h-3.5" />
                  <span>Daejeon Birding Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar of hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-[#E6DECB]/20 text-xs text-[#D8D2BC]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E6DECB] shrink-0" />
          <span>
            {lang === 'en'
              ? 'No previous birding knowledge or specialist equipment required. Curiosity is enough.'
              : '사전 지식이나 비싼 장비는 필요 없습니다. 호기심과 자연을 존중하는 마음만 가져오세요.'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono tracking-wider text-[#B8AF98]">
          <span>DAEJEON</span>
          <span aria-hidden="true">·</span>
          <span>WOOSONG UNIV</span>
          <span aria-hidden="true">·</span>
          <span>EST. 2024</span>
        </div>
      </div>
    </section>
  );
};
