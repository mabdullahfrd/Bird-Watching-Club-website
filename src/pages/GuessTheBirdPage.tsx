import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Trophy,
  Flame,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  Search,
  ZoomIn,
  X,
  HelpCircle,
  MapPin,
  Feather,
  Eye,
  EyeOff,
  Compass,
  ArrowRight,
  BookOpen,
  Calendar,
  Gamepad2,
  Award
} from 'lucide-react';
import { BIRD_QUIZ_DATA, BirdQuizQuestion } from '../data/birdGameData';
import { ambianceAudio } from '../utils/audioAmbiance';
import { ClubLogo } from '../components/ClubLogo';

interface GuessTheBirdPageProps {
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  onBackToHome: () => void;
  onNavigateToEvents?: () => void;
}

const STORAGE_HIGH_SCORE = 'wingwatchers_birdgame_highscore_v2';
const STORAGE_GAMES_PLAYED = 'wingwatchers_birdgame_played_count';

export const GuessTheBirdPage: React.FC<GuessTheBirdPageProps> = ({
  lang,
  onToggleLang,
  onBackToHome,
  onNavigateToEvents,
}) => {
  const [questions, setQuestions] = useState<BirdQuizQuestion[]>(BIRD_QUIZ_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [answeredHistory, setAnsweredHistory] = useState<{
    question: BirdQuizQuestion;
    userChoice: number;
    isCorrect: boolean;
  }[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  // Sound & Visual Options
  const [isPlayingCall, setIsPlayingCall] = useState(false);
  const [isSilhouetteMode, setIsSilhouetteMode] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_HIGH_SCORE);
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch {
      // ignore
    }
  }, []);

  const currentBird = questions[currentIndex];

  // Play audio call
  const handlePlayCall = useCallback(() => {
    if (!currentBird?.callId) return;
    setIsPlayingCall(true);
    ambianceAudio.playBirdCall(currentBird.callId);
    setTimeout(() => {
      setIsPlayingCall(false);
    }, 1800);
  }, [currentBird]);

  // Handle Option Selection
  const handleSelectOption = useCallback(
    (idx: number) => {
      if (isAnswered || !currentBird) return;
      setSelectedOption(idx);
      setIsAnswered(true);

      const isCorrect = idx === currentBird.correctIndex;
      const pointsEarned = isCorrect ? (streak >= 2 ? 15 : 10) : 0;
      const newScore = score + pointsEarned;
      const newStreak = isCorrect ? streak + 1 : 0;

      setScore(newScore);
      setStreak(newStreak);

      setAnsweredHistory((prev) => [
        ...prev,
        {
          question: currentBird,
          userChoice: idx,
          isCorrect,
        },
      ]);

      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem(STORAGE_HIGH_SCORE, newScore.toString());
        } catch {
          // ignore
        }
      }
    },
    [isAnswered, currentBird, score, streak, highScore]
  );

  // Handle Next Question
  const handleNext = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setGameFinished(true);
      try {
        const count = parseInt(localStorage.getItem(STORAGE_GAMES_PLAYED) || '0', 10);
        localStorage.setItem(STORAGE_GAMES_PLAYED, (count + 1).toString());
      } catch {
        // ignore
      }
    }
  }, [currentIndex, questions.length]);

  // Keyboard shortcut listener (1, 2, 3, 4, A, B, C, D, Space/Enter to advance)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isZoomModalOpen) return;

      if (!isAnswered) {
        if (e.key === '1' || e.key.toLowerCase() === 'a') handleSelectOption(0);
        if (e.key === '2' || e.key.toLowerCase() === 'b') handleSelectOption(1);
        if (e.key === '3' || e.key.toLowerCase() === 'c') handleSelectOption(2);
        if (e.key === '4' || e.key.toLowerCase() === 'd') handleSelectOption(3);
      } else {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, handleSelectOption, handleNext, isZoomModalOpen]);

  // Restart / Shuffle
  const handleRestart = (shuffle = false) => {
    if (shuffle) {
      const shuffled = [...BIRD_QUIZ_DATA].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
    } else {
      setQuestions(BIRD_QUIZ_DATA);
    }
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setAnsweredHistory([]);
    setGameFinished(false);
  };

  // Share Score
  const handleShareScore = () => {
    const correctCount = answeredHistory.filter((h) => h.isCorrect).length;
    const text = `🦅 Wing Watchers "Guess the Bird" Challenge!\nI identified ${correctCount}/${questions.length} wild birds of Daejeon with ${score} pts! Can you beat my score? 🌿\nWoosong University Birding Club`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  // Rank determination
  const getRank = (finalScore: number) => {
    if (finalScore >= 120)
      return {
        title: 'Master Field Ornithologist',
        kr: '마스터 대전 필드 탐조 연구가',
        descEn: 'Exceptional birding instinct! You recognize Daejeon birds instantly from subtle wingbars and facial markings.',
        descKr: '놀라운 탐조 감각! 날개 깃과 부리 모양의 미세한 특징만으로도 대전의 야생 조류를 완벽히 식별해냈습니다.',
        badge: '🏆',
        color: 'from-amber-500 to-yellow-600',
      };
    if (finalScore >= 80)
      return {
        title: 'Keen Trail Scout',
        kr: '예리한 숲길 탐사대원',
        descEn: 'Sharp observant eyes! You know Korea’s resident songbirds and river wanderers with confidence.',
        descKr: '뛰어난 관찰력! 한국의 대표 텃새와 하천 조류의 주요 생태 특징을 훌륭하게 짚어냈습니다.',
        badge: '🌿',
        color: 'from-emerald-600 to-teal-700',
      };
    if (finalScore >= 40)
      return {
        title: 'Curious Campus Observer',
        kr: '호기심 가득한 캠퍼스 관찰자',
        descEn: 'Great start! You’re building your visual field recognition. Join our next campus morning walk to spot them live!',
        descKr: '멋진 첫걸음! 다음 캠퍼스 아침 산책에 참여해 쌍안경으로 실제 새들을 만나보세요!',
        badge: '🔍',
        color: 'from-sky-600 to-blue-700',
      };
    return {
      title: 'Fledgling Birder',
      kr: '첫걸음 탐조 비기너',
      descEn: 'Every master birder began with curiosity. Explore our field notes and join us on gentle morning strolls!',
      descKr: '모든 탐조가도 처음엔 작은 호기심에서 시작했습니다. 동아리 필드 노트를 둘러보며 천천히 알아가 보세요!',
      badge: '🐣',
      color: 'from-stone-600 to-stone-800',
    };
  };

  const rankInfo = getRank(score);

  return (
    <div className="min-h-screen bg-[#F6F4ED] text-[#242E1F] flex flex-col font-sans selection:bg-[#D4C79B] selection:text-[#1F291B]">
      {/* ── TOP NAV BAR (DEDICATED GAME PAGE) ── */}
      <header className="sticky top-0 z-40 bg-[#1E271B] text-[#FAF8F3] border-b border-[#3B4834] shadow-md backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Left: Back to Home & Club Brand */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#E6DECB] hover:text-white transition-all text-xs font-mono font-medium border border-white/10 shadow-xs cursor-pointer group"
              title="Return to Wing Watchers club home"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#D4C79B]" />
              <span className="hidden sm:inline">
                {lang === 'en' ? 'Back to Club Home' : '동아리 홈으로'}
              </span>
              <span className="sm:hidden">{lang === 'en' ? 'Back' : '홈'}</span>
            </button>

            <div className="h-5 w-[1px] bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <ClubLogo size={32} rounded="md" />
              <div className="flex flex-col">
                <span className="font-editorial text-sm sm:text-base font-bold tracking-wide text-white leading-tight">
                  GUESS THE BIRD
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#D4C79B] uppercase">
                  {lang === 'en' ? 'VISUAL FIELD IDENTIFICATION' : '사진 보고 새 맞히기 챌린지'}
                </span>
              </div>
            </div>
          </div>

          {/* Center / Right: HUD Stats */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Score HUD */}
            <div className="flex items-center gap-2 bg-[#2D3929] px-3 py-1.5 rounded-xl border border-[#44553F]">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                {score} <span className="text-[10px] text-[#A8B7A4] font-normal">PTS</span>
              </span>
            </div>

            {/* Streak */}
            <div className="hidden xs:flex items-center gap-1.5 bg-[#2D3929] px-2.5 py-1.5 rounded-xl border border-[#44553F]">
              <Flame
                className={`w-3.5 h-3.5 ${
                  streak > 0 ? 'text-orange-400 animate-pulse' : 'text-stone-400'
                }`}
              />
              <span className="text-xs font-mono font-bold text-white">
                {streak}
              </span>
            </div>

            {/* High Score */}
            <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-[#BAC8B6]">
              <span className="text-[#84987F]">BEST:</span>
              <span className="text-[#E7EFE4] font-semibold">{highScore} pts</span>
            </div>

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="h-8 px-2 rounded-lg text-xs font-mono text-[#E6DECB] hover:text-white border border-white/20 hover:border-white/40 transition-colors flex items-center justify-center cursor-pointer"
              title="Toggle English / Korean"
            >
              {lang === 'en' ? '한글' : 'ENG'}
            </button>
          </div>
        </div>

        {/* Linear Progress Bar under header */}
        {!gameFinished && (
          <div className="w-full bg-[#151D12] h-1.5 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-[#C2B280] to-amber-400 transition-all duration-300 ease-out"
              style={{
                width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
              }}
            />
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
        {!gameFinished ? (
          <div className="space-y-6">
            {/* Round Bar & Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 sm:px-6 py-3 rounded-2xl border border-[#DDD7C8] shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-lg bg-[#242E1F] text-[#FAF8F3] font-mono text-xs font-bold tracking-wider">
                  ROUND {currentIndex + 1} / {questions.length}
                </span>
                <span className="text-xs font-mono text-[#556958] font-medium hidden sm:inline">
                  {currentBird.difficulty} • {currentBird.category}
                </span>
              </div>

              {/* Controls: Silhouette Toggle & Sound Toggle */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsSilhouetteMode((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                    isSilhouetteMode
                      ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-[#4C5D4F] hover:bg-stone-100'
                  }`}
                  title={
                    isSilhouetteMode
                      ? 'Disable silhouette mode (view full photo)'
                      : 'Enable silhouette challenge mode'
                  }
                >
                  {isSilhouetteMode ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-amber-700" />
                      <span>{lang === 'en' ? 'Silhouette Mode: ON' : '실루엣 모드 켜짐'}</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-[#5C6D5F]" />
                      <span>{lang === 'en' ? 'Silhouette Mode' : '실루엣 모드'}</span>
                    </>
                  )}
                </button>

                {currentBird.callId && (
                  <button
                    onClick={handlePlayCall}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                      isPlayingCall
                        ? 'bg-emerald-700 border-emerald-800 text-white animate-pulse'
                        : 'bg-[#2E3C29] hover:bg-[#3B4E35] border-[#242E1F] text-white shadow-xs'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>
                      {isPlayingCall
                        ? (lang === 'en' ? 'Playing...' : '재생 중...')
                        : (lang === 'en' ? 'Play Call' : '새소리')}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* ── CENTRAL VISUAL GAME CARD ── */}
            <div className="bg-white rounded-3xl border border-[#DDD6C5] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* LEFT / TOP: THE BIRD PHOTOGRAPH (PROMINENT & HIGH-FIDELITY) */}
              <div className="lg:col-span-7 bg-[#1C2419] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
                {/* Subtle nature grain/blur background */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-110 pointer-events-none"
                  style={{ backgroundImage: `url(${currentBird.image})` }}
                />

                {/* Photo Header Pill */}
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono tracking-wider border border-white/10">
                    <MapPin className="w-3 h-3 text-[#D4C79B]" />
                    <span>{lang === 'en' ? 'Daejeon Field Wildlife Photo' : '대전 야생 관찰 사진'}</span>
                  </div>

                  <button
                    onClick={() => setIsZoomModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-[#E6DECB] hover:text-white text-[11px] font-mono tracking-wider border border-white/15 transition-all cursor-pointer"
                    title="Inspect bird plumage with high-res zoom"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#D4C79B]" />
                    <span>{lang === 'en' ? 'Zoom & Inspect' : '자세히 보기'}</span>
                  </button>
                </div>

                {/* THE MAIN BIRD PHOTO CONTAINER */}
                <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl group flex items-center justify-center">
                  <img
                    src={currentBird.image}
                    alt={
                      isAnswered
                        ? currentBird.nameEn
                        : 'Mystery bird species in Daejeon'
                    }
                    className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                      isSilhouetteMode && !isAnswered
                        ? 'brightness-0 contrast-200 filter'
                        : 'group-hover:scale-105'
                    }`}
                  />

                  {/* Watermark / Category Pill inside photo */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/65 backdrop-blur-md text-white text-[11px] font-mono border border-white/10 flex items-center gap-1.5">
                    <Feather className="w-3 h-3 text-[#D4C79B]" />
                    <span>
                      {isAnswered ? currentBird.nameRomanized : (lang === 'en' ? 'Look closely at field marks' : '깃털과 부리 모양을 관찰하세요')}
                    </span>
                  </div>

                  {/* Magnifier click hint overlay on hover */}
                  <div
                    onClick={() => setIsZoomModalOpen(true)}
                    className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in"
                  >
                    <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-[#1F291B] font-mono text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <ZoomIn className="w-4 h-4 text-[#35523C]" />
                      {lang === 'en' ? 'Click to Enlarge Details' : '클릭하여 확대 관찰'}
                    </span>
                  </div>
                </div>

                {/* PHOTO SUB-BAR: Habitat & Visual Clue */}
                <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#E6DECB]">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#D4C79B] shrink-0" />
                    <span className="truncate">
                      <strong>{lang === 'en' ? 'Habitat: ' : '서식지: '}</strong>
                      {currentBird.habitatInDaejeon[lang]}
                    </span>
                  </div>

                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#D4C79B] hover:text-white underline cursor-pointer shrink-0"
                    >
                      <HelpCircle className="w-3 h-3" />
                      {lang === 'en' ? 'Visual Clue Hint' : '관찰 힌트 보기'}
                    </button>
                  ) : (
                    <span className="text-[11px] text-amber-200 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                      💡 {currentBird.visualClue[lang]}
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT / BOTTOM: QUESTION & 4 ANSWER CHOICES */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="space-y-1 mb-5">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#6A7B69] block">
                      {lang === 'en' ? 'SPECIES IDENTIFICATION' : '조류 종 맞히기'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-[#1E2E1D] leading-tight">
                      {lang === 'en'
                        ? 'Which bird is pictured here?'
                        : '사진 속 주인공은 어떤 새일까요?'}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#556958] font-light">
                      {lang === 'en'
                        ? 'Examine plumage coloration, beak profile, and posture from our Daejeon field records.'
                        : '대전 야생 관찰 기록 사진을 보고 깃털 색상과 부리 특징을 확인하여 맞춰보세요.'}
                    </p>
                  </div>

                  {/* 4 CHOICES */}
                  <div className="space-y-2.5">
                    {currentBird.options.map((opt, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === currentBird.correctIndex;

                      let cardStyle =
                        'bg-[#FAF8F3] hover:bg-[#F3EFE4] border-[#DDD7C8] text-[#243522] hover:border-[#B5AA90] hover:shadow-sm';

                      if (isAnswered) {
                        if (isCorrect) {
                          cardStyle =
                            'bg-emerald-800 text-white border-emerald-950 shadow-md ring-2 ring-emerald-500';
                        } else if (isSelected && !isCorrect) {
                          cardStyle =
                            'bg-red-800 text-white border-red-950 shadow-md ring-2 ring-red-400';
                        } else {
                          cardStyle =
                            'bg-stone-100 text-stone-400 border-stone-200 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={isAnswered}
                          className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer group ${cardStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Letter badge */}
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                                isAnswered && isCorrect
                                  ? 'bg-emerald-950 text-white'
                                  : isAnswered && isSelected && !isCorrect
                                  ? 'bg-red-950 text-white'
                                  : 'bg-black/5 text-[#3E523A] group-hover:bg-[#242E1F] group-hover:text-white'
                              }`}
                            >
                              {letter}
                            </span>

                            {/* Bird Names */}
                            <div className="flex flex-col">
                              <span className="text-sm sm:text-base font-semibold leading-tight">
                                {lang === 'en' ? opt.en : `${opt.kr} (${opt.en})`}
                              </span>
                              <span
                                className={`text-[11px] font-mono leading-tight mt-0.5 ${
                                  isAnswered && (isCorrect || (isSelected && !isCorrect))
                                    ? 'text-white/80'
                                    : 'text-[#677A65]'
                                }`}
                              >
                                {opt.kr} {opt.romanized ? `• "${opt.romanized}"` : ''}
                              </span>
                            </div>
                          </div>

                          {/* Result icon */}
                          {isAnswered && (
                            <div className="shrink-0">
                              {isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                              )}
                              {isSelected && !isCorrect && (
                                <XCircle className="w-5 h-5 text-red-300" />
                              )}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Keyboard shortcut hint */}
                  {!isAnswered && (
                    <div className="mt-3 text-[11px] font-mono text-[#8C9C8A] text-center hidden sm:block">
                      {lang === 'en'
                        ? 'Tip: Press 1-4 or A-D keys on your keyboard'
                        : '키보드 1~4번 또는 A~D 키로 빠르게 선택할 수 있습니다'}
                    </div>
                  )}
                </div>

                {/* POST-ANSWER FIELD NOTE EXPEDITION CARD */}
                {isAnswered && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#EAF2E8] border border-[#BDD4BE] space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center justify-between border-b border-[#BED4BF] pb-2.5">
                      <div className="flex items-center gap-2">
                        {selectedOption === currentBird.correctIndex ? (
                          <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>
                              {lang === 'en'
                                ? `Correct! +${streak >= 2 ? '15' : '10'} pts`
                                : `정답입니다! +${streak >= 2 ? '15' : '10'}점`}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-red-900 font-bold text-sm">
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span>
                              {lang === 'en' ? 'Not quite right' : '아쉬운 오답입니다'}
                            </span>
                          </div>
                        )}
                      </div>

                      <span className="font-mono text-xs font-bold text-[#1F3320]">
                        {currentBird.nameEn} ({currentBird.nameKr})
                      </span>
                    </div>

                    {/* Scientific & Sound */}
                    <div className="text-xs text-[#394E3C] space-y-1.5">
                      <div className="italic text-[#4F6851] font-mono text-[11px]">
                        {currentBird.scientificName} • {currentBird.soundPhonetic}
                      </div>
                      <p className="font-light text-[#293F2B] leading-relaxed">
                        <strong>💡 {lang === 'en' ? 'Field Fact: ' : '생태 상식: '}</strong>
                        {currentBird.funFact[lang]}
                      </p>
                    </div>

                    {/* NEXT BUTTON */}
                    <button
                      onClick={handleNext}
                      className="w-full py-3 px-4 rounded-xl bg-[#1E2E1D] hover:bg-[#2B3F2A] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer group"
                    >
                      <span>
                        {currentIndex + 1 < questions.length
                          ? (lang === 'en' ? 'Next Bird Identification' : '다음 새 맞히기')
                          : (lang === 'en' ? 'View Final Results & Rank' : '최종 결과 및 등급 보기')}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ── END OF GAME / SUMMARY SCREEN ── */
          <div className="bg-white rounded-3xl border border-[#DDD6C5] shadow-xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-500">
            {/* Header Badge */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#242E1F] to-[#4C6444] text-white flex items-center justify-center text-4xl shadow-lg shadow-[#242E1F]/20">
                {rankInfo.badge}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#6A7B69] block">
                  {lang === 'en' ? 'CHALLENGE COMPLETED' : '탐조 퀴즈 완료'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#1E2E1D]">
                  {lang === 'en' ? rankInfo.title : rankInfo.kr}
                </h2>
                <p className="text-sm text-[#556958] font-light leading-relaxed">
                  {lang === 'en' ? rankInfo.descEn : rankInfo.descKr}
                </p>
              </div>
            </div>

            {/* Score HUD Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-[#F6F4ED] border border-[#E0DACE] text-center">
                <span className="text-[10px] font-mono uppercase text-[#738472] block">
                  {lang === 'en' ? 'TOTAL SCORE' : '최종 점수'}
                </span>
                <span className="text-2xl font-bold font-mono text-[#1E2E1D]">
                  {score}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F6F4ED] border border-[#E0DACE] text-center">
                <span className="text-[10px] font-mono uppercase text-[#738472] block">
                  {lang === 'en' ? 'ACCURACY' : '정답률'}
                </span>
                <span className="text-2xl font-bold font-mono text-emerald-800">
                  {answeredHistory.filter((h) => h.isCorrect).length} / {questions.length}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F6F4ED] border border-[#E0DACE] text-center">
                <span className="text-[10px] font-mono uppercase text-[#738472] block">
                  {lang === 'en' ? 'MAX STREAK' : '최대 연속 정답'}
                </span>
                <span className="text-2xl font-bold font-mono text-amber-700">
                  {streak} 🔥
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F6F4ED] border border-[#E0DACE] text-center">
                <span className="text-[10px] font-mono uppercase text-[#738472] block">
                  {lang === 'en' ? 'HIGH SCORE' : '최고 기록'}
                </span>
                <span className="text-2xl font-bold font-mono text-[#384C37]">
                  {highScore}
                </span>
              </div>
            </div>

            {/* SPECIES REVIEW GALLERY / LIFE LIST */}
            <div className="space-y-4 pt-4 border-t border-[#EAE4D7]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-editorial font-bold text-[#1E2E1D]">
                    {lang === 'en' ? 'Your Daejeon Bird Life List Review' : '오늘 만난 대전 야생 조류 도감'}
                  </h3>
                  <p className="text-xs text-[#627764]">
                    {lang === 'en'
                      ? 'Review the 10 species from today’s challenge and their field notes.'
                      : '오늘 퀴즈에 등장한 10종의 야생 조류와 관찰 노트를 다시 살펴보세요.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {answeredHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-2 flex flex-col justify-between transition-all group overflow-hidden ${
                      item.isCorrect
                        ? 'bg-[#EBF3EB] border-[#B6D1B9]'
                        : 'bg-[#F9ECEB] border-[#E8C0BC]'
                    }`}
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <img
                        src={item.question.image}
                        alt={item.question.nameEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-1.5 right-1.5">
                        {item.isCorrect ? (
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs">
                            <X className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <span className="block text-xs font-bold text-[#1E2E1D] truncate">
                        {lang === 'en' ? item.question.nameEn : item.question.nameKr}
                      </span>
                      <span className="block text-[10px] font-mono text-[#5A6F5C] truncate">
                        {item.question.nameRomanized}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM ACTIONS */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#EAE4D7]">
              <button
                onClick={() => handleRestart(true)}
                className="px-5 py-3 rounded-xl bg-[#242E1F] hover:bg-[#33422C] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'en' ? 'Play Again (Shuffled)' : '다시 플레이 (새 순서 섞기)'}</span>
              </button>

              <button
                onClick={handleShareScore}
                className="px-5 py-3 rounded-xl bg-[#FAF8F3] hover:bg-[#EFECE3] border border-[#DDD6C5] text-[#242E1F] font-mono text-xs uppercase tracking-wider font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'en' ? 'Score Copied!' : '클립보드에 복사됨!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#5A6F5C]" />
                    <span>{lang === 'en' ? 'Share Score' : '기록 공유하기'}</span>
                  </>
                )}
              </button>

              <button
                onClick={onBackToHome}
                className="px-5 py-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-[#4B5E4A] font-mono text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'en' ? 'Back to Club Home' : '동아리 홈으로 이동'}</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── HIGH-RES BIRD PHOTO LIGHTBOX / INSPECTOR MODAL ── */}
      {isZoomModalOpen && currentBird && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-[#1A2317] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-[#D4C79B]" />
                <span className="font-editorial text-lg font-bold">
                  {lang === 'en' ? 'Field Binocular Inspector' : '쌍안경 상세 관찰경'}
                </span>
                <span className="text-xs font-mono text-[#D4C79B] hidden sm:inline">
                  • {currentBird.category}
                </span>
              </div>

              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image display */}
            <div className="p-4 sm:p-6 overflow-auto flex-grow flex flex-col items-center justify-center bg-black/50">
              <img
                src={currentBird.image}
                alt="High-resolution bird plumage details"
                className="max-h-[60vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Field Marks Checklist */}
            <div className="p-4 sm:p-6 bg-[#212C1E] border-t border-white/10 text-[#E6DECB] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4C79B] block">
                {lang === 'en' ? 'Key Field Marks in this Photo:' : '사진 속 주요 식별 포인트:'}
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentBird.keyFieldMarks[lang].map((mark, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-[#FAF8F3]/90 bg-white/5 p-2 rounded-xl"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{mark}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Footer minimal */}
      <footer className="py-4 text-center text-xs font-mono text-[#7D8F7B] border-t border-[#E0DCCE]">
        <span>WING WATCHERS (우송대학교 탐조 동아리) • International Student Birding Community Daejeon</span>
      </footer>
    </div>
  );
};
