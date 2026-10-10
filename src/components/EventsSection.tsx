import React, { useState } from 'react';
import { sampleEvents, ClubEvent } from '../data/clubData';
import { Calendar, Clock, MapPin, Users, CheckCircle2, AlertCircle } from 'lucide-react';

interface EventsSectionProps {
  lang: 'en' | 'kr';
  onSelectEventToRegister: (evt: ClubEvent) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ lang, onSelectEventToRegister }) => {
  const [events, setEvents] = useState<ClubEvent[]>(sampleEvents);
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());

  const handleQuickRSVP = (evt: ClubEvent) => {
    if (registeredIds.has(evt.id)) return;
    setRegisteredIds(new Set([...registeredIds, evt.id]));
    setEvents(
      events.map((e) => (e.id === evt.id ? { ...e, spotsFilled: Math.min(e.spotsTotal, e.spotsFilled + 1) } : e))
    );
  };

  return (
    <section id="events" className="py-24 bg-[#F8F7F3] border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#55695C] block mb-3">
            {lang === 'en' ? '13 / UPCOMING WALKS' : '13 / 예정된 산책 일정'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#152219] mb-4">
            {lang === 'en' ? 'Upcoming outings.' : '함께 걸을 날들을 준비합니다.'}
          </h2>
          <p className="text-base sm:text-lg text-[#526458] font-light leading-relaxed">
            {lang === 'en'
              ? 'Join an upcoming walk to meet fellow Woosong students and explore Daejeon’s autumn nature. Spots are kept modest so everyone walks closely and comfortably.'
              : '우송대 학우들과 함께 대전의 가을을 느낄 수 있는 산책에 참여해보세요. 모두가 편안하게 관찰할 수 있도록 적정 인원을 유지합니다.'}
          </p>
        </div>

        {/* Clear Notice about Example/Placeholder Events */}
        <div className="mb-8 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {lang === 'en'
                ? 'Example Outings: Below dates and meeting points illustrate scheduled club rhythms for prospective members.'
                : '예시 일정 안내: 아래 일정은 동아리 활동 방식을 안내하기 위한 예시 일정입니다. 실제 일정은 가입 후 동아리 공지방을 통해 확정됩니다.'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-amber-700/80 hidden sm:inline">
            Status: Illustrative Schedule
          </span>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => {
            const isRegistered = registeredIds.has(evt.id);
            const spotsLeft = evt.spotsTotal - evt.spotsFilled;

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl p-7 border border-subtle flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
              >
                <div className="space-y-4">
                  {/* Top tags */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#6A7B70]">
                    <span className="text-[#385140] font-medium">{evt.difficulty}</span>
                    <span className="bg-[#F8F7F3] px-2 py-0.5 rounded border border-subtle">
                      {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-editorial font-medium text-[#152219]">
                    {lang === 'en' ? evt.title : evt.koreanTitle}
                  </h3>

                  <div className="space-y-2 text-xs text-[#4F6255] font-light pt-2 border-t border-subtle">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#3A5341]" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#3A5341]" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#3A5341] shrink-0 mt-0.5" />
                      <span>{evt.meetingPoint}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#46574D] font-light leading-relaxed pt-2">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-subtle space-y-3">
                  <div className="text-[11px] text-[#697B70] font-mono">
                    GEAR: {evt.gearNeeded}
                  </div>

                  <button
                    onClick={() => handleQuickRSVP(evt)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                      isRegistered
                        ? 'bg-emerald-800 text-white cursor-default'
                        : 'bg-[#1E3125] hover:bg-[#2A4433] text-white'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>{lang === 'en' ? 'SPOT RESERVED' : '신청 완료'}</span>
                      </>
                    ) : (
                      <span>{lang === 'en' ? 'REGISTER FOR WALK' : '산책 참가 신청'}</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
