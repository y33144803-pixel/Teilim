import { Box, Typography } from '@mui/material';
import { BookOpenIcon } from './icons/LucideIcons';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ 
  title = 'עדיין לא נבחרו פרקים לקריאה',
  description = 'הגרילו פרק כדי להתחיל!'
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        background: '#FFFFFF',
        border: '2px dashed #E2E2E2',
        borderRadius: '18px',
        padding: { xs: '44px 18px', sm: '54px 24px' },
        textAlign: 'center',
        direction: 'rtl',
        marginBottom: '24px',
        maxWidth: '520px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Box sx={{ color: '#D2D2D2', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
        <BookOpenIcon size={64} />
      </Box>
      
      <Typography
        variant="h6"
        sx={{
          color: '#C7C7C7',
          fontSize: '16px',
          fontWeight: 500,
          marginBottom: '8px',
          fontFamily: '"Assistant", sans-serif',
        }}
      >
        {title}
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          color: '#C7C7C7',
          fontSize: '14px',
          fontFamily: '"Assistant", sans-serif',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
