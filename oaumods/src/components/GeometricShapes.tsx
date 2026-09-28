import React from 'react';

export type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon';
export type ShapeColor = 'gold' | 'blue' | 'navy' | 'slate' | 'amber' | 'emerald';

interface ShapeProps {
  type: ShapeType;
  color?: ShapeColor;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'outline';
  className?: string;
}

const COLOR_MAP: Record<ShapeColor, { fill: string; stroke: string }> = {
  gold: { fill: 'fill-amber-400', stroke: 'stroke-amber-500' },
  blue: { fill: 'fill-sky-500', stroke: 'stroke-sky-600' },
  navy: { fill: 'fill-[#12345B]', stroke: 'stroke-[#12345B]' },
  slate: { fill: 'fill-slate-300', stroke: 'stroke-slate-400' },
  amber: { fill: 'fill-amber-300', stroke: 'stroke-amber-400' },
  emerald: { fill: 'fill-emerald-500', stroke: 'stroke-emerald-600' },
};

const SIZE_MAP = {
  sm: 'w-3 h-3',
  md: 'w-5 h-5',
  lg: 'w-9 h-9',
  xl: 'w-16 h-16',
};

export function GeometricShape({
  type,
  color = 'gold',
  size = 'md',
  variant = 'solid',
  className = '',
}: ShapeProps) {
  const c = COLOR_MAP[color];
  const s = SIZE_MAP[size];

  if (type === 'circle') {
    return (
      <svg className={`${s} ${className} shrink-0`} viewBox="0 0 100 100" fill="none">
        {variant === 'outline' ? (
          <circle cx="50" cy="50" r="42" className={c.stroke} strokeWidth="10" />
        ) : (
          <circle cx="50" cy="50" r="48" className={c.fill} />
        )}
      </svg>
    );
  }

  if (type === 'square') {
    return (
      <svg className={`${s} ${className} shrink-0`} viewBox="0 0 100 100" fill="none">
        {variant === 'outline' ? (
          <rect x="10" y="10" width="80" height="80" className={c.stroke} strokeWidth="10" />
        ) : (
          <rect x="4" y="4" width="92" height="92" className={c.fill} />
        )}
      </svg>
    );
  }

  if (type === 'triangle') {
    return (
      <svg className={`${s} ${className} shrink-0`} viewBox="0 0 100 100" fill="none">
        {variant === 'outline' ? (
          <polygon points="50,10 92,90 8,90" className={c.stroke} strokeWidth="10" />
        ) : (
          <polygon points="50,4 96,94 4,94" className={c.fill} />
        )}
      </svg>
    );
  }

  // Hexagon
  return (
    <svg className={`${s} ${className} shrink-0`} viewBox="0 0 100 100" fill="none">
      {variant === 'outline' ? (
        <polygon
          points="50,8 92,29 92,71 50,92 8,71 8,29"
          className={c.stroke}
          strokeWidth="10"
        />
      ) : (
        <polygon points="50,4 94,27 94,73 50,96 6,73 6,27" className={c.fill} />
      )}
    </svg>
  );
}

/**
 * WordAccent: Places a high-contrast geometric shape (circle, square, triangle, hexagon)
 * directly behind text to create architectural contrast inspired by Arieh Sharon's OAU design.
 */
export function WordAccent({
  children,
  shape = 'hexagon',
  color = 'gold',
  className = '',
}: {
  children: React.ReactNode;
  shape?: ShapeType;
  color?: ShapeColor;
  className?: string;
}) {
  return (
    <span className={`relative inline-block font-inherit ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className={`absolute -z-0 pointer-events-none select-none transition-transform ${
          shape === 'circle'
            ? '-top-2 -left-2.5 w-8 h-8 opacity-35'
            : shape === 'square'
            ? '-top-1.5 -right-2.5 w-7 h-7 rotate-12 opacity-35'
            : shape === 'triangle'
            ? '-top-3 left-1/4 w-8 h-8 opacity-35'
            : '-top-2.5 -left-3 w-9 h-9 -rotate-6 opacity-35'
        }`}
      >
        <GeometricShape type={shape} color={color} size="lg" />
      </span>
    </span>
  );
}
