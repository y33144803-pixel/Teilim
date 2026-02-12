import { Typography, Box } from '@mui/material';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <Box
      sx={{
        background: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        direction: 'rtl',
        margin: 0,
        padding: 0,
        width: '100%',
      }}
    >
      {/* Main Header Content */}
      <Box
        sx={{
          padding: '10px 0 0 0',
          direction: 'rtl',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0',
          margin: 0,
          width: '100%',
        }}
      >
        {/* Title with Icon - Center aligned */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            direction: 'rtl',
            padding: '0',
            margin: '0',
            width: '100%',
          }}
        >
          <Box
            sx={{
              background: '#ffc324',
              borderRadius: '12px',
              width: '54px',
              height: '54px',
              minWidth: '54px',
              minHeight: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: 'none',
              border: 'none',
              padding: '6px',
              margin: '0',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: 'block' }}
            >
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: '36px',
              color: '#e39a0a',
              margin: 0,
              padding: 0,
              textAlign: 'center',
              fontFamily: '"Assistant", sans-serif',
              letterSpacing: '0px',
              lineHeight: '1',
            }}
          >
            {title}
          </Typography>
        </Box>
        
        {/* Subtitle with icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            direction: 'rtl',
            margin: '0',
            padding: '0',
            width: '100%',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#cccccc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ verticalAlign: 'middle', display: 'block', margin: '0', padding: '0' }}
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
          </svg>
          <Typography
            variant="body2"
            sx={{
              fontSize: '15px',
              color: '#969696',
              margin: 0,
              padding: 0,
              textAlign: 'center',
              direction: 'rtl',
              fontFamily: '"Assistant", sans-serif',
              letterSpacing: '0px',
              fontWeight: 400,
              lineHeight: '1',
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Bottom divider line */}
      <Box
        sx={{
          height: '2px',
          background: '#ffe5b9',
          width: '100%',
          margin: '12px 0 0 0',
          padding: 0,
        }}
      />
    </Box>
  );
}

