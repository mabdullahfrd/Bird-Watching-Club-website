import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  Download,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { ClubEvent } from '../data/clubData';
import { ClubLogo } from './ClubLogo';

export interface EventRegistration {
  registrationId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventMeetingPoint: string;
  fullName: string;
  studentId: string;
  email: string;
  phoneOrKakao: string;
  nationality?: string;
  preferredLanguage?: string;
  dietaryNeed?: string;
  department: string;
  experience: string;
  gearChoice: string;
  guestName?: string;
  specialNotes?: string;
  registeredAt: string;
}

interface EventSignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent: ClubEvent | null;
  allEvents: ClubEvent[];
  onSelectEvent: (evt: ClubEvent) => void;
  onConfirmRegistration: (reg: EventRegistration) => void;
  onCancelRegistration?: (eventId: string) => void;
  isAlreadyRegistered?: boolean;
  existingRegistration?: EventRegistration | null;
  lang: 'en' | 'kr';
}

const DEPARTMENTS = [
  'SolBridge International School of Business',
  'Endicott College of International Studies',
  'JW Kim College of Future Convergence',
  'College of Health & Welfare Sciences',
  'College of Railroad Transportation',
  'College of Culinary Arts & Food Service',
  'College of Software & AI Convergence',
  'General Woosong Undergraduate',
  'International Exchange / Visiting Student',
];

