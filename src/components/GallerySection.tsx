import React, { useState } from 'react';
import { clubImages } from '../data/clubData';
import { Maximize2, X, Camera } from 'lucide-react';

interface GallerySectionProps {
  lang: 'en' | 'kr';
}

interface GalleryItem {
  id: string;
  titleEn: string;
  titleKr: string;
  locationEn: string;
  locationKr: string;
  seasonEn: string;
  seasonKr: string;
  contributorEn: string;
  contributorKr: string;
  category: 'birds' | 'campus' | 'nature' | 'outings';
  image: string;
  noteEn: string;
  noteKr: string;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'birds' | 'campus' | 'nature' | 'outings'>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      titleEn: 'Oriental Turtle Dove in Morning Mist',
      titleKr: '아침 안개 속 멧비둘기',
      locationEn: 'Daejeon Pine Woodland',
      locationKr: '대전 소나무 숲길',
      seasonEn: 'Autumn Morning',
      seasonKr: '가을 아침',
      contributorEn: 'Wing Watchers Archive (Representative Visual)',
      contributorKr: '윙워처스 아카이브 (대표 시각 자료)',
      category: 'birds',
      image: clubImages.heroBird,
      noteEn: 'Dew settling on pine needles as soft morning sunlight filters through.',
      noteKr: '소나무 잎에 맺힌 아침 이슬과 부드러운 가을 햇살.',
    },
    {
      id: 'g-2',
      titleEn: 'Campus Trail & Weeping Willows',
      titleKr: '캠퍼스 산책로와 능수버들',
      locationEn: 'Near Woosong East Campus',
      locationKr: '우송대 동캠퍼스 인근 수변길',
      seasonEn: 'Late Summer Dawn',
      seasonKr: '늦여름 새벽',
      contributorEn: 'Campus Walk Team (Representative Visual)',
      contributorKr: '캠퍼스 산책팀 (대표 시각 자료)',
      category: 'campus',
      image: clubImages.campusTrail,
      noteEn: 'Quiet water reflections before the first student shuttle departs.',
      noteKr: '첫 셔틀버스가 출발하기 전, 고요한 물가의 아침 반영.',
    },
    {
      id: 'g-3',
      titleEn: 'Grey Heron in River Reeds',
      titleKr: '갈대밭의 왜가리',
      locationEn: 'Gapcheon River, Daejeon',
      locationKr: '대전 갑천 갈대밭',
      seasonEn: 'Golden Hour Dusk',
      seasonKr: '해질녘 골든 아워',
      contributorEn: 'Riverside Observation (Representative Visual)',
      contributorKr: '수변 탐조팀 (대표 시각 자료)',
      category: 'nature',
      image: clubImages.riverHeron,
      noteEn: 'Patient stillness as ripples settle along the shallow gravel bank.',
      noteKr: '자갈 여울에서 물고기를 기다리며 미동도 없이 서 있는 왜가리.',
    },
    {
      id: 'g-4',
      titleEn: 'Oriental Magpie on Ancient Stone',
      titleKr: '고목 가지 위의 까치',
      locationEn: 'Woosong Campus Lawn',
      locationKr: '우송대 잔디광장',
      seasonEn: 'Clear Autumn',
      seasonKr: '청명한 가을',
      contributorEn: 'Student Field Journal (Representative Visual)',
      contributorKr: '학생 필드 일지 (대표 시각 자료)',
      category: 'birds',
      image: clubImages.magpie,
      noteEn: 'Iridescent petrol blues catching mid-day light.',
      noteKr: '한낮 햇살 아래 반짝이는 푸른 날개 깃의 오묘한 광택.',
    },
    {
      id: 'g-5',
      titleEn: 'Students on the Mountain Footpath',
      titleKr: '숲길을 함께 걷는 학생들',
      locationEn: 'Sikjangsan Trail, Daejeon',
      locationKr: '대전 식장산 숲길',
      seasonEn: 'Weekend Morning Outing',
      seasonKr: '주말 아침 탐조 산책',
      contributorEn: 'Wing Watchers Cohort (Representative Visual)',
      contributorKr: '윙워처스 회원 일동 (대표 시각 자료)',
      category: 'outings',
      image: clubImages.studentWalk,
      noteEn: 'Walking quietly, sharing binoculars, and pausing to listen.',
      noteKr: '조용히 발걸음을 맞추고, 쌍안경을 건네며 자연에 귀 기울이는 순간.',
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-24 bg-[#FBFBFA] border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#55695C] block mb-3">
              {lang === 'en' ? '09 / VISUAL ARCHIVE' : '09 / 사진 갤러리'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#152219] mb-4">
              {lang === 'en' ? 'Through our lenses.' : '우리의 시선이 머문 자리.'}
            </h2>
            <p className="text-base sm:text-lg text-[#516458] font-light leading-relaxed">
              {lang === 'en'
                ? 'Moments captured across campus walkways, riverbanks, and Daejeon forest paths. Photography is our way of remembering to look closer.'
                : '캠퍼스 산책로, 강변 갈대밭, 식장산 숲길에서 마주한 순간들. 사진은 일상 속에서 더 깊이 바라보는 방법을 일깨워줍니다.'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#ECEBE5] rounded-xl self-start border border-subtle">
            {(['all', 'birds', 'campus', 'nature', 'outings'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                  activeCategory === cat
                    ? 'bg-white text-[#152219] shadow-sm'
                    : 'text-[#627367] hover:text-[#152219]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#ECECE7] border border-subtle shadow-sm ${
                idx === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={item.image}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover metadata display */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                    {lang === 'en' ? item.category.toUpperCase() : item.category}
                  </span>
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-editorial font-medium mb-1">
                    {lang === 'en' ? item.titleEn : item.titleKr}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-200/90">
                    <span>{lang === 'en' ? item.locationEn : item.locationKr}</span>
                    <span aria-hidden="true">·</span>
                    <span>{lang === 'en' ? item.seasonEn : item.seasonKr}</span>
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-1 font-light opacity-80">
                    {lang === 'en' ? item.contributorEn : item.contributorKr}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-5xl w-full bg-[#152219] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo View */}
              <div className="lg:w-2/3 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.titleEn}
                  className="max-h-[65vh] lg:max-h-[85vh] w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Editorial Description Pane */}
              <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between text-white overflow-y-auto">
                <div className="space-y-4">
                  <span className="text-xs font-mono tracking-widest text-[#E5D7A3] uppercase block">
                    {lightboxItem.category.toUpperCase()} ARCHIVE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-editorial font-light">
                    {lang === 'en' ? lightboxItem.titleEn : lightboxItem.titleKr}
                  </h3>
                  <div className="space-y-1 text-xs font-mono text-[#A8BEB0]">
                    <div>
                      <strong>LOCATION: </strong>
                      {lang === 'en' ? lightboxItem.locationEn : lightboxItem.locationKr}
                    </div>
                    <div>
                      <strong>SEASON: </strong>
                      {lang === 'en' ? lightboxItem.seasonEn : lightboxItem.seasonKr}
                    </div>
                    <div>
                      <strong>CONTRIBUTOR: </strong>
                      {lang === 'en' ? lightboxItem.contributorEn : lightboxItem.contributorKr}
                    </div>
                  </div>
                  <p className="text-sm text-[#CBD8CF] font-light leading-relaxed pt-2 border-t border-white/10">
                    {lang === 'en' ? lightboxItem.noteEn : lightboxItem.noteKr}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 text-[11px] font-mono text-[#8EA395]">
                  Status: Representative visual per Wing Watchers presentation guidelines.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
