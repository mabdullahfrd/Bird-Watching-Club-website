import React from 'react';

interface ClubLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: 'full' | 'emblem' | 'inverted';
}

/**
 * Wing Watchers (우송대학교 탐조 동아리) Official Club Emblem
 * 
 * Precision vector representation faithful to the club identity:
 * - Graceful migratory bird in flight with aerodynamic curved wings
 * - Soft morning sun halo behind the crest
 * - Natural olive branch symbolizing peace, nature, and patient observation
 * - Official Woosong University club colorway:
 *   Deep Olive (#2D3924), Taupe Sand (#8C826C), Soft Cream (#F8F5EE), Sun Gold (#D4C79B)
 */
export const ClubLogo: React.FC<ClubLogoProps> = ({
  className = '',
  size = 44,
  showText = false,
  variant = 'emblem',
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        style={{ width: dimension, height: dimension }}
        className="relative shrink-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Subtle Outer Soft Ring */}
          <circle
            cx="60"
            cy="60"
            r="56"
            fill={variant === 'inverted' ? '#FAF8F3' : '#F6F3EB'}
            stroke={variant === 'inverted' ? '#2D3924' : '#8C826C'}
            strokeWidth="2.5"
            strokeOpacity="0.35"
          />

          {/* Gentle Morning Sun Halo behind bird */}
          <circle
            cx="60"
            cy="52"
            r="28"
            fill={variant === 'inverted' ? '#EAE3D2' : '#EDE6D6'}
          />

          {/* Background Wing / Secondary Feather Ribbon (Taupe) */}
          <path
            d="M 38 60 C 32 46, 36 28, 56 22 C 48 30, 46 42, 54 52 Z"
            fill="#8C826C"
            opacity="0.9"
          />

          {/* Primary Soaring Wing - Arched ribbon in Deep Olive */}
          <path
            d="M 52 56 C 42 36, 52 18, 76 14 C 64 24, 60 38, 70 50 Z"
            fill="#2D3924"
          />

          {/* Outer Wing Tip Graceful Sweep */}
          <path
            d="M 68 48 C 66 32, 78 20, 94 18 C 84 26, 80 38, 82 46 Z"
            fill="#4F5E41"
          />

          {/* Bird Body & Sleek Head pointing upward-right */}
          <path
            d="M 40 68 C 42 58, 48 50, 60 48 C 66 47, 72 45, 78 40 C 76 45, 72 49, 66 52 C 58 56, 50 64, 46 72 Z"
            fill="#2D3924"
          />

          {/* Beak */}
          <path
            d="M 76 41 L 82 42 L 77 44 Z"
            fill="#D4C79B"
          />

          {/* Bird Tail Feathers sweeping down */}
          <path
            d="M 42 66 C 36 72, 30 78, 26 84 C 32 80, 38 74, 42 68 Z"
            fill="#8C826C"
          />
          <path
            d="M 44 68 C 40 76, 34 84, 30 90 C 36 84, 42 76, 45 70 Z"
            fill="#2D3924"
          />

          {/* Peace Olive Branch below the bird */}
          {/* Main Stem */}
          <path
            d="M 36 86 C 48 83, 64 82, 86 86"
            stroke="#2D3924"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Olive Leaf 1 (Left top) */}
          <path
            d="M 46 84 C 44 79, 48 76, 52 78 C 50 82, 48 84, 46 84 Z"
            fill="#5A6C4A"
          />
          {/* Olive Leaf 2 (Center top) */}
          <path
            d="M 60 83 C 60 77, 65 74, 69 77 C 66 81, 62 83, 60 83 Z"
            fill="#2D3924"
          />
          {/* Olive Leaf 3 (Right top) */}
          <path
            d="M 74 84 C 75 78, 80 77, 83 80 C 80 84, 76 85, 74 84 Z"
            fill="#8C826C"
          />
          {/* Olive Leaf 4 (Bottom left) */}
          <path
            d="M 52 84 C 54 88, 50 92, 46 90 C 48 86, 50 84, 52 84 Z"
            fill="#2D3924"
          />
          {/* Olive Leaf 5 (Bottom center) */}
          <path
            d="M 68 83 C 71 88, 66 92, 62 90 C 64 86, 66 84, 68 83 Z"
            fill="#5A6C4A"
          />

          {/* Olive Berry Accent (Sun Gold) */}
          <circle cx="56" cy="85" r="2.2" fill="#D4C79B" />
          <circle cx="71" cy="86" r="2.2" fill="#D4C79B" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span className="font-editorial text-lg tracking-wider text-[#2D3924] font-medium">
            WING WATCHERS
          </span>
          <span className="font-mono text-[9px] tracking-widest text-[#7C7461] uppercase mt-1">
            WOOSONG UNIV · 탐조 동아리
          </span>
        </div>
      )}
    </div>
  );
};
