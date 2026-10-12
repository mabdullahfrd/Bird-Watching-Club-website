import React, { useState, useEffect } from 'react';
import { sampleEvents, ClubEvent } from '../data/clubData';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Sparkles,
  Ticket,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Feather
} from 'lucide-react';
import { EventSignUpModal, EventRegistration } from './EventSignUpModal';

interface EventsSectionProps {
  lang: 'en' | 'kr';
}

const STORAGE_KEY = 'wingwatchers_event_registrations';

export const EventsSection: React.FC<EventsSectionProps> = ({ lang }) => {
  const [events, setEvents] = useState<ClubEvent[]>(sampleEvents);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [selectedEventForModal, setSelectedEventForModal] = useState<ClubEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load persisted registrations on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: EventRegistration[] = JSON.parse(saved);
        setRegistrations(parsed);

        // Reflect spot counts for registered events
        setEvents((prevEvents) =>
          prevEvents.map((evt) => {
            const hasReg = parsed.some((r) => r.eventId === evt.id);
            if (hasReg) {
              return {
                ...evt,
                spotsFilled: Math.min(evt.spotsTotal, evt.spotsFilled + 1),
              };
            }
            return evt;
          })
        );
      }
    } catch {
      // Ignore storage parse error
    }
  }, []);

  const registeredEventIds = new Set(registrations.map((r) => r.eventId));

  const handleOpenSignUp = (evt: ClubEvent) => {
    setSelectedEventForModal(evt);
    setIsModalOpen(true);
  };

  const handleConfirmRegistration = (reg: EventRegistration) => {
    const updated = [...registrations.filter((r) => r.eventId !== reg.eventId), reg];
    setRegistrations(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setEvents((prev) =>
      prev.map((e) =>
        e.id === reg.eventId ? { ...e, spotsFilled: Math.min(e.spotsTotal, e.spotsFilled + 1) } : e
      )
    );
  };

  const handleCancelRegistration = (eventId: string) => {
    const updated = registrations.filter((r) => r.eventId !== eventId);
    setRegistrations(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, spotsFilled: Math.max(0, e.spotsFilled - 1) } : e
      )
    );
  };

  // Filtered and searched events
  const filteredEvents = events.filter((evt) => {
    const matchesCategory =
      filterCategory === 'all' ||
      evt.category === filterCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      evt.title.toLowerCase().includes(query) ||
      evt.koreanTitle.toLowerCase().includes(query) ||
      evt.meetingPoint.toLowerCase().includes(query) ||
      (evt.targetSpecies && evt.targetSpecies.some((s) => s.toLowerCase().includes(query))) ||
      evt.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="events" className="py-24 bg-[#F8F7F3] border-b border-subtle relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#55695C] block mb-3">
              {lang === 'en' ? '13 / SCHEDULED OUTINGS & WALKS · RUN BY INT’L STUDENTS' : '13 / 예정된 산책 & 탐조 일정 · 유학생 주도'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#152219] mb-4">
              {lang === 'en' ? 'Upcoming outings.' : '함께 걸을 날들을 준비합니다.'}
            </h2>
            <p className="text-base sm:text-lg text-[#526458] font-light leading-relaxed">
              {lang === 'en'
                ? 'Run by international students at Woosong University. All walks are guided in English with warm bilingual support. Join classmates from 30+ nations to explore Daejeon’s living nature.'
                : '우송대학교 외국인 유학생들이 직접 이끄는 산책 모임. 모든 탐조는 영어로 진행되며 한국어 소통 지원이 함께합니다. 30여 개국 학우들과 대전의 자연을 편안하게 걸어보세요.'}
            </p>
          </div>

          {/* Quick Counter Summary */}
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-subtle shadow-sm self-start md:self-end">
            <div className="p-2 rounded-xl bg-[#EBF2EB] text-[#294231]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-mono text-[#6A7B70] uppercase">
                {lang === 'en' ? 'Scheduled Outings' : '개설된 일정'}
              </span>
              <span className="text-sm font-semibold text-[#152219]">
                {events.length} {lang === 'en' ? 'Upcoming Dates' : '개 일정'}
              </span>
            </div>
          </div>
        </div>

        {/* User Active Reservations Banner */}
        {registrations.length > 0 && (
          <div className="mb-10 p-5 rounded-2xl bg-[#EAF2EA] border border-[#BACFBD] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Ticket className="w-5 h-5 text-[#2B4934] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#183020]">
                    {lang === 'en'
                      ? `You are registered for ${registrations.length} upcoming ${registrations.length === 1 ? 'walk' : 'walks'}!`
                      : `현재 ${registrations.length}개의 산책 일정에 참가 신청되어 있습니다!`}
                  </h4>
                  <p className="text-xs text-[#48634F] font-light mt-0.5">
                    {lang === 'en'
                      ? 'Click on any registered event card below to review your boarding pass, download calendar invite, or update RSVP.'
                      : '아래에서 신청 완료된 카드를 클릭하면 참가 패스 확인, 캘린더 저장(.ics), 예약 취소가 가능합니다.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {registrations.map((reg) => {
                  const ev = events.find((e) => e.id === reg.eventId);
                  return (
                    <button
                      key={reg.registrationId}
                      onClick={() => {
                        if (ev) handleOpenSignUp(ev);
                      }}
                      className="text-xs px-3 py-1.5 rounded-xl bg-white text-[#1E3324] border border-[#B3C8B6] hover:bg-[#F3FAF4] font-medium transition-colors shadow-2xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{reg.eventTitle.split(':')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Category Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EBEAE4] rounded-2xl border border-subtle overflow-x-auto">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                filterCategory === 'all'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'All Outings' : '전체 일정'} ({events.length})
            </button>
            <button
              onClick={() => setFilterCategory('campus')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                filterCategory === 'campus'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'Campus Walks' : '캠퍼스 산책'}
            </button>
            <button
              onClick={() => setFilterCategory('river')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                filterCategory === 'river'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'Rivers & Wetlands' : '강변 & 갈대밭'}
            </button>
            <button
              onClick={() => setFilterCategory('forest')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                filterCategory === 'forest'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'Forest Trails' : '숲길 & 공원'}
            </button>
            <button
              onClick={() => setFilterCategory('workshop')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                filterCategory === 'workshop'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'Workshops' : '워크숍 & 스케치'}
            </button>
            <button
              onClick={() => setFilterCategory('social')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                filterCategory === 'social'
                  ? 'bg-white text-[#152219] shadow-xs'
                  : 'text-[#607166] hover:text-[#152219]'
              }`}
            >
              {lang === 'en' ? 'Social & Tea' : '소셜 & 모임'}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#7B8B80] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search outings or birds...' : '산책 코스, 새 이름 검색...'}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-subtle text-xs text-[#1D291F] placeholder-[#8E9C91] focus:outline-none focus:ring-1 focus:ring-[#374D38]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8E9C91] hover:text-[#1D291F]"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Clear Notice about Outings */}
        <div className="mb-8 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {lang === 'en'
                ? 'Sign-up Form Active: Select any outing below to reserve your spot and receive your digital boarding pass.'
                : '신청 폼 운영 중: 아래 원하는 산책 일정을 선택하여 참가 신청을 완료하고 디지털 참가 패스를 발급받으세요.'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-amber-700/80 hidden sm:inline">
            Status: RSVP Open
          </span>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-subtle">
            <p className="text-sm text-[#5B6D60]">
              {lang === 'en' ? 'No outings match your search criteria.' : '조건에 일치하는 산책 일정이 없습니다.'}
            </p>
            <button
              onClick={() => {
                setFilterCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-[#2D4533] underline"
            >
              {lang === 'en' ? 'Reset filters' : '필터 초기화'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => {
              const isRegistered = registeredEventIds.has(evt.id);
              const spotsLeft = Math.max(0, evt.spotsTotal - evt.spotsFilled);
              const percentFilled = Math.min(100, Math.round((evt.spotsFilled / evt.spotsTotal) * 100));

              return (
                <div
                  key={evt.id}
                  className={`bg-white rounded-2xl p-7 border transition-all duration-200 flex flex-col justify-between ${
                    isRegistered
                      ? 'border-emerald-600/50 ring-2 ring-emerald-600/20 shadow-md'
                      : 'border-subtle hover:border-[#1E3125]/30 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top tags */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#385140] font-medium bg-[#F1EFE8] px-2 py-0.5 rounded border border-[#E2DDD1]">
                          {evt.difficulty}
                        </span>
                        {evt.category && (
                          <span className="text-[#65796A] uppercase text-[10px] hidden sm:inline">
                            • {evt.category}
                          </span>
                        )}
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded border text-[11px] ${
                          spotsLeft <= 3
                            ? 'bg-amber-50 text-amber-800 border-amber-200 font-medium'
                            : 'bg-[#F8F7F3] text-[#55695C] border-subtle'
                        }`}
                      >
                        {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-editorial font-medium text-[#152219] leading-snug">
                      {lang === 'en' ? evt.title : evt.koreanTitle}
                    </h3>

                    {/* Progress Bar for Capacity */}
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-[#EFECE3] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isRegistered
                              ? 'bg-emerald-600'
                              : percentFilled > 80
                              ? 'bg-amber-600'
                              : 'bg-[#3A5341]'
                          }`}
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-[#7D8F82]">
                        <span>{evt.spotsFilled} / {evt.spotsTotal} reserved</span>
                        <span>{percentFilled}%</span>
                      </div>
                    </div>

                    {/* Date, Time, Location details */}
                    <div className="space-y-2 text-xs text-[#4F6255] font-light pt-2 border-t border-subtle">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#3A5341] shrink-0" />
                        <span className="font-medium text-[#243525]">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#3A5341] shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#3A5341] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">
                          {lang === 'en' ? evt.meetingPoint : (evt.koreanMeetingPoint || evt.meetingPoint)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#46574D] font-light leading-relaxed pt-1">
                      {lang === 'en' ? evt.description : (evt.koreanDescription || evt.description)}
                    </p>

                    {/* Target Species highlights */}
                    {evt.targetSpecies && evt.targetSpecies.length > 0 && (
                      <div className="pt-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#738578] mb-1 flex items-center gap-1">
                          <Feather className="w-3 h-3 text-[#3B5441]" />
                          <span>{lang === 'en' ? 'Target Birds' : '주요 관찰 조류'}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {evt.targetSpecies.map((species) => (
                            <span
                              key={species}
                              className="text-[11px] bg-[#F4F2EC] text-[#344637] px-2 py-0.5 rounded-md border border-[#E0DBCF]"
                            >
                              {species}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer & CTA */}
                  <div className="pt-6 mt-6 border-t border-subtle space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#697B70] font-mono">
                      <span>GEAR: {evt.gearNeeded.split(',')[0]}</span>
                      {evt.leader && (
                        <span className="text-[#385140] font-sans truncate max-w-[120px]">
                          {evt.leader.split('(')[0]}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleOpenSignUp(evt)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                        isRegistered
                          ? 'bg-emerald-800 text-white hover:bg-emerald-900 cursor-pointer shadow-xs'
                          : 'bg-[#1E3125] hover:bg-[#2A4433] text-white shadow-xs hover:shadow-md'
                      }`}
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                          <span>{lang === 'en' ? 'VIEW PASS / REGISTERED' : '신청 완료 (패스 보기)'}</span>
                        </>
                      ) : (
                        <>
                          <Ticket className="w-4 h-4 text-[#E6DECB]" />
                          <span>{lang === 'en' ? 'SIGN UP FOR WALK' : '산책 참가 신청'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dedicated Event Sign-Up Modal */}
      <EventSignUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedEvent={selectedEventForModal}
        allEvents={events}
        onSelectEvent={(evt) => setSelectedEventForModal(evt)}
        onConfirmRegistration={handleConfirmRegistration}
        onCancelRegistration={handleCancelRegistration}
        isAlreadyRegistered={
          selectedEventForModal
            ? registeredEventIds.has(selectedEventForModal.id)
            : false
        }
        existingRegistration={
          selectedEventForModal
            ? registrations.find((r) => r.eventId === selectedEventForModal.id) || null
            : null
        }
        lang={lang}
      />
    </section>
  );
};
