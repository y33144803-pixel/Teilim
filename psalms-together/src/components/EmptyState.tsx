import { Box, Typography } from '@mui/material';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
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
