import { Typography, Box } from '@mui/material';
import { BookOpenIcon, SparklesIcon } from './icons/LucideIcons';

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
            <BookOpenIcon size={30} stroke="white" strokeWidth={1.8} />
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
          <SparklesIcon
            size={16}
            stroke="#cccccc"
            style={{ verticalAlign: 'middle', display: 'block', margin: '0', padding: '0' }}
          />
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

