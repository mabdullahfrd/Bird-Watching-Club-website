import React from 'react';
import { ethicalPrinciples } from '../data/clubData';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface CareForNatureProps {
  lang: 'en' | 'kr';
}

export const CareForNature: React.FC<CareForNatureProps> = ({ lang }) => {
  return (
    <section className="py-24 bg-[#2D3924] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-[#E6DECB]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D2C9B3]">
              {lang === 'en' ? '11 / ETHICAL OBSERVATION' : '11 / 자연을 대하는 태도'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-editorial font-light tracking-tight text-white mb-4">
            {lang === 'en' ? 'Observe without disturbing.' : '간섭하지 않고, 가만히 바라보기.'}
          </h2>

          <p className="text-base sm:text-lg text-[#E6DECB]/90 font-light leading-relaxed">
            {lang === 'en'
              ? 'Our presence in the natural world should leave nothing behind except respect. We are quiet guests entering their living home.'
              : '우리가 자연에 머무는 시간은 오직 존중만을 남겨야 합니다. 우리는 새들의 삶의 터전에 조용히 찾아온 손님입니다.'}
          </p>
        </div>

        {/* 6 Ethical Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ethicalPrinciples.map((rule) => (
            <div
              key={rule.number}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#E6DECB] tracking-widest">
                  RULE {rule.number}
                </span>
                <Heart className="w-3.5 h-3.5 text-[#A89F88]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-editorial font-medium text-white">
                {lang === 'en' ? rule.title : rule.koreanTitle}
              </h3>

              <p className="text-xs sm:text-sm text-[#E6DECB]/85 font-light leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quiet Closing Thought */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center max-w-2xl mx-auto">
          <p className="text-sm font-editorial italic text-[#E6DECB]/90">
            {lang === 'en'
              ? '“The best birdwatching walk is one where the birds never even knew you were there.”'
              : '“가장 완벽한 탐조는, 새들이 우리가 곁에 다녀갔다는 사실조차 눈치채지 못했을 때입니다.”'}
          </p>
        </div>
      </div>
    </section>
  );
};
