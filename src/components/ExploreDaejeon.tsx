import React, { useState } from 'react';
import { exploreWaypoints, Waypoint } from '../data/clubData';
import { MapPin, Navigation, Clock, Binoculars, ArrowRight } from 'lucide-react';

interface ExploreDaejeonProps {
  lang: 'en' | 'kr';
}

export const ExploreDaejeon: React.FC<ExploreDaejeonProps> = ({ lang }) => {
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint>(exploreWaypoints[0]);

  return (
    <section id="explore" className="py-24 bg-[#FAF8F3] border-b border-[#8C826C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#526242] block mb-3">
            {lang === 'en' ? '05 / DAEJEON OUTDOOR CLASSROOM' : '05 / 대전 야외 교실'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#242E1F] mb-4">
            {lang === 'en' ? 'The city is our outdoor classroom.' : '도시 전체가 우리의 야외 교실입니다.'}
          </h2>
          <p className="text-base sm:text-lg text-[#595241] font-light leading-relaxed mb-4">
            {lang === 'en'
              ? 'Wing Watchers starts right outside the Woosong lecture halls. We don’t need to venture hundreds of kilometers away to find something remarkable.'
              : '윙워처스의 여정은 우송대학교 강의실 문 앞 소나무 숲에서 바로 시작됩니다. 가치 있는 것을 발견하기 위해 수백 킬로미터를 멀리 떠날 필요는 없습니다.'}
          </p>
          <p className="text-sm font-editorial italic text-[#3B4A2F]">
            {lang === 'en'
              ? '“We don’t need to travel far to find something worth noticing.”'
              : '“주목할 만한 것을 발견하기 위해, 우리는 결코 멀리 갈 필요가 없습니다.”'}
          </p>
        </div>

        {/* Interactive Exploration Map / Waypoint Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Waypoint Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase text-[#7A705B] tracking-wider block mb-2">
              {lang === 'en' ? 'Accessible Outing Sites Around Campus:' : '우송대 인근 주요 탐조 거점:'}
            </span>

            {exploreWaypoints.map((wp) => {
              const isSelected = selectedWaypoint.id === wp.id;
              return (
                <button
                  key={wp.id}
                  onClick={() => setSelectedWaypoint(wp)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#2D3924] text-white border-[#2D3924] shadow-md'
                      : 'bg-white hover:bg-[#EFE9DC]/50 text-[#2D3924] border-[#8C826C]/25'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4C79B]' : 'text-[#526242]'}`} />
                      <span className="text-sm font-medium">
                        {lang === 'en' ? wp.name : wp.koreanName}
                      </span>
                    </div>
                    <span
                      className={`text-xs block font-mono ${
                        isSelected ? 'text-[#D4C79B]' : 'text-[#7A705B]'
                      }`}
                    >
                      {wp.distanceFromCampus}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'text-[#D4C79B] translate-x-1' : 'text-[#8C826C]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Waypoint Detailed Card */}
          <div className="lg:col-span-7 bg-[#EFE9DC]/70 rounded-3xl p-8 sm:p-10 border border-[#8C826C]/25 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#8C826C]/20">
              <div>
                <span className="text-xs font-mono text-[#526242] uppercase tracking-wider block mb-1">
                  {selectedWaypoint.environment}
                </span>
                <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#242E1F]">
                  {lang === 'en' ? selectedWaypoint.name : selectedWaypoint.koreanName}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#2D3924] bg-white/90 px-3 py-1.5 rounded-lg border border-[#8C826C]/25 self-start">
                <Navigation className="w-3.5 h-3.5" />
                <span>{selectedWaypoint.distanceFromCampus}</span>
              </div>
            </div>

            {/* Highlight */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase text-[#7A705B] tracking-wider block">
                {lang === 'en' ? 'Why We Walk Here:' : '이곳을 찾는 이유:'}
              </span>
              <p className="text-sm sm:text-base text-[#3A3326] font-light leading-relaxed">
                {selectedWaypoint.highlight}
              </p>
            </div>

            {/* Notable Birds to Notice */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#7A705B] tracking-wider block">
                {lang === 'en' ? 'Frequent Seasonal Neighbors:' : '자주 마주치는 이웃 새들:'}
              </span>
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-[#2D3924]">
                {selectedWaypoint.notableBirds.map((bird, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white rounded-lg border border-[#8C826C]/20 font-medium">
                    {bird}
                  </span>
                ))}
              </div>
            </div>

            {/* Best Time & Field Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#8C826C]/20 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#526242] font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'IDEAL TIME' : '최적 관찰 시간'}</span>
                </div>
                <p className="text-[#3A3326]">{selectedWaypoint.bestTime}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#526242] font-mono">
                  <Binoculars className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'FIELD OBSERVATION TIP' : '탐조 팁'}</span>
                </div>
                <p className="text-[#3A3326]">{selectedWaypoint.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
