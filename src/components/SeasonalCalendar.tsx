import React, { useState } from 'react';
import { seasonalCalendar, SeasonInfo } from '../data/clubData';
import { Sun, CloudRain, Wind, Snowflake, Calendar as CalendarIcon } from 'lucide-react';

interface SeasonalCalendarProps {
  lang: 'en' | 'kr';
}

export const SeasonalCalendar: React.FC<SeasonalCalendarProps> = ({ lang }) => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonInfo['season']>('autumn');

  const seasonIcons = {
    spring: Sun,
    summer: CloudRain,
    autumn: Wind,
    winter: Snowflake,
  };

  const current = seasonalCalendar.find((s) => s.season === selectedSeason) || seasonalCalendar[0];

  return (
    <section className="py-24 bg-[#FBFBFA] border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#55695C] block mb-3">
            {lang === 'en' ? '07 / SEASONAL RHYTHM' : '07 / 사계절의 리듬'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#152219] mb-4">
            {lang === 'en' ? 'Nature changes. So do our walks.' : '계절이 바뀌면, 우리의 산책도 새로워집니다.'}
          </h2>
          <p className="text-base sm:text-lg text-[#516357] font-light leading-relaxed mb-2">
            {lang === 'en'
              ? 'Daejeon undergoes distinct transformations across the four Korean seasons. We adjust our walking hours, target habitats, and observation focus to match wildlife patterns.'
              : '한국의 뚜렷한 사계절 속에서 대전의 자연은 매 순간 다른 빛깔을 띱니다. 새들의 번식, 이동, 월동 리듬에 맞추어 산책의 시간과 장소를 유연하게 조율합니다.'}
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#6A7B70]">
            <CalendarIcon className="w-3.5 h-3.5 text-[#3A5341]" />
            <span>
              {lang === 'en'
                ? 'Flexible rhythm: One main outing each month + optional weekend mini-meetups'
                : '유연한 운영: 매달 1회의 정기 산책 + 주말 자유 번개 모임'}
            </span>
          </div>
        </div>

        {/* Four-Season Horizontal Tab Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {seasonalCalendar.map((item) => {
            const isSelected = selectedSeason === item.season;
            const Icon = seasonIcons[item.season];
            return (
              <button
                key={item.season}
                onClick={() => setSelectedSeason(item.season)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'bg-[#1E3125] text-white border-[#1E3125] shadow-md'
                    : 'bg-white hover:bg-[#F2F1EC] text-[#1E2320] border-subtle'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider opacity-70">
                    {item.season}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#E5D7A3]' : 'text-[#677F6E]'}`} />
                </div>
                <div>
                  <h4 className="font-editorial text-lg sm:text-xl font-medium leading-tight">
                    {lang === 'en' ? item.title.split('&')[0] : item.koreanTitle.split('—')[0]}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Season Card */}
        <div className="bg-[#F4F3EE] rounded-3xl p-8 sm:p-12 border border-subtle space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-subtle">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#55695C] block mb-1">
                {current.season.toUpperCase()} SEMESTER CYCLE
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#152219]">
                {lang === 'en' ? current.title : current.koreanTitle}
              </h3>
            </div>
            <span className="text-xs font-mono text-[#385140] bg-white px-3 py-1.5 rounded-lg border border-subtle self-start">
              {lang === 'en' ? current.theme : current.koreanTheme}
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#324337] font-light leading-relaxed max-w-4xl">
            {current.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-subtle text-xs sm:text-sm">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#697B70] block mb-2">
                {lang === 'en' ? 'Seasonal Birds to Notice:' : '이 계절에 주목할 새들:'}
              </span>
              <div className="flex flex-wrap gap-2 text-[#1E3125]">
                {current.birdsToNotice.map((bird, i) => (
                  <span key={i} className="px-3 py-1 bg-white rounded-md border border-subtle font-medium">
                    {bird}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#697B70] block mb-2">
                {lang === 'en' ? 'Suggested Rhythm & Pace:' : '권장 산책 속도와 주기:'}
              </span>
              <p className="text-[#324337] font-light leading-relaxed">
                {current.recommendedPace}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
