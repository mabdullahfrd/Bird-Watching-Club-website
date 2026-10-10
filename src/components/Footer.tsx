import React from 'react';
import { ArrowUp, Music, Heart } from 'lucide-react';
import { ClubLogo } from './ClubLogo';

interface FooterProps {
  lang: 'en' | 'kr';
  onOpenAudio?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenAudio }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E2519] text-[#D8D2BC] border-t border-[#8C826C]/25 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-[#8C826C]/20 items-start">
          {/* Brand Info with Clean Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="shrink-0">
                <ClubLogo size={44} />
              </div>
              <div>
                <h3 className="text-2xl font-editorial font-medium text-white tracking-wider leading-none">
                  WING WATCHERS
                </h3>
                <span className="font-mono text-[9px] tracking-widest text-[#D4C79B] uppercase">
                  WOOSONG UNIV · 탐조 동아리
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#C9C2AE] font-light max-w-sm leading-relaxed">
              {lang === 'en'
                ? 'A student birdwatching community at Woosong University in Daejeon. Stepping outside, observing wildlife, and cultivating quiet connection.'
                : '우송대학교 학우들을 위한 평화로운 탐조 커뮤니티. 잠시 걸음을 멈추고 대전의 자연과 새를 관찰하며 따뜻하게 연결됩니다.'}
            </p>
            <div className="text-xs font-mono text-[#8C826C] space-y-0.5">
              <div>Woosong University (우송대학교) · Daejeon, Republic of Korea</div>
              <div>Emblem: Migratory Bird in Dynamic Flight · Peace Olive Branch</div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6DECB] block">
              {lang === 'en' ? 'NAVIGATION' : '바로가기'}
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'About Club' : '동아리 소개'}
                </a>
              </li>
              <li>
                <a href="#notice-more" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Look Closer' : '감각적 관찰 훈련'}
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Daejeon Classroom' : '대전 탐조 거점'}
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Field Notes' : '탐조 일지'}
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Club Activities' : '정기 활동'}
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Walk Schedule' : '산책 일정'}
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Audio Chamber Access */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6DECB] block">
              {lang === 'en' ? 'IMMERSIVE AUDIO & CONNECT' : '자연음 & 소통'}
            </span>
            <p className="text-xs font-light text-[#C9C2AE] leading-relaxed">
              {lang === 'en'
                ? 'Listen to all 6 Daejeon nature soundscapes and authentic bird calls synthesized directly in your browser.'
                : '웹 브라우저에서 대전의 6가지 자연 배경음과 7종의 고유한 새 울음소리를 감상하실 수 있습니다.'}
            </p>
            {onOpenAudio && (
              <button
                onClick={onOpenAudio}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-[#FAF8F3] border border-white/15 transition-colors"
              >
                <Music className="w-3.5 h-3.5 text-[#D4C79B]" />
                <span>{lang === 'en' ? 'Open Nature Audio Player' : '자연 소리 플레이어 열기'}</span>
              </button>
            )}
            <div className="pt-2 text-[11px] font-mono text-[#8C826C]">
              Woosong East & West Campus · Daejeon, Korea
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8C826C]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© 2024–2026 WING WATCHERS (우송대학교 탐조 동아리)</span>
            <span aria-hidden="true">·</span>
            <span>All Nature Welcomed</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <span>{lang === 'en' ? 'BACK TO TOP' : '맨 위로 가기'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