export const EventSignUpModal: React.FC<EventSignUpModalProps> = ({
  isOpen,
  onClose,
  selectedEvent,
  allEvents,
  onSelectEvent,
  onConfirmRegistration,
  onCancelRegistration,
  isAlreadyRegistered = false,
  existingRegistration = null,
  lang,
}) => {
  const [activeStep, setActiveStep] = useState<'form' | 'ticket'>('form');
  const [copied, setCopied] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [phoneOrKakao, setPhoneOrKakao] = useState('');
  const [nationality, setNationality] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [dietaryNeed, setDietaryNeed] = useState('No dietary restriction');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [experience, setExperience] = useState('First-time beginner');
  const [gearChoice, setGearChoice] = useState('borrow_binoculars');
  const [hasGuest, setHasGuest] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [agreeEthics, setAgreeEthics] = useState(true);
  const [formError, setFormError] = useState('');

  // Active completed registration
  const [confirmedTicket, setConfirmedTicket] = useState<EventRegistration | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (isAlreadyRegistered && existingRegistration) {
        setConfirmedTicket(existingRegistration);
        setActiveStep('ticket');
      } else {
        setActiveStep('form');
        setConfirmedTicket(null);
        setFormError('');
      }
    }
  }, [isOpen, isAlreadyRegistered, existingRegistration, selectedEvent]);

  if (!isOpen || !selectedEvent) return null;

  const spotsRemaining = Math.max(0, selectedEvent.spotsTotal - selectedEvent.spotsFilled);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError(lang === 'en' ? 'Please enter your full name.' : '성함을 입력해주세요.');
      return;
    }
    if (!studentId.trim()) {
      setFormError(lang === 'en' ? 'Please enter your student ID.' : '학번을 입력해주세요.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError(lang === 'en' ? 'Please provide a valid email address.' : '올바른 이메일 주소를 입력해주세요.');
      return;
    }
    if (!phoneOrKakao.trim()) {
      setFormError(
        lang === 'en'
          ? 'Please provide your mobile number or KakaoTalk ID for day-of coordination.'
          : '산책 당일 연락을 위한 전화번호 또는 카카오톡 ID를 입력해주세요.'
      );
      return;
    }
    if (!agreeEthics) {
      setFormError(
        lang === 'en'
          ? 'Please accept the Leave-No-Trace and wildlife care agreement.'
          : '야생 생물 배려 및 LNT 수칙 준수에 동의해주세요.'
      );
      return;
    }

    const regId = `WW-${selectedEvent.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRegistration: EventRegistration = {
      registrationId: regId,
      eventId: selectedEvent.id,
      eventTitle: lang === 'en' ? selectedEvent.title : selectedEvent.koreanTitle,
      eventDate: selectedEvent.date,
      eventTime: selectedEvent.time,
      eventMeetingPoint: lang === 'en' ? selectedEvent.meetingPoint : (selectedEvent.koreanMeetingPoint || selectedEvent.meetingPoint),
      fullName: fullName.trim(),
      studentId: studentId.trim(),
      email: email.trim(),
      phoneOrKakao: phoneOrKakao.trim(),
      nationality: nationality.trim() || undefined,
      preferredLanguage,
      dietaryNeed,
      department,
      experience,
      gearChoice,
      guestName: hasGuest ? guestName.trim() : undefined,
      specialNotes: specialNotes.trim() || undefined,
      registeredAt: new Date().toLocaleDateString(),
    };

    setConfirmedTicket(newRegistration);
    onConfirmRegistration(newRegistration);
    setActiveStep('ticket');
  };

  const handleDownloadICS = () => {
    if (!selectedEvent) return;

    // Create simple .ics file content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wing Watchers//Woosong Birding Club//EN',
      'BEGIN:VEVENT',
      `UID:${confirmedTicket?.registrationId || 'WW-EVT'}@wingwatchers.woosong`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:Wing Watchers Walk: ${selectedEvent.title}`,
      `DESCRIPTION:${selectedEvent.description}\\nMeeting Point: ${selectedEvent.meetingPoint}\\nGear: ${selectedEvent.gearNeeded}`,
      `LOCATION:${selectedEvent.meetingPoint}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `WingWatchers_${selectedEvent.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyDetails = () => {
    if (!selectedEvent) return;
    const text = `[Wing Watchers Outing Pass]
Event: ${lang === 'en' ? selectedEvent.title : selectedEvent.koreanTitle}
Date & Time: ${selectedEvent.date} @ ${selectedEvent.time}
Meeting Spot: ${lang === 'en' ? selectedEvent.meetingPoint : (selectedEvent.koreanMeetingPoint || selectedEvent.meetingPoint)}
Attendee: ${confirmedTicket?.fullName || fullName} (${confirmedTicket?.studentId || studentId})
Pass Ref: ${confirmedTicket?.registrationId || 'Confirmed'}
Gear note: ${gearChoice === 'borrow_binoculars' ? 'Club Binoculars Reserved' : 'Personal optics / phone'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF8F3] text-[#242E1F] rounded-3xl shadow-2xl border border-[#8C826C]/25 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="px-6 py-5 bg-[#242E1F] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <ClubLogo size={34} variant="inverted" rounded="full" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E6DECB]/80">
                {lang === 'en' ? 'Official Outing Registration' : '공식 탐조 산책 신청서'}
              </div>
              <h2 className="text-base sm:text-lg font-editorial font-medium text-white tracking-wide">
                {activeStep === 'ticket'
                  ? (lang === 'en' ? 'Your Confirmed Outing Pass' : '확정된 참가 패스')
                  : (lang === 'en' ? 'Sign Up for Outing' : '산책 일정 참가 신청')}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* Event Quick Card / Event Selector */}
          <div className="p-5 rounded-2xl bg-white border border-[#E0DBCF] shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBE7DF] pb-3">
              <span className="text-[11px] font-mono text-[#586C5D] uppercase tracking-wider">
                {lang === 'en' ? 'Selected Outing' : '선택된 산책 일정'}
              </span>

              {/* Event switcher dropdown */}
              {activeStep === 'form' && allEvents.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#7A8A7E]">
                    {lang === 'en' ? 'Switch:' : '일정 변경:'}
                  </span>
                  <select
                    value={selectedEvent.id}
                    onChange={(e) => {
                      const found = allEvents.find((evt) => evt.id === e.target.value);
                      if (found) onSelectEvent(found);
                    }}
                    className="text-xs font-medium bg-[#F4F2EC] border border-[#D5CFBF] rounded-lg px-2.5 py-1 text-[#242E1F] focus:outline-none focus:ring-1 focus:ring-[#3B4D35]"
                  >
                    {allEvents.map((evt) => (
                      <option key={evt.id} value={evt.id}>
                        {evt.date} - {lang === 'en' ? evt.title : evt.koreanTitle}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-editorial font-medium text-[#1E2B1A] leading-snug">
                {lang === 'en' ? selectedEvent.title : selectedEvent.koreanTitle}
              </h3>
              <p className="text-xs text-[#526356] font-light">
                {lang === 'en' ? selectedEvent.description : (selectedEvent.koreanDescription || selectedEvent.description)}
              </p>
            </div>

            {/* Event Key Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-[#3E4E3B] font-light">
              <div className="flex items-center gap-2 bg-[#F6F5F0] px-3 py-2 rounded-xl">
                <Calendar className="w-4 h-4 text-[#3A5341] shrink-0" />
                <span className="font-medium">{selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F6F5F0] px-3 py-2 rounded-xl">
                <Clock className="w-4 h-4 text-[#3A5341] shrink-0" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F6F5F0] px-3 py-2 rounded-xl">
                <Users className="w-4 h-4 text-[#3A5341] shrink-0" />
                <span>
                  {spotsRemaining > 0
                    ? `${spotsRemaining} ${lang === 'en' ? 'spots left' : '자리 남음'}`
                    : (lang === 'en' ? 'Full (Waitlist)' : '마감 (대기 접수)')}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-[#F6F5F0] px-3 py-2.5 rounded-xl text-xs text-[#3E4E3B]">
              <MapPin className="w-4 h-4 text-[#3A5341] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-[#242E1F]">
                  {lang === 'en' ? 'Meeting Location: ' : '집합 장소: '}
                </span>
                <span>
                  {lang === 'en'
                    ? selectedEvent.meetingPoint
                    : (selectedEvent.koreanMeetingPoint || selectedEvent.meetingPoint)}
                </span>
              </div>
            </div>

            {selectedEvent.leader && (
              <div className="text-[11px] font-mono text-[#5A6D5D] flex items-center gap-1.5 pt-1">
                <UserCheck className="w-3.5 h-3.5 text-[#385140]" />
                <span>{lang === 'en' ? 'Guided by: ' : '안내 진행: '}{selectedEvent.leader}</span>
              </div>
            )}
          </div>

          {/* STEP 1: REGISTRATION FORM */}
          {activeStep === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* International student welcome note */}
              <div className="p-3.5 rounded-xl bg-[#EAF1E7] border border-[#B5CAB8] text-xs text-[#223B26] flex items-start gap-2.5">
                <span className="text-base mt-0.5">🌍</span>
                <div>
                  <span className="font-semibold block">
                    {lang === 'en' ? 'International Student-Led Outing' : '외국인 유학생 주도 탐조 산책'}
                  </span>
                  <span className="font-light text-[11px] text-[#3F5B43]">
                    {lang === 'en'
                      ? 'All walks are guided in English with friendly bilingual Korean assistance. Open to all nationalities, exchange students, and local Korean friends!'
                      : '모든 산책은 영어로 편안하게 진행되며 한국어 소통 지원이 함께합니다. 전 세계 유학생, 교환학생, 한국인 학우 모두 환영합니다!'}
                  </span>
                </div>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#384633]">
                    {lang === 'en' ? 'Full Name' : '성명 (이름)'} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Malik Aziz / Elena Rostova / Min-ji Park' : '예: Malik Aziz / 김민지'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5CFBF] text-sm text-[#1A2515] placeholder-[#9CA59E] focus:outline-none focus:ring-2 focus:ring-[#384E37]"
                  />
                </div>

                {/* Student ID */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#384633]">
                    {lang === 'en' ? 'Student ID Number' : '학번'} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. W20241088 / S23004"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5CFBF] text-sm text-[#1A2515] placeholder-[#9CA59E] focus:outline-none focus:ring-2 focus:ring-[#384E37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nationality / Home Country */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#384633]">
                    {lang === 'en' ? 'Nationality / Home Country' : '국적 / 출신 국가'}
                  </label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Uzbekistan, France, Indonesia, Korea...' : '예: 우즈베키스탄, 프랑스, 한국 등'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5CFBF] text-sm text-[#1A2515] placeholder-[#9CA59E] focus:outline-none focus:ring-2 focus:ring-[#384E37]"
                  />
                </div>

                {/* Preferred Language */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#384633]">
                    {lang === 'en' ? 'Preferred Communication Language' : '선호 소통 언어'}
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5CFBF] text-sm text-[#1A2515] focus:outline-none focus:ring-2 focus:ring-[#384E37]"
                  >
                    <option value="English">English (Primary Walk Language)</option>
                    <option value="Korean">한국어 (Korean)</option>
                    <option value="Both / Either">Both / Either (English & Korean)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* University Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#384633]">
                    {lang === 'en' ? 'University / Personal Email' : '이메일 주소'} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@woosong.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5CFBF] text-sm text-[#1A2515] placeholder-[#9CA59E] focus:outline-none focus:ring-2 focus:ring-[#384E37]"
                  />
                </div>

                {/* Mobile / Kakao */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#384633]">
                    {lang === 'en' ? 'Mobile Phone or KakaoTalk ID' : '연락처 또는 카카오톡 ID'} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={phoneOrKakao}
                    onChange={(e) => setPhoneOrKakao(e.target.value)}
                    placeholder="010-XXXX-XXXX / Kakao ID"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5CFBF] text-sm text-[#1A2515] placeholder-[#9CA59E] focus:outline-none focus:ring-2 focus:ring-[#384E37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Department / College */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#384633]">
                    {lang === 'en' ? 'Affiliation / College' : '소속 대학 / 학부'}
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5CFBF] text-sm text-[#1A2515] focus:outline-none focus:ring-2 focus:ring-[#384E37]"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dietary preference for after-walk tea/meal */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#384633]">
                    {lang === 'en' ? 'Post-Walk Social Meal Preference' : '산책 후 다과/식사 식단 배려'}
                  </label>
                  <select
                    value={dietaryNeed}
                    onChange={(e) => setDietaryNeed(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5CFBF] text-sm text-[#1A2515] focus:outline-none focus:ring-2 focus:ring-[#384E37]"
                  >
                    <option value="No dietary restriction">No dietary restriction (일반)</option>
                    <option value="Halal friendly">Halal Friendly (할랄)</option>
                    <option value="Vegetarian / Vegan">Vegetarian / Vegan (채식)</option>
                    <option value="Gluten-Free / Allergies">Gluten-Free / Food Allergies</option>
                  </select>
                </div>
              </div>

              {/* Gear and Optical Loan Preference */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-medium text-[#384633]">
                  {lang === 'en' ? 'Optics & Gear Requirement' : '장비 및 쌍안경 대여 여부'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      gearChoice === 'borrow_binoculars'
                        ? 'bg-[#EBF2EB] border-[#385140] text-[#1E3125] font-medium shadow-sm'
                        : 'bg-white border-[#DCD6C8] text-[#4F6052]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gearChoice"
                      value="borrow_binoculars"
                      checked={gearChoice === 'borrow_binoculars'}
                      onChange={() => setGearChoice('borrow_binoculars')}
                      className="mt-0.5 text-[#2A4433] focus:ring-[#2A4433]"
                    />
                    <div className="text-xs">
                      <span className="block font-medium">
                        {lang === 'en' ? 'Borrow Binoculars' : '동아리 쌍안경 대여'}
                      </span>
                      <span className="text-[11px] text-[#697B6D] font-light">
                        {lang === 'en' ? 'Free club loan for the walk' : '산책 중 무료로 빌려드립니다'}
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      gearChoice === 'bring_own'
                        ? 'bg-[#EBF2EB] border-[#385140] text-[#1E3125] font-medium shadow-sm'
                        : 'bg-white border-[#DCD6C8] text-[#4F6052]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gearChoice"
                      value="bring_own"
                      checked={gearChoice === 'bring_own'}
                      onChange={() => setGearChoice('bring_own')}
                      className="mt-0.5 text-[#2A4433] focus:ring-[#2A4433]"
                    />
                    <div className="text-xs">
                      <span className="block font-medium">
                        {lang === 'en' ? 'Bringing Own Gear' : '개인 장비 지참'}
                      </span>
                      <span className="text-[11px] text-[#697B6D] font-light">
                        {lang === 'en' ? 'Personal binoculars or telephoto' : '개인 쌍안경 또는 카메라 지참'}
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      gearChoice === 'eyes_and_phone'
                        ? 'bg-[#EBF2EB] border-[#385140] text-[#1E3125] font-medium shadow-sm'
                        : 'bg-white border-[#DCD6C8] text-[#4F6052]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gearChoice"
                      value="eyes_and_phone"
                      checked={gearChoice === 'eyes_and_phone'}
                      onChange={() => setGearChoice('eyes_and_phone')}
                      className="mt-0.5 text-[#2A4433] focus:ring-[#2A4433]"
                    />
                    <div className="text-xs">
                      <span className="block font-medium">
                        {lang === 'en' ? 'Eyes & Smartphone' : '눈과 스마트폰'}
                      </span>
                      <span className="text-[11px] text-[#697B6D] font-light">
                        {lang === 'en' ? 'Lightweight, hands-free stroll' : '가볍게 맨손으로 걷기'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Guest / Plus-One Option */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#384633]">
                  <input
                    type="checkbox"
                    checked={hasGuest}
                    onChange={(e) => setHasGuest(e.target.checked)}
                    className="rounded text-[#2A4433] focus:ring-[#2A4433]"
                  />
                  <span>
                    {lang === 'en'
                      ? 'I am bringing a roommate or friend (+1 guest)'
                      : '친구 또는 룸메이트와 함께 참여합니다 (+1 동반인)'}
                  </span>
                </label>

                {hasGuest && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={lang === 'en' ? "Friend's Full Name & Major" : '동반인 성명 및 학과'}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D5CFBF] text-xs text-[#1A2515] placeholder-[#9CA59E] focus:outline-none focus:ring-2 focus:ring-[#384E37]"
                    />
                  </div>
                )}
              </div>

              {/* Ethical Promise Checkbox */}
              <div className="p-3.5 rounded-xl bg-[#F3F1EA] border border-[#DDD7CA] text-xs space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeEthics}
                    onChange={(e) => setAgreeEthics(e.target.checked)}
                    className="mt-0.5 rounded text-[#2A4433] focus:ring-[#2A4433]"
                  />
                  <div className="text-[#364734] leading-relaxed">
                    <span className="font-semibold block text-[#1F2F1C]">
                      {lang === 'en' ? 'Leave-No-Trace & Ethical Care Commitment' : '자연 존중 및 LNT 수칙 동의'}
                    </span>
                    <span>
                      {lang === 'en'
                        ? 'I agree to keep distance from wildlife, keep walking volume respectful, stay on established paths, and not leave any litter.'
                        : '야생 조류에게 적정 거리를 유지하고, 소음을 낮추며, 산책로를 지키고 쓰레기를 남기지 않는 윤리적 탐조 수칙을 준수하겠습니다.'}
                    </span>
                  </div>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#57695A] hover:bg-black/5 transition-colors"
                >
                  {lang === 'en' ? 'Cancel' : '취소'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1E3125] hover:bg-[#2A4433] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>{lang === 'en' ? 'Confirm Outing Sign-Up' : '산책 신청 완료하기'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: CONFIRMED TICKET / PASS */}
          {activeStep === 'ticket' && confirmedTicket && (
            <div className="space-y-6">
              {/* Success Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider font-semibold text-emerald-800">
                    {lang === 'en' ? 'RSVP Confirmed!' : '산책 참가 신청이 확정되었습니다!'}
                  </div>
                  <div className="text-xs text-emerald-700 font-light">
                    {lang === 'en'
                      ? 'Your spot is reserved. We look forward to walking together in Daejeon nature.'
                      : '인원 예약이 완료되었습니다. 대전의 맑은 자연 속에서 즐거운 산책 기대해주세요.'}
                  </div>
                </div>
              </div>

              {/* The Official Outing Pass Card */}
              <div className="relative bg-white rounded-2xl border-2 border-[#1E3125]/20 shadow-xl overflow-hidden p-6 sm:p-7 space-y-6">
                {/* Decorative cutouts for ticket look */}
                <div className="hidden sm:block absolute -left-3 top-1/2 -mt-3 w-6 h-6 rounded-full bg-[#FAF8F3] border border-[#1E3125]/20" />
                <div className="hidden sm:block absolute -right-3 top-1/2 -mt-3 w-6 h-6 rounded-full bg-[#FAF8F3] border border-[#1E3125]/20" />

                <div className="flex items-center justify-between border-b border-[#E9E5DB] pb-4">
                  <div className="flex items-center gap-3">
                    <ClubLogo size={36} rounded="full" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#637768]">
                        WING WATCHERS CLUB PASS
                      </div>
                      <div className="text-xs font-semibold text-[#182618]">
                        Woosong Nature Outing Pass
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#7A8C7F] block">PASS CODE</span>
                    <span className="font-mono text-xs font-bold text-[#1E3125] bg-[#F2F0E8] px-2 py-0.5 rounded border border-[#E0DBD0]">
                      {confirmedTicket.registrationId}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-2xl font-editorial font-medium text-[#142314]">
                    {confirmedTicket.eventTitle}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#6A7C6E] uppercase">ATTENDEE</span>
                      <p className="font-semibold text-[#1A2619]">
                        {confirmedTicket.fullName} ({confirmedTicket.studentId})
                      </p>
                      <p className="text-[11px] text-[#55695A] font-light">
                        {confirmedTicket.department}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#6A7C6E] uppercase">DATE & TIME</span>
                      <p className="font-semibold text-[#1A2619]">
                        {confirmedTicket.eventDate}
                      </p>
                      <p className="text-[11px] text-[#55695A] font-light">
                        {confirmedTicket.eventTime}
                      </p>
                    </div>

                    {confirmedTicket.nationality && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#6A7C6E] uppercase">ORIGIN & LANGUAGE</span>
                        <p className="font-semibold text-[#1A2619]">
                          {confirmedTicket.nationality} • {confirmedTicket.preferredLanguage || 'English'}
                        </p>
                        <p className="text-[11px] text-[#55695A] font-light">
                          Meal: {confirmedTicket.dietaryNeed || 'No restriction'}
                        </p>
                      </div>
                    )}

                    <div className="space-y-1 sm:col-span-2">
                      <span className="text-[10px] font-mono text-[#6A7C6E] uppercase">MEETING POINT</span>
                      <p className="font-medium text-[#1A2619]">
                        {confirmedTicket.eventMeetingPoint}
                      </p>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <span className="text-[10px] font-mono text-[#6A7C6E] uppercase">OPTICS STATUS</span>
                      <p className="text-[12px] text-[#2C412E] font-medium">
                        {confirmedTicket.gearChoice === 'borrow_binoculars'
                          ? (lang === 'en' ? '✓ Free Club Binoculars Reserved' : '✓ 동아리 쌍안경 대여 예약 완료')
                          : (confirmedTicket.gearChoice === 'bring_own'
                              ? (lang === 'en' ? 'Personal Optics / Camera' : '개인 장비 지참')
                              : (lang === 'en' ? 'Eyes & Smartphone Stroll' : '맨손 & 스마트폰 관찰'))}
                      </p>
                    </div>

                    {confirmedTicket.guestName && (
                      <div className="space-y-1 sm:col-span-2 bg-[#F6F4ED] p-2.5 rounded-xl">
                        <span className="text-[10px] font-mono text-[#6A7C6E] uppercase">+1 GUEST</span>
                        <p className="text-xs font-medium text-[#1D2B1C]">
                          {confirmedTicket.guestName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-dashed border-[#DDD7CA] pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#5F7363]">
                    <ShieldCheck className="w-4 h-4 text-[#35523B]" />
                    <span className="text-[11px] font-light">
                      {lang === 'en' ? 'Show this screen to the walk coordinator' : '모임 장소에서 진행자에게 본 화면을 제시하세요'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#7D8F82]">
                    Registered on {confirmedTicket.registeredAt}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Calendar, Copy, Cancel, Close */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadICS}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#D5CFBF] hover:bg-[#F3EFE6] text-xs font-medium text-[#243522] flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-[#385140]" />
                    <span>{lang === 'en' ? 'Add to Calendar (.ics)' : '캘린더 일정 저장 (.ics)'}</span>
                  </button>

                  <button
                    onClick={handleCopyDetails}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#D5CFBF] hover:bg-[#F3EFE6] text-xs font-medium text-[#243522] flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">{lang === 'en' ? 'Copied!' : '복사됨!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#385140]" />
                        <span>{lang === 'en' ? 'Copy Pass Info' : '패스 복사'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {onCancelRegistration && (
                    <button
                      onClick={() => {
                        if (window.confirm(lang === 'en' ? 'Cancel this registration?' : '이 산책 예약을 취소하시겠습니까?')) {
                          onCancelRegistration(selectedEvent.id);
                          onClose();
                        }
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-red-700 hover:bg-red-50 transition-colors"
                    >
                      {lang === 'en' ? 'Cancel RSVP' : '예약 취소'}
                    </button>
                  )}

                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl bg-[#1E3125] hover:bg-[#2A4433] text-white text-xs font-medium uppercase tracking-wider transition-colors"
                  >
                    {lang === 'en' ? 'Done' : '완료'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
