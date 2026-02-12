import { Box, useMediaQuery, useTheme } from '@mui/material';
import { StatCard } from './StatCard';
import { observer } from 'mobx-react-lite';
import { PsalmsStore } from '../stores/PsalmsStore';

function LucideIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      {children}
    </svg>
  );
}

function TrophyIcon() {
  return (
    <LucideIcon>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </LucideIcon>
  );
}

function ShuffleIcon() {
  return (
    <LucideIcon>
      <path d="m18 14 4 4-4 4" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
      <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
      <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
    </LucideIcon>
  );
}

function CircleCheckBigIcon() {
  return (
    <LucideIcon>
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
    </LucideIcon>
  );
}

function BookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

interface StatsProps {
  store: PsalmsStore;
}

export const Stats = observer(function Stats({ store }: StatsProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        marginBottom: '10px',
        px: 0,
        display: 'grid',
        gridTemplateColumns: isSmall ? '1fr' : isMedium ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: { xs: '14px', md: '16px' },
        alignItems: 'stretch',
        direction: 'rtl',
      }}
    >
      {/* תכלת - פרקים בקריאה (right-most in provided image) */}
      <StatCard
        icon={<BookIcon />}
        title="פרקים בקריאה"
        value={store.activeChaptersCount}
        backgroundColor="#F4FAFF"
        borderColor="#E8F4FF"
        iconColor="#2196F3"
        textColor="#111827"
      />

      {/* ירוק - פרקים שנקראו */}
      <StatCard
        icon={<CircleCheckBigIcon />}
        title="פרקים שנקראו"
        value={`${store.readCount} מתוך ${store.totalChapters || 150}`}
        backgroundColor="#F3FFFA"
        borderColor="#DFF7EA"
        iconColor="#4CAF50"
        textColor="#111827"
      />

      {/* צהוב - נשארו להגרלה */}
      <StatCard
        icon={<ShuffleIcon />}
        title="נשארו להגרלה"
        value={store.unreadChapters}
        backgroundColor="#FFF9F0"
        borderColor="#FFF3D6"
        iconColor="#FFA000"
        textColor="#111827"
      />

      {/* סגול - ספרים שהושלמו (left-most in provided image) */}
      <StatCard
        icon={<TrophyIcon />}
        title="ספרים שהושלמו"
        value={store.completedCycles}
        backgroundColor="#FBF7FF"
        borderColor="#F0E6FF"
        iconColor="#9C27B0"
        textColor="#111827"
      />
    </Box>
  );
});


