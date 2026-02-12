import { Paper, Typography, Box } from '@mui/material';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  backgroundColor: string;
  borderColor: string;
  iconColor: string;
  textColor: string;
}

export function StatCard({
  icon,
  title,
  value,
  backgroundColor,
  borderColor,
  iconColor,
  textColor,
}: StatCardProps) {
  return (
    <Paper
      sx={{
        padding: { xs: '16px 20px', md: '18px 22px' },
        borderRadius: '14px',
        background: '#FFFFFF',
        boxShadow: '0 1px 6px rgba(16,24,40,0.06)',
        border: `2px solid ${borderColor}`,
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        direction: 'rtl',
        textAlign: 'right',
        minHeight: { xs: '96px', md: '104px' },
        justifyContent: 'space-between',
        gap: '12px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1, minWidth: 0, width: '100%' }}>
        <Typography
          variant="body2"
          sx={{
            color: '#909090',
            fontSize: { xs: '12px', md: '12px' },
            textAlign: 'right',
            direction: 'rtl',
            marginBottom: '6px',
            fontFamily: '"Assistant", sans-serif',
            fontWeight: 600,
            width: '100%',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: textColor,
            textAlign: 'right',
            direction: 'rtl',
            fontSize: { xs: '24px', md: '26px' },
            fontFamily: '"Assistant", sans-serif',
            lineHeight: 1.05,
            width: '100%',
          }}
        >
          {value}
        </Typography>
      </Box>

      <Box
        sx={{
          background: backgroundColor,
          borderRadius: '12px',
          width: '46px',
          height: '46px',
          minWidth: '46px',
          minHeight: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            color: iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
              width: '20px',
              height: '20px',
              display: 'block',
            },
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
}

