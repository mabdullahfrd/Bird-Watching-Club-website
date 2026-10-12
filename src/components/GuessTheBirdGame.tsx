import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Sparkles,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Feather,
  MapPin,
  Flame,
  ArrowRight,
  HelpCircle,
  Share2,
  Check,
  Gamepad2,
  ExternalLink,
  ZoomIn,
  Eye
} from 'lucide-react';
import { ambianceAudio } from '../utils/audioAmbiance';
import { BIRD_QUIZ_DATA, BirdQuizQuestion } from '../data/birdGameData';

interface GuessTheBirdGameProps {
  lang: 'en' | 'kr';
  onOpenDedicatedPage?: () => void;
}

const STORAGE_KEY = 'wingwatchers_bird_game_highscore';

export const GuessTheBirdGame: React.FC<GuessTheBirdGameProps> = ({
  lang,
  onOpenDedicatedPage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch {
      // ignore
    }
  }, []);

  const currentBird = BIRD_QUIZ_DATA[currentIndex];

  const handlePlayCall = () => {
    if (!currentBird?.callId) return;
    setIsPlayingAudio(true);
    ambianceAudio.playBirdCall(currentBird.callId);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1800);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentBird.correctIndex;
    if (isCorrect) {
      const bonus = streak >= 2 ? 15 : 10;
      const newScore = score + bonus;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);

      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem(STORAGE_KEY, newScore.toString());
        } catch {
          // ignore
        }
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < BIRD_QUIZ_DATA.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setGameFinished(false);
  };

  const handleShareScore = () => {
    const text = `🦅 I scored ${score} pts in the Wing Watchers "Guess the Bird" Challenge! (Woosong University Birding Club). Can you identify Daejeon's wild birds from their photos?`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <section id="game" className="py-24 bg-[#F5F3EC] border-b border-[#8C826C]/20 relative overflow-hidden">
      {/* Decorative subtle background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#3B4D35]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#B8A88A]/15 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner: Switch to Dedicated Game Page */}
        {onOpenDedicatedPage && (
          <div className="mb-8 p-4 rounded-2xl bg-[#242E1F] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-[#3E4E36]">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-white/10 text-[#D4C79B] shrink-0">
                <Gamepad2 className="w-5 h-5" />
              </span>
              <div>
                <span className="block font-editorial font-bold text-base sm:text-lg text-[#F8F5EE]">
                  {lang === 'en'
                    ? 'Dedicated "Guess the Bird" Game Page Available!'
                    : '새 맞히기 전용 게임 페이지에서 플레이하세요!'}
                </span>
                <span className="text-xs text-[#D2C9B3] font-light">
                  {lang === 'en'
                    ? 'Featuring high-res binoculars zoom inspection, silhouette challenge mode, and life list review.'
                    : '고해상도 쌍안경 확대 검사, 실루엣 챌린지 모드, 도감 복습 기능 지원.'}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenDedicatedPage}
              className="px-4 py-2.5 rounded-xl bg-[#D4C79B] hover:bg-[#E2D6AC] text-[#1E2519] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Open Game Page' : '전용 페이지 열기'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="p-1 rounded-md bg-[#242E1F] text-[#FAF8F3]">
                <Gamepad2 className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#55695C]">
                {lang === 'en' ? 'INTERACTIVE / GUESS THE BIRD GAME' : '인터랙티브 / 새 맞히기 퀴즈 게임'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#152219] mb-3">
              {lang === 'en' ? 'Look at the photo, identify the bird.' : '사진을 보고 어떤 새인지 맞춰보세요.'}
            </h2>
            <p className="text-base sm:text-lg text-[#526458] font-light leading-relaxed">
              {lang === 'en'
                ? 'Guess real wild birds photographed across Daejeon by international students. Examine bill shape, plumage, and eye markings.'
                : '우송대 유학생들이 대전 곳곳에서 직접 관찰하고 촬영한 야생 조류 사진을 보고 깃털과 부리 모양을 통해 맞혀보세요.'}
            </p>
          </div>

          {/* Score & Streak Stats HUD */}
          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-subtle shadow-sm self-start md:self-end">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              <div>
                <span className="block text-[10px] font-mono uppercase text-[#7A8A7E]">SCORE</span>
                <span className="text-sm font-bold text-[#1E3020]">{score} pts</span>
              </div>
            </div>

            <div className="h-7 w-[1px] bg-stone-200" />

            <div className="flex items-center gap-2">
              <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-stone-400'}`} />
              <div>
                <span className="block text-[10px] font-mono uppercase text-[#7A8A7E]">STREAK</span>
                <span className="text-sm font-bold text-[#1E3020]">{streak} 🔥</span>
              </div>
            </div>

            <div className="h-7 w-[1px] bg-stone-200 hidden sm:block" />

            <div className="hidden sm:block">
              <span className="block text-[10px] font-mono uppercase text-[#7A8A7E]">BEST</span>
              <span className="text-xs font-mono text-[#526458] font-medium">{highScore} pts</span>
            </div>
          </div>
        </div>

        {/* GAME ARENA */}
        {!gameFinished ? (
          <div className="bg-white rounded-3xl border border-[#8C826C]/25 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
            {/* Round indicator & Difficulty tag */}
            <div className="flex items-center justify-between border-b border-[#EAE6DD] pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#526242]">
                <span className="px-2.5 py-1 rounded-lg bg-[#EFECE3] font-semibold text-[#242E1F]">
                  ROUND {currentIndex + 1} / {BIRD_QUIZ_DATA.length}
                </span>
                <span className="text-[#8C826C]">•</span>
                <span className="text-[11px] font-medium text-[#647565]">
                  {currentBird.difficulty} • {currentBird.category}
                </span>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {BIRD_QUIZ_DATA.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-6 bg-[#253926]'
                        : idx < currentIndex
                        ? 'w-2 bg-emerald-600'
                        : 'w-2 bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* CENTRAL PHOTO & QUESTION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left / Top: High-Resolution Wildlife Photograph */}
              <div className="md:col-span-6 flex flex-col items-center">
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/5 border-2 border-[#DCD6C7] shadow-inner relative group">
                  <img
                    src={currentBird.image}
                    alt={isAnswered ? currentBird.nameEn : 'Mystery species'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Habitat pill */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#D4C79B]" />
                    <span>{currentBird.habitatInDaejeon[lang]}</span>
                  </div>

                  {onOpenDedicatedPage && (
                    <button
                      onClick={onOpenDedicatedPage}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-all"
                      title="Open full dedicated game page"
                    >
                      <ZoomIn className="w-4 h-4 text-[#D4C79B]" />
                    </button>
                  )}
                </div>

                {/* Sub-photo clue */}
                <div className="mt-3 w-full flex items-center justify-between text-xs text-[#526458]">
                  <span className="flex items-center gap-1">
                    <Feather className="w-3.5 h-3.5 text-[#35523C]" />
                    <span>{currentBird.category}</span>
                  </span>

                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-[11px] font-mono text-[#4C6444] hover:underline flex items-center gap-1"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{lang === 'en' ? 'Show Visual Clue' : '관찰 힌트 보기'}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      💡 {currentBird.visualClue[lang]}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Audio Call & Question Choices */}
              <div className="md:col-span-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#637667] block">
                    {lang === 'en' ? 'FIELD OBSERVATION' : '필드 관찰 퀴즈'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-editorial font-medium text-[#1E2B1D] leading-snug">
                    {lang === 'en'
                      ? '“Which bird is shown in this photograph?”'
                      : '“사진 속에 담긴 새의 올바른 이름은 무엇일까요?”'}
                  </h3>
                </div>

                {/* Sound call button */}
                {currentBird.callId && (
                  <div className="p-3.5 rounded-2xl bg-[#F6F4ED] border border-[#DDD8CA] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-[#1C2C1D] block">
                        {lang === 'en' ? 'Audio Reference' : '울음소리 듣기'}
                      </span>
                      <span className="text-[11px] font-mono text-[#586C5A] italic block">
                        {currentBird.soundPhonetic}
                      </span>
                    </div>

                    <button
                      onClick={handlePlayCall}
                      className={`px-3.5 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                        isPlayingAudio
                          ? 'bg-emerald-700 text-white shadow-md animate-pulse'
                          : 'bg-[#1E3125] hover:bg-[#2A4433] text-white shadow-sm'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlayingAudio ? (lang === 'en' ? 'Playing...' : '재생 중') : (lang === 'en' ? 'Play' : '듣기')}</span>
                    </button>
                  </div>
                )}

                {/* 4 Choices */}
                <div className="space-y-2 pt-1">
                  {currentBird.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentBird.correctIndex;

                    let btnStyle =
                      'bg-[#FAF8F3] hover:bg-[#F2EFE6] border-[#D6CFC0] text-[#243522] shadow-2xs';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle =
                          'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500';
                      } else if (isSelected && !isCorrect) {
                        btnStyle =
                          'bg-red-800 text-white border-red-900 shadow-md ring-2 ring-red-400';
                      } else {
                        btnStyle = 'bg-stone-100 text-stone-400 border-stone-200 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`w-full p-3 rounded-xl border text-left font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center font-mono text-xs shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <div>
                            <span className="text-sm font-semibold">
                              {lang === 'en' ? opt.en : `${opt.kr} (${opt.en})`}
                            </span>
                          </div>
                        </div>

                        {isAnswered && (
                          <div>
                            {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                            {isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-red-300" />
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ANSWER REVEAL CARD */}
            {isAnswered && (
              <div className="p-5 rounded-2xl bg-[#EAF2EA] border border-[#B9CFBC] space-y-3 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C8DACB] pb-2.5">
                  <div className="flex items-center gap-2">
                    {selectedOption === currentBird.correctIndex ? (
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'en' ? 'Correct identification! (+10 pts)' : '정답입니다! (+10점)'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-800 font-semibold text-sm">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span>{lang === 'en' ? 'Not quite right!' : '오답입니다!'}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs font-mono text-[#4F6A53]">
                    <span className="font-bold text-[#1F3624]">
                      {currentBird.nameEn} ({currentBird.nameKr})
                    </span>{' '}
                    • <em>{currentBird.scientificName}</em>
                  </div>
                </div>

                <div className="text-xs text-[#3A533E] font-light leading-relaxed">
                  <strong className="font-semibold block text-[#1B3120] mb-0.5">
                    💡 {lang === 'en' ? 'Field Fact:' : '생태 상식:'}
                  </strong>
                  {currentBird.funFact[lang]}
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 rounded-xl bg-[#242E1F] hover:bg-[#34442E] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>
                    {currentIndex + 1 < BIRD_QUIZ_DATA.length
                      ? (lang === 'en' ? 'Next Bird' : '다음 새')
                      : (lang === 'en' ? 'See Results' : '결과 보기')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* SUMMARY */
          <div className="bg-white rounded-3xl border border-[#8C826C]/25 shadow-xl p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F3] border border-[#DDD8CA] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-amber-600" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#667768] block mb-1">
                {lang === 'en' ? 'QUIZ COMPLETED' : '퀴즈 완료'}
              </span>
              <h3 className="text-3xl font-editorial font-bold text-[#1C2C1D]">
                {score >= 80 ? (lang === 'en' ? 'Master Birder!' : '마스터 탐조가!') : (lang === 'en' ? 'Great Effort!' : '멋진 도전이었습니다!')}
              </h3>
              <p className="text-sm text-[#556958] mt-1">
                {lang === 'en' ? `You scored ${score} points.` : `최종 ${score}점을 획득하셨습니다.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-[#242E1F] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'en' ? 'Play Again' : '다시 하기'}</span>
              </button>

              {onOpenDedicatedPage && (
                <button
                  onClick={onOpenDedicatedPage}
                  className="px-5 py-2.5 rounded-xl bg-[#D4C79B] text-[#1E2519] font-mono text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Dedicated Game Page' : '전용 게임 페이지'}</span>
                </button>
              )}

              <button
                onClick={handleShareScore}
                className="px-5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#DDD6C5] text-[#242E1F] font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 cursor-pointer"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#5A6F5C]" />}
                <span>{copiedShare ? (lang === 'en' ? 'Copied!' : '복사됨!') : (lang === 'en' ? 'Share' : '공유')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
