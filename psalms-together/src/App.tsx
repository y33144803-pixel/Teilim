import { Container, Stack, CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { DrawingZone } from './components/DrawingZone';
import { ActiveChapters } from './components/ActiveChapters';
import { psalmsStore } from './stores/PsalmsStore';

const theme = createTheme({
  typography: {
    fontFamily: '"Assistant", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", sans-serif',
    fontSize: 15,
  },
  spacing: 9,
  palette: {
    background: {
      default: '#FAFAFA',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: '#FAFAFA',
          minHeight: '100vh',
          direction: 'rtl',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header
          title="תהילים ביחד"
          subtitle="הגרלת פרקי תהילים"
        />

        <Container
          maxWidth="lg"
          sx={{
            paddingTop: 0,
            paddingBottom: '24px',
            px: { xs: 2, sm: 3, md: 6 },
          }}
        >
          <Stack spacing={3} sx={{ paddingTop: '18px' }}>
            <Stats store={psalmsStore} />
            <DrawingZone store={psalmsStore} />
            <ActiveChapters store={psalmsStore} />
            <Box sx={{ marginTop: '48px', textAlign: 'center' }}>
              <Typography
                sx={{
                  color: '#CCC',
                  fontSize: '13px',
                  direction: 'rtl',
                }}
              >
                יהי רצון שתפילותינו יתקבלו לרצון
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
