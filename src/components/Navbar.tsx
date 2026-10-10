import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { ambianceAudio } from '../utils/audioAmbiance';
import { ClubLogo } from './ClubLogo';

interface NavbarProps {
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  onOpenJoin: () => void;
  onOpenAudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenJoin,
  onOpenAudio,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
    const playing = await ambianceAudio.toggle();
    setIsAudioPlaying(playing);
  };

  const navLinks = [
    { href: '#about', labelEn: 'About', labelKr: '소개' },
    { href: '#notice-more', labelEn: 'Look Closer', labelKr: '관찰하기' },
    { href: '#explore', labelEn: 'Explore', labelKr: '대전 탐조지' },
    { href: '#journal', labelEn: 'Field Notes', labelKr: '탐조 일지' },
    { href: '#activities', labelEn: 'Activities', labelKr: '활동' },
    { href: '#gallery', labelEn: 'Gallery', labelKr: '갤러리' },
    { href: '#events', labelEn: 'Walks', labelKr: '산책 일정' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#263120]/95 backdrop-blur-md py-3 border-b border-[#E6DECB]/20 shadow-md'
          : 'bg-gradient-to-b from-[#222C1C]/90 via-[#222C1C]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Zone 1: Clean Logo and Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-3.5 text-lg md:text-xl font-editorial font-medium tracking-wider text-white hover:text-[#E6DECB] transition-colors whitespace-nowrap group"
          >
            <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
              <ClubLogo size={38} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="leading-none text-white tracking-wider font-semibold text-base sm:text-lg">
                WING WATCHERS
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#D2C9B3] uppercase mt-1">
                WOOSONG UNIV · 탐조
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-medium uppercase tracking-widest text-[#E6DECB]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#E6DECB] hover:after:w-full after:transition-all after:duration-200"
              >
                {lang === 'en' ? link.labelEn : link.labelKr}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Audio, Language, Primary CTA) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Nature Audio Chamber Button */}
            <button
              onClick={() => {
                if (onOpenAudio) onOpenAudio();
                else handleToggleAudio();
              }}
              className={`h-9 px-3 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                isAudioPlaying
                  ? 'bg-[#526242] text-[#F8F5EE] border border-[#A89F88] shadow-sm'
                  : 'text-[#D2C9B3] hover:text-white hover:bg-white/10 border border-white/10'
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
                  <Volume2 className="w-4 h-4 text-[#E6DECB] animate-pulse" />
                  <span className="hidden sm:inline text-[11px] font-mono tracking-wide">
                    {lang === 'en' ? 'AUDIO ON' : '자연음 재생'}
                  </span>
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-[#E6DECB] animate-pulse h-2 rounded-full" />
                    <span className="w-0.5 bg-[#E6DECB] animate-pulse h-3 rounded-full" />
                    <span className="w-0.5 bg-[#E6DECB] animate-pulse h-1.5 rounded-full" />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#D2C9B3]" />
                  <span className="hidden sm:inline text-[11px] font-mono tracking-wide">
                    {lang === 'en' ? 'SOUND' : '자연소리'}
                  </span>
                </>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="h-9 px-2.5 rounded-lg text-xs font-mono font-medium tracking-wider text-[#E6DECB] hover:text-white border border-[#E6DECB]/30 hover:border-[#E6DECB]/60 transition-colors flex items-center justify-center"
              aria-label="Switch language"
            >
              {lang === 'en' ? 'KR' : 'EN'}
            </button>

            {/* Primary Join Action */}
            <button
              onClick={onOpenJoin}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 text-xs font-semibold tracking-wide text-[#262E21] bg-[#F8F5EE] hover:bg-white rounded-md transition-all duration-200 shadow-sm whitespace-nowrap"
            >
              <span>{lang === 'en' ? 'JOIN WING WATCHERS' : '동아리 가입하기'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#526242]" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 flex items-center justify-center text-white hover:bg-white/10 rounded-md"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#242E1F] border-b border-[#E6DECB]/20 px-6 py-6 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4 text-sm font-medium text-[#E6DECB]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-white"
              >
                {lang === 'en' ? link.labelEn : link.labelKr}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoin();
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-semibold tracking-wider text-[#262E21] bg-[#F8F5EE] rounded-md"
              >
                {lang === 'en' ? 'JOIN WING WATCHERS' : '동아리 가입하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
