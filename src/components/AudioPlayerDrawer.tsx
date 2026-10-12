import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  Music,
  Sparkles,
  X,
  Sliders,
} from 'lucide-react';
import {
  ambianceAudio,
  soundscapeTracks,
  birdCallsList,
  SoundscapeId,
  BirdCallId,
} from '../utils/audioAmbiance';

interface AudioPlayerDrawerProps {
  lang: 'en' | 'kr';
  isOpen?: boolean;
  onClose?: () => void;
}

export const AudioPlayerDrawer: React.FC<AudioPlayerDrawerProps> = ({
  lang,
  isOpen = false,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundscapeId>('forest');
  const [volume, setVolume] = useState(0.7);
  const [activeBird, setActiveBird] = useState<BirdCallId | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'soundscapes' | 'birds'>('soundscapes');
  const [birdFilter, setBirdFilter] = useState<'all' | 'campus' | 'forest' | 'water' | 'mountain'>('all');

  useEffect(() => {
    const unsubscribe = ambianceAudio.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentTrack(state.currentTrack);
      setVolume(state.volume);
      setActiveBird(state.activeBird);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = async () => {
    await ambianceAudio.toggle();
  };

  const handleSelectTrack = async (trackId: SoundscapeId) => {
    await ambianceAudio.setTrack(trackId);
    if (!isPlaying) {
      await ambianceAudio.play();
    }
  };

  const handlePlayBird = (birdId: BirdCallId) => {
    ambianceAudio.playBirdCall(birdId);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambianceAudio.setVolume(val);
  };

  const activeTrackObj =
    soundscapeTracks.find((t) => t.id === currentTrack) || soundscapeTracks[0];

  const filteredBirds =
    birdFilter === 'all'
      ? birdCallsList
      : birdCallsList.filter((b) => b.habitat === birdFilter);

  return (
    <>
      {/* Floating Bottom Sound Dock */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Expanded Panel */}
        {(isExpanded || isOpen) && (
          <div className="w-[340px] sm:w-[410px] bg-[#FAF8F3]/95 backdrop-blur-xl border border-[#8C826C]/30 rounded-2xl shadow-2xl p-5 text-[#2D3924] animate-in slide-in-from-bottom-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#8C826C]/20 mb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#2D3924] text-[#FAF8F3] shadow-xs">
                  <Music className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-editorial text-base font-semibold leading-tight text-[#2D3924]">
                    {lang === 'en' ? 'Nature Audio Chamber' : '자연의 소리 보관소'}
                  </h4>
                  <p className="text-[10px] font-mono tracking-wider text-[#7A705B] uppercase">
                    {lang === 'en'
                      ? 'Daejeon Bird & Nature Soundscape'
                      : '대전 탐조 생태 오디오 플레이어'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1.5 text-[#7A705B] hover:text-[#2D3924] hover:bg-[#EFE9DC] rounded-md transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 text-[#7A705B] hover:text-[#2D3924] hover:bg-[#EFE9DC] rounded-md transition-colors"
                  aria-label="Collapse"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#EFE9DC] rounded-xl mb-3.5 text-xs font-mono">
              <button
                onClick={() => setActiveTab('soundscapes')}
                className={`py-1.5 px-3 rounded-lg font-medium transition-all ${
                  activeTab === 'soundscapes'
                    ? 'bg-[#FAF8F3] text-[#2D3924] shadow-xs font-semibold'
                    : 'text-[#6C634F] hover:text-[#2D3924]'
                }`}
              >
                {lang === 'en'
                  ? `Soundscapes (${soundscapeTracks.length})`
                  : `자연 배경음 (${soundscapeTracks.length})`}
              </button>
              <button
                onClick={() => setActiveTab('birds')}
                className={`py-1.5 px-3 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'birds'
                    ? 'bg-[#FAF8F3] text-[#2D3924] shadow-xs font-semibold'
                    : 'text-[#6C634F] hover:text-[#2D3924]'
                }`}
              >
                <span>
                  {lang === 'en'
                    ? `Bird Calls (${birdCallsList.length})`
                    : `새 울음소리 (${birdCallsList.length})`}
                </span>
                {activeBird && (
                  <span className="w-2 h-2 rounded-full bg-[#526242] animate-ping" />
                )}
              </button>
            </div>

            {/* Tab 1: Soundscape Tracks */}
            {activeTab === 'soundscapes' ? (
              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-1">
                {soundscapeTracks.map((track) => {
                  const isCurrent = currentTrack === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => handleSelectTrack(track.id)}
                      className={`w-full p-2.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-[#2D3924] text-[#FAF8F3] border-[#2D3924] shadow-xs'
                          : 'bg-white/80 hover:bg-white text-[#2D3924] border-[#8C826C]/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{track.icon}</span>
                        <div className="truncate">
                          <p className="text-xs font-semibold truncate leading-tight">
                            {lang === 'en' ? track.titleEn : track.titleKr}
                          </p>
                          <p
                            className={`text-[10px] truncate mt-0.5 ${
                              isCurrent ? 'text-[#D4C79B]' : 'text-[#7A705B]'
                            }`}
                          >
                            {lang === 'en' ? track.descriptionEn : track.descriptionKr}
                          </p>
                        </div>
                      </div>

                      {isCurrent && isPlaying ? (
                        <div className="flex items-end gap-0.5 h-3.5 shrink-0 ml-2">
                          <span className="w-1 bg-[#D4C79B] animate-pulse h-2.5 rounded-full" />
                          <span className="w-1 bg-[#D4C79B] animate-pulse h-3.5 rounded-full" />
                          <span className="w-1 bg-[#D4C79B] animate-pulse h-2 rounded-full" />
                        </div>
                      ) : (
                        <Play className="w-3.5 h-3.5 text-[#7A705B] shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Tab 2: Individual Bird Calls Soundboard */
              <div className="space-y-2.5 mb-4">
                {/* Bird Habitat Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
                  {(
                    [
                      { id: 'all', en: 'All (12)', kr: '전체 (12)' },
                      { id: 'campus', en: 'Campus', kr: '교정' },
                      { id: 'forest', en: 'Forest', kr: '숲길' },
                      { id: 'water', en: 'River', kr: '하천' },
                      { id: 'mountain', en: 'Mountain', kr: '산자락' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setBirdFilter(cat.id)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
                        birdFilter === cat.id
                          ? 'bg-[#2D3924] text-[#FAF8F3] font-semibold shadow-xs'
                          : 'bg-[#EFE9DC] text-[#6C634F] hover:bg-[#E2DBD0]'
                      }`}
                    >
                      {lang === 'en' ? cat.en : cat.kr}
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {filteredBirds.map((bird) => {
                    const isCurrentBird = activeBird === bird.id;
                    return (
                      <button
                        key={bird.id}
                        onClick={() => handlePlayBird(bird.id)}
                        className={`w-full p-2.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                          isCurrentBird
                            ? 'bg-[#526242] text-white border-[#526242] scale-[1.01] shadow-sm'
                            : 'bg-white/80 hover:bg-white text-[#2D3924] border-[#8C826C]/20'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold">
                              {lang === 'en' ? bird.nameEn : bird.nameKr}
                            </span>
                            <span
                              className={`text-[10px] font-mono ${
                                isCurrentBird ? 'text-[#D4C79B]' : 'text-[#8C826C]'
                              }`}
                            >
                              {lang === 'en' ? bird.nameKr : bird.nameEn}
                            </span>
                          </div>
                          <p
                            className={`text-[10px] font-mono mt-0.5 truncate ${
                              isCurrentBird ? 'text-[#EFE9DC]' : 'text-[#7A705B]'
                            }`}
                          >
                            {bird.phonetic}
                          </p>
                        </div>

                        <div className="shrink-0 p-1.5 rounded-lg bg-[#2D3924]/10 text-[#2D3924]">
                          <Volume2
                            className={`w-3.5 h-3.5 ${
                              isCurrentBird ? 'text-white animate-bounce' : 'text-[#2D3924]'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Master Volume & Playback Controls */}
            <div className="pt-3 border-t border-[#8C826C]/20 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#2D3924] hover:bg-[#3B4A2F] text-white font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>{lang === 'en' ? 'PAUSE AMBIANCE' : '자연 소리 일시정지'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{lang === 'en' ? 'PLAY AMBIANCE' : '자연 소리 재생'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    const newVol = volume > 0 ? 0 : 0.7;
                    setVolume(newVol);
                    ambianceAudio.setVolume(newVol);
                  }}
                  className="p-2.5 rounded-xl border border-[#8C826C]/30 hover:bg-white text-[#2D3924] transition-colors"
                  aria-label="Mute toggle"
                >
                  {volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-700" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2.5 px-1">
                <VolumeX className="w-3 h-3 text-[#7A705B]" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-[#E2DBD0] rounded-lg appearance-none cursor-pointer accent-[#2D3924]"
                  aria-label="Volume slider"
                />
                <Volume2 className="w-3.5 h-3.5 text-[#2D3924]" />
                <span className="font-mono text-[10px] text-[#7A705B] w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed Compact Floating Dock Pill */}
        {!isExpanded && !isOpen && (
          <div className="flex items-center gap-2 bg-[#2D3924]/95 hover:bg-[#2D3924] text-[#FAF8F3] px-3.5 py-2 rounded-full shadow-xl border border-[#8C826C]/40 backdrop-blur-md transition-all group">
            <button
              onClick={handleTogglePlay}
              className="p-1 rounded-full bg-[#FAF8F3]/10 hover:bg-[#FAF8F3]/20 transition-colors"
              title={isPlaying ? 'Pause Nature Sound' : 'Play Nature Sound'}
              aria-label="Play or pause nature ambiance"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-[#D4C79B] fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white fill-current" />
              )}
            </button>

            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 text-left"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-base">{activeTrackObj.icon}</span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium leading-none tracking-wide text-white">
                    {lang === 'en' ? activeTrackObj.titleEn : activeTrackObj.titleKr}
                  </span>
                  <span className="text-[9px] font-mono text-[#D4C79B] leading-none mt-0.5">
                    {isPlaying
                      ? lang === 'en'
                        ? 'Playing'
                        : '재생 중'
                      : lang === 'en'
                      ? 'Nature Audio'
                      : '자연소리'}
                  </span>
                </div>
              </div>

              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 pl-1">
                  <span className="w-0.5 bg-[#D4C79B] animate-pulse h-2 rounded-full" />
                  <span className="w-0.5 bg-[#D4C79B] animate-pulse h-3 rounded-full" />
                  <span className="w-0.5 bg-[#D4C79B] animate-pulse h-1.5 rounded-full" />
                </div>
              )}

              <ChevronUp className="w-3.5 h-3.5 text-[#D4C79B] group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
