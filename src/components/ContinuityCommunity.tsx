import React, { useState } from 'react';
import { leadershipRoles } from '../data/clubData';
import { ArrowRight, RotateCw, Archive, Sparkles, BookMarked, Users } from 'lucide-react';

interface ContinuityCommunityProps {
  lang: 'en' | 'kr';
}

export const ContinuityCommunity: React.FC<ContinuityCommunityProps> = ({ lang }) => {
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);

  const cycleSteps = [
    {
      labelEn: 'INVITE',
      labelKr: '초대하기',
      descEn: 'Welcome curious students from all departments without entrance tests or gear requirements.',
      descKr: '전공과 국적, 사전 지식에 상관없이 자연을 사랑하는 모든 학우들을 편안하게 맞이합니다.',
    },
    {
      labelEn: 'MEET',
      labelKr: '만나기',
      descEn: 'Gather at accessible campus landmarks, check morning weather, and share binoculars.',
      descKr: '캠퍼스 시계탑이나 공원 입구에서 모여 당일 코스를 점검하고 쌍안경을 나눕니다.',
    },
    {
      labelEn: 'EXPLORE',
      labelKr: '탐험하기',
      descEn: 'Walk slowly, listen attentively, and discover Daejeon’s wildlife without disturbing.',
      descKr: '조용한 걸음으로 대전의 숲과 강변을 거닐며 살아있는 생명들의 소리에 귀 기울입니다.',
    },
    {
      labelEn: 'RECAP',
      labelKr: '기록과 나눔',
      descEn: 'Save field notes, sketch questions, celebrate observations, and pass lessons to new leaders.',
      descKr: '필드 노트를 정리하고 차를 나누며, 다음 학기 후배들을 위해 소중한 기록을 아카이빙합니다.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F3] border-b border-[#8C826C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Part: Continuity & Legacy */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#526242] block mb-3">
            {lang === 'en' ? '12 / GENERATIONAL CONTINUITY' : '12 / 지속 가능한 동아리'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-[#242E1F] mb-4">
            {lang === 'en' ? 'Leave something for the next group.' : '다음 기수를 위해, 더 든든한 밑거름 남기기.'}
          </h2>
          <p className="text-base sm:text-lg text-[#595241] font-light leading-relaxed">
            {lang === 'en'
              ? 'Wing Watchers is created to outlive any single graduating cohort. By maintaining open records, friendly route notes, and rotating leadership responsibilities, every student generation leaves the trail a little clearer for the next.'
              : '윙워처스는 한 학기 반짝였다 사라지는 모임이 아닙니다. 탐조 기록, 산책 경로, 행사 기획안과 후기를 차곡차곡 모아둠으로써, 매 기수가 다음 기수에게 더 큰 자신감과 따뜻한 전통을 물려줍니다.'}
          </p>
        </div>

        {/* Circular Lifecycle Process (INVITE -> MEET -> EXPLORE -> RECAP) */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-[#EFE9DC]/70 border border-[#8C826C]/25 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#526242] block">
                {lang === 'en' ? 'THE WING WATCHERS RHYTHM' : '동아리 순환 프로세스'}
              </span>
              <h3 className="text-2xl font-editorial font-medium text-[#242E1F]">
                INVITE → MEET → EXPLORE → RECAP
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#526242]">
              <RotateCw className="w-3.5 h-3.5 text-[#2D3924]" />
              <span>{lang === 'en' ? 'Self-sustaining student cycle' : '선순환 자율 운영 체계'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cycleSteps.map((step, idx) => {
              const isSelected = activeCycleIndex === idx;
              return (
                <button
                  key={step.labelEn}
                  onClick={() => setActiveCycleIndex(idx)}
                  className={`p-6 rounded-2xl text-left border transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#2D3924] text-white border-[#2D3924] shadow-md -translate-y-1'
                      : 'bg-white hover:bg-[#FAF8F3] text-[#242E1F] border-[#8C826C]/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-xs ${
                        isSelected ? 'text-[#D4C79B]' : 'text-[#7A705B]'
                      }`}
                    >
                      STEP 0{idx + 1}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#D4C79B]' : 'bg-[#8C826C]/40'
                      }`}
                    />
                  </div>
                  <h4 className="text-lg font-editorial font-semibold tracking-wide mb-1">
                    {lang === 'en' ? step.labelEn : step.labelKr}
                  </h4>
                  <p
                    className={`text-xs font-light leading-relaxed ${
                      isSelected ? 'text-[#EAE4D5]' : 'text-[#595241]'
                    }`}
                  >
                    {lang === 'en' ? step.descEn : step.descKr}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Distributed Leadership & Passing the Torch Roles */}
        <div>
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#526242] block mb-2">
              {lang === 'en' ? 'DISTRIBUTED RESPONSIBILITY' : '역할 분담과 리더십 순환'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#242E1F] mb-2">
              {lang === 'en'
                ? 'Clear roles so nobody burns out.'
                : '모두가 부담 없이 즐길 수 있는 체계적인 역할 나눔.'}
            </h3>
            <p className="text-sm sm:text-base text-[#595241] font-light">
              {lang === 'en'
                ? 'Because international students join and graduate across different academic terms, our leadership structure is built for seamless handover between global cohorts and Korean student liaisons.'
                : '외국인 유학생과 교환학생들이 학기별로 입학하고 졸업하는 캠퍼스 특성에 맞추어, 글로벌 기수와 한국인 학우 간의 유연하고 체계적인 인계 시스템을 운영합니다.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipRoles.map((role) => (
              <div
                key={role.role}
                className="p-6 rounded-2xl bg-white border border-[#8C826C]/25 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] text-[#526242] bg-[#EFE9DC] px-2.5 py-1 rounded-md">
                      {lang === 'en' ? 'Rotational Role' : '순환 역할'}
                    </span>
                    <Users className="w-4 h-4 text-[#7A705B]" />
                  </div>
                  <h4 className="text-lg font-editorial font-medium text-[#242E1F] mb-1">
                    {lang === 'en' ? role.role : role.koreanRole}
                  </h4>
                  <p className="text-xs text-[#595241] font-light leading-relaxed mb-4">
                    {role.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#8C826C]/15 text-[11px] font-mono text-[#7A705B]">
                  <span>{lang === 'en' ? 'Pass-it-forward leadership' : '다음 기수로 자연스러운 인계'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
