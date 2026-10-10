import React, { useState } from 'react';
import { sampleFieldNotes, FieldNote } from '../data/clubData';
import { Plus, BookOpen, Sparkles, HelpCircle, Calendar, MapPin, X } from 'lucide-react';

interface BirdingJournalProps {
  lang: 'en' | 'kr';
}

export const BirdingJournal: React.FC<BirdingJournalProps> = ({ lang }) => {
  const [notes, setNotes] = useState<FieldNote[]>(sampleFieldNotes);
  const [selectedNote, setSelectedNote] = useState<FieldNote>(sampleFieldNotes[0]);
  const [isCreating, setIsCreating] = useState(false);

  // New Note form state
  const [formData, setFormData] = useState({
    species: '',
    koreanName: '',
    location: 'Woosong Campus Lawn',
    date: new Date().toISOString().split('T')[0],
    habitat: 'Deciduous trees & grass edge',
    weather: 'Sunny morning',
    confidence: 'Curious Beginner' as FieldNote['confidence'],
    observer: 'Student Observer',
    whatINoticed: '',
    whatImStillWondering: '',
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.species || !formData.whatINoticed) return;

    const newNote: FieldNote = {
      id: `fn-${Date.now()}`,
      species: formData.species,
      koreanName: formData.koreanName || '관찰 기록',
      date: formData.date,
      location: formData.location,
      habitat: formData.habitat,
      weather: formData.weather,
      confidence: formData.confidence,
      observer: formData.observer,
      whatINoticed: formData.whatINoticed,
      whatImStillWondering: formData.whatImStillWondering || 'How does its routine change through the seasons?',
      image: selectedNote.image, // fallback to current image
      tag: 'Member Observation',
      isExample: true,
    };

    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsCreating(false);
  };

  return (
    <section id="journal" className="py-24 bg-[#F8F5EE] border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#526242] block mb-3 font-semibold">
              {lang === 'en' ? '06 / THE FIELD NOTE ARCHIVE' : '06 / 필드 노트 아카이브'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#26331E] mb-4">
              {lang === 'en' ? 'The Wing Watchers Field Note.' : '윙워처스 공식 필드 노트.'}
            </h2>
            <p className="text-base sm:text-lg text-[#44503B] font-light leading-relaxed">
              {lang === 'en'
                ? 'Every observation in our club ends with curiosity. We do not stop at identification—we ask what we are still wondering.'
                : '우리의 관찰은 단순한 종 확인으로 끝나지 않습니다. 우리는 항상 "아직도 궁금한 점"을 적으며 자연에 대한 경외와 호기심을 이어갑니다.'}
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#526242] hover:bg-[#3E4C31] text-[#F8F5EE] text-xs font-medium tracking-wider uppercase transition-all shadow-sm self-start"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'en' ? 'WRITE A FIELD NOTE' : '필드 노트 작성하기'}</span>
          </button>
        </div>

        {/* Status disclosure per prompt instructions */}
        <div className="mb-8 p-3.5 rounded-xl bg-[#E6DECB]/40 border border-[#A89F88]/30 text-xs text-[#3E4C31] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#526242] shrink-0" />
            <span>
              {lang === 'en'
                ? 'Educational Archive: Entries and photography are representative field templates designed for student learning and observation training.'
                : '교육용 아카이브: 본 일지와 사진은 학생들의 관찰 훈련을 돕기 위해 구성된 대표적 교육용 템플릿입니다.'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#7C7461] hidden sm:inline">
            Status: Example / Educational Entry
          </span>
        </div>

        {/* Main Note Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Note List / Tab Selector */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase text-[#7C7461] tracking-wider block mb-2">
              {lang === 'en' ? 'Select an Observation:' : '관찰 일지 선택:'}
            </span>

            {notes.map((note) => {
              const isSelected = selectedNote.id === note.id;
              return (
                <button
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white border-[#526242] shadow-sm'
                      : 'bg-[#F2EFE6] hover:bg-white border-transparent text-[#26331E]'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="text-base font-medium text-[#26331E]">
                      {note.species}
                    </h4>
                    <span className="text-[11px] font-mono text-[#7C7461]">
                      {note.date}
                    </span>
                  </div>
                  <p className="text-xs text-[#54624A] truncate font-light mb-2">
                    {note.location}
                  </p>
                  <div className="text-[11px] text-[#7C7461] flex items-center gap-2">
                    <span>{note.koreanName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{note.confidence}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Editorial Field Sheet */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 border border-subtle shadow-sm space-y-8">
            {/* Header of Note */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-subtle">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#586E5F] uppercase mb-1">
                  <span>{selectedNote.koreanName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedNote.tag}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-editorial font-medium text-[#152219]">
                  {selectedNote.species}
                </h3>
              </div>

              {/* Verified educational stamp */}
              <div className="text-right sm:text-right text-xs font-mono text-[#6B7D72] space-y-0.5">
                <div>OBSERVER: {selectedNote.observer}</div>
                <div>CONFIDENCE: {selectedNote.confidence}</div>
              </div>
            </div>

            {/* Note Meta Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#F8F7F3] border border-subtle text-xs">
              <div className="flex items-center gap-2 text-[#43554A]">
                <Calendar className="w-3.5 h-3.5 text-[#5B7163]" />
                <span>
                  <strong className="font-medium text-[#18231C]">WHEN: </strong>
                  {selectedNote.date}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#43554A]">
                <MapPin className="w-3.5 h-3.5 text-[#5B7163]" />
                <span className="truncate">
                  <strong className="font-medium text-[#18231C]">WHERE: </strong>
                  {selectedNote.location}
                </span>
              </div>
              <div className="text-[#43554A]">
                <strong className="font-medium text-[#18231C]">HABITAT: </strong>
                <span>{selectedNote.habitat}</span>
              </div>
            </div>

            {/* WHAT I NOTICED */}
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-[#546A5C] block">
                {lang === 'en' ? 'WHAT I NOTICED' : '내가 관찰한 것'}
              </span>
              <p className="text-base sm:text-lg text-[#2A372F] font-light leading-relaxed pl-4 border-l-2 border-[#1E3125]/20">
                {selectedNote.whatINoticed}
              </p>
            </div>

            {/* THE SIGNATURE FIELD: WHAT I'M STILL WONDERING */}
            <div className="p-6 rounded-2xl bg-[#EBECE7]/70 border border-subtle space-y-2">
              <div className="flex items-center gap-2 text-[#243A2B]">
                <HelpCircle className="w-4 h-4 text-[#395340]" />
                <span className="text-xs font-mono tracking-widest uppercase font-semibold">
                  {lang === 'en' ? "WHAT I'M STILL WONDERING" : '아직도 궁금한 점 (Curiosity Prompt)'}
                </span>
              </div>
              <p className="text-lg sm:text-xl font-editorial italic text-[#16241B] leading-relaxed">
                “{selectedNote.whatImStillWondering}”
              </p>
              <span className="text-xs text-[#6A7B70] block font-light">
                {lang === 'en'
                  ? 'This question will be brought to the next club tea discussion or checked with regional birding guides.'
                  : '이 질문은 다음 탐조 후 티타임에서 다른 회원들과 함께 나누거나 전문가 자료를 찾아보게 됩니다.'}
              </span>
            </div>

            {/* Educational status footer */}
            <div className="pt-4 border-t border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#7B8B80]">
              <span>Woosong University Birdwatching Journal System</span>
              <span className="font-mono">Example / Educational Entry</span>
            </div>
          </div>
        </div>

        {/* Modal: Add New Field Observation */}
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-subtle">
              <div className="flex items-center justify-between pb-4 border-b border-subtle mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#586E5F]">
                    {lang === 'en' ? 'NEW FIELD OBSERVATION' : '새로운 관찰 기록'}
                  </span>
                  <h3 className="text-2xl font-editorial font-medium text-[#152219]">
                    {lang === 'en' ? 'Record Your Note' : '나만의 필드 노트 작성'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCreating(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#47584E] mb-1">
                    What did you see? (Species or descriptive nickname) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tree Sparrow or Small Yellow Songbird"
                    value={formData.species}
                    onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-subtle focus:outline-none focus:ring-1 focus:ring-[#1E3125]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#47584E] mb-1">
                      Korean Name / 한국어 명칭
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 참새"
                      value={formData.koreanName}
                      onChange={(e) => setFormData({ ...formData, koreanName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-subtle focus:outline-none focus:ring-1 focus:ring-[#1E3125]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#47584E] mb-1">
                      Where did you see it?
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-subtle focus:outline-none focus:ring-1 focus:ring-[#1E3125]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#47584E] mb-1">
                    What did you notice? (Movement, plumage, posture) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe what caught your attention..."
                    value={formData.whatINoticed}
                    onChange={(e) => setFormData({ ...formData, whatINoticed: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-subtle focus:outline-none focus:ring-1 focus:ring-[#1E3125]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#47584E] mb-1">
                    What are you still wondering? (Your curiosity question) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. Why did it tilt its head before flying to the pine tree?"
                    value={formData.whatImStillWondering}
                    onChange={(e) => setFormData({ ...formData, whatImStillWondering: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-subtle focus:outline-none focus:ring-1 focus:ring-[#1E3125]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#1E3125] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#2B4433] transition-colors"
                  >
                    Save Field Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
