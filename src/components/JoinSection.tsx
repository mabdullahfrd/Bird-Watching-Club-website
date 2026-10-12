import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Send, MessageSquare, Compass, ShieldCheck, Download } from 'lucide-react';
import { ClubLogo } from './ClubLogo';

interface JoinSectionProps {
  lang: 'en' | 'kr';
}

export const JoinSection: React.FC<JoinSectionProps> = ({ lang }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isQuestionMode, setIsQuestionMode] = useState(false);
  const [questionSent, setQuestionSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    major: '',
    origin: 'International Student' as string,
    country: '',
    preferredLanguage: 'English',
    dietary: 'No restriction',
    experience: 'Complete beginner',
    reason: '',
  });

  const [questionText, setQuestionText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setQuestionSent(true);
    setTimeout(() => {
      setQuestionText('');
      setQuestionSent(false);
      setIsQuestionMode(false);
    }, 3000);
  };

  return (
    <section id="join" className="py-24 bg-[#242E1F] text-white overflow-hidden relative">
      {/* Subtle organic light gradient */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#526242]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#3B4B30]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Invitation */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E6DECB]">
                {lang === 'en' ? '14 / BECOME A MEMBER' : '14 / 동아리 가입'}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-light tracking-tight text-white leading-tight">
                {lang === 'en' ? 'Your next walk starts here.' : '당신의 다음 산책이 여기서 시작됩니다.'}
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#E6DECB]/90 font-light leading-relaxed">
              <p>
                {lang === 'en'
                  ? 'You don’t have to be a bird expert.'
                  : '새에 대한 전문가가 될 필요는 없습니다.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'You don’t need expensive equipment.'
                  : '비싼 장비나 무거운 망원렌즈도 필요 없습니다.'}
              </p>
              <p className="text-xl sm:text-2xl font-editorial italic text-[#E6DECB]">
                {lang === 'en'
                  ? 'You just need a little curiosity.'
                  : '그저 작은 호기심 하나면 충분합니다.'}
              </p>
            </div>

            <p className="text-sm text-[#D2C9B3] font-light leading-relaxed">
              {lang === 'en'
                ? 'Founded and run by international students at Woosong University. We coordinate English-friendly walks on campus and around Daejeon, share free club binoculars, and welcome students from all 70+ nations alongside local Korean friends.'
                : '우송대학교 외국인 유학생들이 직접 설립하고 이끌어가는 탐조 동아리입니다. 영어 중심의 편안한 산책, 공용 쌍안경 나눔, 그리고 70여 개국 유학생들과 한국인 학우들이 함께 어울릴 수 있는 다정한 쉼터를 만듭니다.'}
            </p>

            {/* Quick buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsQuestionMode(false)}
                className={`px-5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors ${
                  !isQuestionMode
                    ? 'bg-[#E6DECB] text-[#242E1F] font-semibold'
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                {lang === 'en' ? 'JOIN WING WATCHERS' : '회원 가입 신청'}
              </button>
              <button
                type="button"
                onClick={() => setIsQuestionMode(true)}
                className={`px-5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                  isQuestionMode
                    ? 'bg-[#E6DECB] text-[#242E1F] font-semibold'
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'ASK A QUESTION' : '질문 남기기'}</span>
              </button>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs font-mono text-[#B8AF98] space-y-1">
              <div>WOOSONG UNIVERSITY · STUDENT ACTIVITIES</div>
              <div>DAEJEON, SOUTH KOREA</div>
            </div>
          </div>

          {/* Right Column: Sign-up Form or Digital Passport */}
          <div className="lg:col-span-7">
            {isQuestionMode ? (
              /* Question Inquiry Form */
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md">
                <h3 className="text-2xl font-editorial font-light text-white mb-2">
                  {lang === 'en' ? 'Have a question about Wing Watchers?' : '동아리에 대해 궁금한 점이 있으신가요?'}
                </h3>
                <p className="text-xs sm:text-sm text-[#E6DECB]/80 font-light mb-6">
                  {lang === 'en'
                    ? 'Ask anything about walk schedules, gear sharing, or language comfort.'
                    : '산책 일정, 공용 장비 대여, 사용 언어 등 무엇이든 편하게 물어보세요.'}
                </p>

                {questionSent ? (
                  <div className="p-6 rounded-2xl bg-[#3E4D34] border border-[#E6DECB]/30 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-[#E6DECB] mx-auto" />
                    <h4 className="text-lg font-editorial text-white">
                      {lang === 'en' ? 'Question Received' : '문의가 접수되었습니다'}
                    </h4>
                    <p className="text-xs text-[#E6DECB] font-light">
                      {lang === 'en'
                        ? 'A club coordinator will reply to you soon!'
                        : '동아리 담당자가 곧 답변을 보내드리겠습니다!'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuestionSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Your Email or Kakao ID *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. student@woosong.org"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#E6DECB] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Your Question *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Write your question here..."
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#E6DECB] text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#E6DECB] hover:bg-white text-[#242E1F] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'SEND QUESTION' : '질문 보내기'}</span>
                    </button>
                  </form>
                )}
              </div>
            ) : formSubmitted ? (
              /* Digital Membership Passport Card with Official Emblem */
              <div className="bg-[#FAF8F3] text-[#242E1F] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#8C826C]/30 animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between pb-6 border-b border-[#8C826C]/20 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#526242] block">
                      OFFICIAL MEMBERSHIP PASSPORT · 2026
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#242E1F]">
                      Welcome to Wing Watchers
                    </h3>
                    <span className="text-[11px] font-mono text-[#586C4E] block mt-0.5">
                      Run by International Students · Woosong Global Nature Club
                    </span>
                  </div>
                  <div className="shrink-0">
                    <ClubLogo size={58} rounded="xl" />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[#7C7461] block">NAME</span>
                      <strong className="text-sm text-[#242E1F]">{formData.name}</strong>
                    </div>
                    <div>
                      <span className="text-[#7C7461] block">STUDENT ID</span>
                      <strong className="text-sm text-[#242E1F]">{formData.studentId || 'WW-2026-NEW'}</strong>
                    </div>
                    <div>
                      <span className="text-[#7C7461] block">MAJOR / DEPT</span>
                      <strong className="text-sm text-[#242E1F]">{formData.major || 'Woosong University'}</strong>
                    </div>
                    <div>
                      <span className="text-[#7C7461] block">STATUS & ORIGIN</span>
                      <strong className="text-sm text-[#242E1F]">
                        {formData.country ? `${formData.country} • ` : ''}{formData.origin}
                      </strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F2EFE6] border border-subtle text-xs text-[#44503B] leading-relaxed">
                    <p className="font-editorial text-sm italic mb-1 text-[#242E1F]">
                      “Your first walk with us will have binoculars ready for you.”
                    </p>
                    <p className="font-light">
                      We have sent a confirmation email to <strong>{formData.email}</strong>. Look out for our upcoming weekend walk announcement.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-subtle text-xs">
                  <div className="flex items-center gap-1.5 text-[#526242] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#526242]" />
                    <span>Registered for 2026 Season</span>
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-[#7C7461] hover:underline"
                  >
                    Edit Information
                  </button>
                </div>
              </div>
            ) : (
              /* The Sign-up Form */
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md">
                <div className="mb-6">
                  <h3 className="text-2xl font-editorial font-light text-white mb-1">
                    {lang === 'en' ? 'Student Registration Form' : '우송대 학생 참가 신청서'}
                  </h3>
                  <p className="text-xs text-[#E6DECB]/80 font-light">
                    {lang === 'en'
                      ? 'Takes less than two minutes. Open to all students, faculties, and exchange visitors.'
                      : '2분이면 작성할 수 있습니다. 우송대학교 재학생, 교직원, 유학생 모두 참여 가능합니다.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Minji Kim / Alex Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Student ID / 학번
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 20241234"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="student@woosong.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Major / Department
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SolBridge Business / Culinary"
                        value={formData.major}
                        onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Student Status
                      </label>
                      <select
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#2D3924] border border-white/15 text-white focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                      >
                        <option value="International Student">International Degree Student (외국인 유학생)</option>
                        <option value="Exchange / Visiting Student">Exchange / Visiting Student (교환학생)</option>
                        <option value="Korean Student">Korean Student (한국인 학생)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Nationality / Home Country
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Uzbekistan, France, Indonesia, Korea..."
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Preferred Language
                      </label>
                      <select
                        value={formData.preferredLanguage}
                        onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#2D3924] border border-white/15 text-white focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                      >
                        <option value="English">English (Primary Walk Language)</option>
                        <option value="Korean">한국어 (Korean)</option>
                        <option value="Both">Both (English & Korean)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                        Post-Walk Meal Preference
                      </label>
                      <select
                        value={formData.dietary}
                        onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#2D3924] border border-white/15 text-white focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                      >
                        <option value="No restriction">No restriction (일반)</option>
                        <option value="Halal Friendly">Halal Friendly (할랄)</option>
                        <option value="Vegetarian / Vegan">Vegetarian / Vegan (채식)</option>
                        <option value="Other">Other / Food Allergies</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                      Experience Level
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2D3924] border border-white/15 text-white focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                    >
                      <option value="Complete beginner">Complete beginner (Never held binoculars before)</option>
                      <option value="Some experience">Some experience (Enjoys outdoor walking)</option>
                      <option value="Photographer">Photographer (Interested in wildlife/landscape shots)</option>
                      <option value="Experienced birder">Experienced birder (Familiar with species)</option>
                      <option value="Just curious">Just curious (Looking for quiet nature and international friends)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#D2C9B3] mb-1">
                      Why would you like to join?
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for a peaceful outdoor break and to meet friends..."
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E6DECB] text-xs sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#F8F5EE] hover:bg-white text-[#242E1F] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-lg mt-2"
                  >
                    {lang === 'en' ? 'SUBMIT MEMBERSHIP REGISTRATION' : '동아리 참가 신청 완료하기'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
