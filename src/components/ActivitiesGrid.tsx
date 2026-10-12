import React, { useState } from 'react';
import { clubActivities, Activity } from '../data/clubData';
import {
  Camera,
  Footprints,
  Users,
  BookOpen,
  Coffee,
  Sparkles,
  Eye,
  Mic,
  ShieldCheck,
  Sun,
  HelpCircle,
  ArrowRight,
  Calendar
} from 'lucide-react';

interface ActivitiesGridProps {
  lang: 'en' | 'kr';
  onOpenGame?: () => void;
}

export const ActivitiesGrid: React.FC<ActivitiesGridProps> = ({ lang, onOpenGame }) => {
  const [filter, setFilter] = useState<'all' | 'walk' | 'creative' | 'community'>('all');

  const filteredActivities = clubActivities.filter((a) => {
    if (filter === 'all') return true;
    return a.category === filter;
  });

  const getIcon = (id: string) => {
    switch (id) {
      case 'act-1':
        return Footprints;
      case 'act-2':
        return Footprints;
      case 'act-3':
        return Camera;
      case 'act-4':
        return BookOpen;
      case 'act-5':
        return Sparkles;
      case 'act-6':
        return Users;
      case 'act-7':
        return Coffee;
      case 'act-8':
        return Eye;
      case 'act-9':
        return Mic;
      case 'act-10':
        return ShieldCheck;
      case 'act-11':
        return Sun;
      case 'act-12':
        return HelpCircle;
      default:
        return Footprints;
    }
  };

  const handleScrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="activities" className="py-24 bg-[#F8F7F3] border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#55695C] block mb-3">
              {lang === 'en' ? '08 / COMMUNITY EXPERIENCES & ACTIVITIES' : '08 / 동아리 활동 프로그램'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#152219] mb-4">
              {lang === 'en' ? 'Community over competition.' : '경쟁이 아닌, 함께 머무는 시간.'}
            </h2>
            <p className="text-base sm:text-lg text-[#506356] font-light leading-relaxed">
              {lang === 'en'
                ? 'We never score who spotted the rarest bird. Wing Watchers is designed around sharing curiosity, practicing photography, and building friendships that last past graduation. Explore our 12 community activities below.'
                : '누가 더 희귀한 새를 찾았는지 점수를 매기지 않습니다. 윙워처스는 함께 발견하고, 사진을 남기며, 졸업 후에도 이어질 소중한 우정을 나누는 곳입니다. 아래 12가지 동아리 활동 프로그램을 둘러보세요.'}
            </p>
          </div>

          {/* Filter tabs (Segmented Controls) */}
          <div className="flex items-center gap-1 p-1 bg-[#EBEAE4] rounded-xl self-start border border-subtle">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'All Activities' : '전체'} ({clubActivities.length})
            </button>
            <button
              onClick={() => setFilter('walk')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'walk'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'Field Walks' : '필드 산책'}
            </button>
            <button
              onClick={() => setFilter('creative')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'creative'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'Creative & Journal' : '창작 & 기록'}
            </button>
            <button
              onClick={() => setFilter('community')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'community'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'Social & Care' : '친목 & 케어'}
            </button>
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => {
            const Icon = getIcon(act.id);
            return (
              <div
                key={act.id}
                className="bg-white rounded-2xl p-7 border border-subtle hover:border-[#1E3125]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-[#F4F3EE] text-[#294030]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#6A7B70] bg-[#F7F7F4] px-2.5 py-1 rounded-md border border-subtle">
                      {act.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-editorial font-medium text-[#152219] mb-1">
                    {lang === 'en' ? act.title : act.koreanTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4E6154] font-light leading-relaxed mt-2 mb-4">
                    {lang === 'en' ? act.description : act.koreanDescription}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-subtle">
                  <div className="text-xs text-[#5D6F63]">
                    <span className="font-mono text-[10px] uppercase tracking-wider block text-[#7F9185] mb-0.5">
                      {lang === 'en' ? 'EXPERIENCE HIGHLIGHT' : '활동 특징'}
                    </span>
                    <span className="font-light italic">“{act.takeaway}”</span>
                  </div>

                  {act.id === 'act-12' && onOpenGame ? (
                    <button
                      onClick={onOpenGame}
                      className="w-full py-2 px-3 rounded-xl bg-[#242E1F] text-white hover:bg-[#32402B] flex items-center justify-between text-xs font-semibold font-mono tracking-wider transition-all shadow-xs cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>🎮</span>
                        <span>{lang === 'en' ? 'Play Guess the Bird Game' : '새 맞히기 게임 플레이'}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleScrollToEvents}
                      className="w-full pt-2 flex items-center justify-between text-xs font-medium text-[#2F4733] hover:text-[#152219] transition-colors group cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#3A5341]" />
                        <span>{lang === 'en' ? 'Check Upcoming Outings' : '예정된 산책 일정 보기'}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
