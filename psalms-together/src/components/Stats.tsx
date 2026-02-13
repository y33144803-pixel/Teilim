import { Box, useMediaQuery, useTheme } from '@mui/material';
import { StatCard } from './StatCard';
import { observer } from 'mobx-react-lite';
import { PsalmsStore } from '../stores/PsalmsStore';
import { BookOpenIcon, CircleCheckBigIcon, ShuffleIcon, TrophyIcon } from './icons/LucideIcons';

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
      <StatCard
        icon={<BookOpenIcon />}
        title="פרקים בקריאה"
        value={store.activeChaptersCount}
        backgroundColor="#F4FAFF"
        borderColor="#E8F4FF"
        iconColor="#2196F3"
        textColor="#111827"
      />

      <StatCard
        icon={<CircleCheckBigIcon />}
        title="פרקים שנקראו"
        value={`${store.readCount} מתוך ${store.totalChapters || 150}`}
        backgroundColor="#F3FFFA"
        borderColor="#DFF7EA"
        iconColor="#4CAF50"
        textColor="#111827"
      />

      <StatCard
        icon={<ShuffleIcon />}
        title="נשארו להגרלה"
        value={store.unreadChapters}
        backgroundColor="#FFF9F0"
        borderColor="#FFF3D6"
        iconColor="#FFA000"
        textColor="#111827"
      />

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


