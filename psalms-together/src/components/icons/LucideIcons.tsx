import type { SVGProps } from 'react';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'> & {
  size?: number;
};

function LucideSvg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
      {...props}
    >
      {children}
    </svg>
  );
}

export function BookOpenIcon(props: IconProps) {
  return (
    <LucideSvg {...props}>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </LucideSvg>
  );
}

export function ShuffleIcon(props: IconProps) {
  return (
    <LucideSvg {...props}>
      <path d="m18 14 4 4-4 4" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
      <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
      <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
    </LucideSvg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <LucideSvg {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </LucideSvg>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <LucideSvg {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </LucideSvg>
  );
}

export function CircleCheckBigIcon(props: IconProps) {
  return (
    <LucideSvg {...props}>
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
    </LucideSvg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <LucideSvg {...props}>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 0 1 1h7V6H4a1 1 0 0 0-1 1z" />
      <path d="M21 18a1 1 0 0 1-1 1h-7V6h7a1 1 0 0 1 1 1z" />
    </LucideSvg>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <LucideSvg {...props}>
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
      <path d="M3 6h.01" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M8 6h13" />
    </LucideSvg>
  );
}

export function RefreshCwIcon(props: IconProps) {
  return (
    <LucideSvg {...props}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </LucideSvg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <LucideSvg {...props}>
      <path d="M20 6 9 17l-5-5" />
    </LucideSvg>
  );
}
