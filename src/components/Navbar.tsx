import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { ClubLogo } from './ClubLogo';
import { ambianceAudio } from '../utils/audioAmbiance';

interface NavbarProps {
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  onOpenJoin: () => void;
  onOpenAudio?: () => void;
  onOpenGame?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenJoin,
  onOpenAudio,
  onOpenGame,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = ambianceAudio.subscribe((state) => {
      setIsAudioPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const handleToggleAudio = async () => {
    await ambianceAudio.toggle();
  };

  // Concise single-word labels so navigation items never awkwardly wrap across lines
  const navLinks = [
    { href: '#about', labelEn: 'About', labelKr: '소개' },
    { href: '#notice-more', labelEn: 'Observe', labelKr: '관찰' },
    { href: '#explore', labelEn: 'Explore', labelKr: '탐조지' },
    { href: '#journal', labelEn: 'Notes', labelKr: '기록' },
    { href: '#activities', labelEn: 'Activities', labelKr: '활동' },
    { href: '#game', labelEn: 'Game', labelKr: '게임' },
    { href: '#gallery', labelEn: 'Gallery', labelKr: '갤러리' },
    { href: '#events', labelEn: 'Walks', labelKr: '일정' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#222C1C]/95 backdrop-blur-md py-2.5 sm:py-3 border-b border-[#E6DECB]/20 shadow-lg'
          : 'bg-gradient-to-b from-[#1E2519]/95 via-[#1E2519]/70 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 gap-3 lg:gap-6">
          {/* Zone 1: Logo and Brand Identity (Guaranteed shrink-0 with breathing margin) */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 text-white hover:text-[#E6DECB] transition-transform duration-200 hover:scale-[1.01] group"
          >
            <div className="shrink-0">
              <ClubLogo size={42} rounded="lg" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-wider text-white leading-none whitespace-nowrap">
                WING WATCHERS
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-[#D4C79B] uppercase mt-1 leading-none whitespace-nowrap">
                {lang === 'en' ? 'INT’L STUDENT BIRD CLUB' : '외국인 유학생 탐조 동아리'}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Vertically centered, whitespace-nowrap, never collisions) */}
          <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-6 2xl:gap-7 text-xs font-mono font-medium uppercase tracking-wider text-[#E6DECB] min-w-0">
            {navLinks.map((link) => {
              const isGameLink = link.href === '#game';
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (isGameLink && onOpenGame) {
                      e.preventDefault();
                      onOpenGame();
                    }
                  }}
                  className={`whitespace-nowrap px-1 py-1.5 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1 after:right-1 after:h-[1px] after:bg-[#D4C79B] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 ${
                    isGameLink ? 'text-[#F1E5C7] font-semibold flex items-center gap-1' : ''
                  }`}
                >
                  {isGameLink && <span className="text-[10px]">🎮</span>}
                  <span>{lang === 'en' ? link.labelEn : link.labelKr}</span>
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Audio, Language, Primary CTA, Mobile menu) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Nature Audio Chamber Button */}
            <button
              onClick={() => {
                if (onOpenAudio) onOpenAudio();
                else handleToggleAudio();
              }}
              className={`h-9 px-3 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all shrink-0 ${
                isAudioPlaying
                  ? 'bg-[#526242] text-[#F8F5EE] border border-[#A89F88] shadow-sm'
                  : 'text-[#D2C9B3] hover:text-white hover:bg-white/10 border border-white/15'
              }`}
              title={
                isAudioPlaying
                  ? 'Nature audio playing (click for sound selector)'
                  : 'Play tranquil nature audio'
              }
              aria-label="Toggle ambient nature sound"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#D4C79B] animate-pulse" />
                  <span className="hidden sm:inline text-[11px] tracking-wide">
                    {lang === 'en' ? 'AUDIO ON' : '소리 재생'}
                  </span>
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-[#D4C79B] animate-pulse h-2 rounded-full" />
                    <span className="w-0.5 bg-[#D4C79B] animate-pulse h-3 rounded-full" />
                    <span className="w-0.5 bg-[#D4C79B] animate-pulse h-1.5 rounded-full" />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#D2C9B3]" />
                  <span className="hidden sm:inline text-[11px] tracking-wide">
                    {lang === 'en' ? 'SOUND' : '자연소리'}
                  </span>
                </>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="h-9 px-2.5 rounded-lg text-xs font-mono font-medium tracking-wider text-[#E6DECB] hover:text-white border border-[#E6DECB]/30 hover:border-[#E6DECB]/60 transition-colors flex items-center justify-center shrink-0"
              aria-label="Switch language"
            >
              {lang === 'en' ? 'KR' : 'EN'}
            </button>

            {/* Primary Join Action */}
            <button
              onClick={onOpenJoin}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 text-xs font-mono font-semibold tracking-wide text-[#262E21] bg-[#F8F5EE] hover:bg-white rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap shrink-0"
            >
              <span>{lang === 'en' ? 'JOIN WING WATCHERS' : '동아리 가입'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#526242]" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#242E1F] border-b border-[#E6DECB]/20 px-6 py-6 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium text-[#E6DECB]">
            {navLinks.map((link) => {
              const isGameLink = link.href === '#game';
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (isGameLink && onOpenGame) {
                      e.preventDefault();
                      onOpenGame();
                    }
                  }}
                  className="py-2.5 border-b border-white/5 hover:text-white flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    {isGameLink && <span>🎮</span>}
                    <span>{lang === 'en' ? link.labelEn : link.labelKr}</span>
                  </span>
                  <span className="font-mono text-xs text-[#8C826C]">
                    {lang === 'en' ? link.labelKr : link.labelEn}
                  </span>
                </a>
              );
            })}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoin();
                }}
                className="w-full py-3 px-4 text-center text-xs font-mono font-semibold tracking-wider text-[#262E21] bg-[#F8F5EE] hover:bg-white rounded-lg shadow-sm"
              >
                {lang === 'en' ? 'JOIN WING WATCHERS ↗' : '동아리 가입하기 ↗'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
