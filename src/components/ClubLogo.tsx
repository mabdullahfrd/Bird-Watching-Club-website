import React from 'react';
import { useLogo } from '../context/LogoContext';

export interface ClubLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: 'full' | 'emblem' | 'inverted' | 'clean';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  onClick?: () => void;
  interactive?: boolean;
}

/**
 * Wing Watchers (우송대학교 탐조 동아리) Official Club Logo
 *
 * Displays the authentic official club logo as uploaded:
 * - Uses the active logo URL (user-uploaded official asset)
 * - Renders with object-contain to strictly preserve original aspect ratio
 * - Clean presentation across navbar, hero, passport, and footer
 */
export const ClubLogo: React.FC<ClubLogoProps> = ({
  className = '',
  size = 44,
  showText = false,
  rounded = 'xl',
  onClick,
}) => {
  const { logoUrl } = useLogo();

  const dimensionStyle =
    typeof size === 'number'
      ? { width: `${size}px`, height: `${size}px` }
      : { width: size, height: size };

  const roundedClass =
    {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      full: 'rounded-full',
    }[rounded] || 'rounded-xl';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        style={dimensionStyle}
        onClick={onClick}
        className={`relative shrink-0 overflow-hidden flex items-center justify-center bg-[#FAF8F3] ${roundedClass} border border-[#8C826C]/20 shadow-xs transition-transform duration-200 ${
          onClick ? 'cursor-pointer hover:scale-[1.02] hover:border-[#526242]' : ''
        }`}
        title="Wing Watchers Official Club Logo"
      >
        <img
          src={logoUrl}
          alt="Wing Watchers (우송대학교 탐조 동아리) Official Club Logo"
          className="w-full h-full object-contain p-0.5"
          loading="eager"
          decoding="async"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-editorial text-base sm:text-lg font-bold tracking-wider text-[#2D3924]">
            WING WATCHERS
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#6B6350] uppercase">
            우송대 탐조 동아리
          </span>
        </div>
      )}
    </div>
  );
};
