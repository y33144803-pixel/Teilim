import { Stack, Button, Box, Typography, Alert, CircularProgress, FormControl, Select, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PsalmsStore } from '../stores/PsalmsStore';
import { useMemo, useState } from 'react';

interface DrawingZoneProps {
  store: PsalmsStore;
}

const ONES: { [key: number]: string } = { 1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה', 6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט' };
const TENS: { [key: number]: string } = { 10: 'י', 20: 'כ', 30: 'ל', 40: 'מ', 50: 'נ', 60: 'ס', 70: 'ע', 80: 'פ', 90: 'צ' };
const HUNDREDS: { [key: number]: string } = { 100: 'ק' };

function numberToHebrew(num: number): string {
  if (num === 0) return '0';
  let result = '';
  if (num >= 100) {
    const hundreds = Math.floor(num / 100) * 100;
    if (hundreds >= 100) {
      result += HUNDREDS[100] || '';
      num -= 100;
    }
  }
  // special cases for 15 and 16
  if (num === 15) return result + 'טו';
  if (num === 16) return result + 'טז';

  if (num >= 10) {
    const tens = Math.floor(num / 10) * 10;
    if (tens) {
      result += TENS[tens] || '';
      num = num % 10;
    }
  }
  if (num > 0) {
    result += ONES[num] || '';
  }
  return result;
}

function formatHebrewNumeral(num: number): string {
  const letters = numberToHebrew(num);
  if (!letters) return num.toString();
  if (letters.length === 1) return letters + '׳';
  return letters.slice(0, -1) + '"' + letters.slice(-1);
}

function LucideListIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
      <path d="M3 6h.01" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M8 6h13" />
    </svg>
  );
}

function LucideShuffleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d="m18 14 4 4-4 4" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
      <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
      <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
    </svg>
  );
}

function LucideRefreshCwIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function LucideCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export const DrawingZone = observer(function DrawingZone({ store }: DrawingZoneProps) {
  const [isSelectingChapter, setIsSelectingChapter] = useState(false);

  const availableChapters = useMemo(
    () =>
      Array.from({ length: store.totalChapters }, (_, i) => i + 1).filter(
        (num) =>
          !store.readChapters.includes(num) &&
          !store.activeChapters.some((ch) => ch.number === num && ch.status === 'reading'),
      ),
    [store.totalChapters, store.readChapters, store.activeChapters],
  );

  const showResult = store.selectedChapter !== null;

  return (
    <>
      <Box
        sx={{
          background: 'linear-gradient(180deg, #FFFEF0 0%, #FFF9E6 100%)',
          padding: { xs: '24px 18px', sm: '28px 24px' },
          borderRadius: '24px',
          boxShadow: 'none',
          marginBottom: '24px',
          direction: 'rtl',
          textAlign: 'center',
          border: '1px solid #F1E5CF',
        }}
      >
        {store.error && (
          <Alert
            severity="error"
            sx={{
              marginBottom: '20px',
              borderRadius: '12px',
              direction: 'rtl',
              textAlign: 'right',
            }}
            onClose={() => store.clearError()}
          >
            {store.error}
          </Alert>
        )}

        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '6px 10px',
            borderRadius: '999px',
            background: '#FFF3D6',
            color: '#E39A0A',
            fontWeight: 700,
            fontSize: '12px',
            marginBottom: '14px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: 'block' }}
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
          </svg>
          הגרלת פרקים
        </Box>

        {!showResult ? (
          <>
            <Typography
              variant="body2"
              sx={{
                color: '#6B6B6B',
                marginBottom: '18px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: '"Assistant", sans-serif',
                lineHeight: 1.45,
              }}
            >
              לחצו להגרלת פרק תהילים אקראי או בחרו פרק מסוים
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                direction: 'rtl',
                flexDirection: { xs: 'column', sm: 'row' },
                rowGap: '12px',
                columnGap: '16px',
              }}
            >
              <Button
                variant="contained"
                disabled={availableChapters.length === 0 || store.isLoading}
                sx={{
                  background: '#E39A0A',
                  color: 'white',
                  height: '40px',
                  padding: '0 24px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '16px',
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  direction: 'rtl',
                  fontFamily: '"Assistant", sans-serif',
                  minWidth: { xs: '100%', sm: '160px' },
                  boxShadow: 'none',
                  '&:hover': {
                    background: '#D4931F',
                    boxShadow: 'none',
                  },
                  '&:disabled': {
                    background: store.isLoading ? '#E7B96B' : '#CCCCCC',
                    color: store.isLoading ? '#FFFFFF' : '#999',
                  },
                }}
                onClick={() => {
                  setIsSelectingChapter(false);
                  store.drawRandomChapter();
                }}
              >
                {store.isLoading ? (
                  <CircularProgress size={18} thickness={5} sx={{ color: 'currentColor' }} />
                ) : (
                  <LucideShuffleIcon />
                )}
                הגרילו פרק
              </Button>

              <Button
                variant="outlined"
                disabled={availableChapters.length === 0 || store.isLoading}
                onClick={() => setIsSelectingChapter((v) => !v)}
                sx={{
                  borderColor: '#B3E5FC',
                  color: '#1E88E5',
                  height: '40px',
                  padding: '0 24px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '16px',
                  border: '2px solid #B3E5FC',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  flexDirection: 'row',
                  fontFamily: '"Assistant", sans-serif',
                  minWidth: { xs: '100%', sm: '200px' },
                  background: '#FFFFFF',
                  '&:hover': {
                    borderColor: '#90CAF9',
                    background: '#F0F9FF',
                  },
                  '&:disabled': {
                    borderColor: '#D0D0D0',
                    color: '#B0B0B0',
                  },
                }}
              >
                <LucideListIcon />
                בחרו פרק מסוים
              </Button>
            </Stack>

            {isSelectingChapter && !store.isLoading ? (
              <Box sx={{ paddingTop: '16px', display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ width: { xs: '100%', sm: '420px' } }}>
                  <Select
                    value=""
                    displayEmpty
                    onChange={(e) => {
                      const value = e.target.value as string;
                      const num = parseInt(value, 10);
                      if (!Number.isNaN(num)) {
                        setIsSelectingChapter(false);
                        store.selectChapter(num);
                        store.confirmSelectedChapter();
                      }
                    }}
                    sx={{
                      height: '44px',
                      borderRadius: '12px',
                      background: '#FFFFFF',
                      direction: 'rtl',
                      fontSize: '14px',
                      fontFamily: '"Assistant", sans-serif',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#B3E5FC !important',
                        borderWidth: '2px',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#90CAF9 !important',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#90CAF9 !important',
                      },
                    }}
                  >
                    <MenuItem value="" disabled sx={{ direction: 'rtl' }}>
                      בחרו פרק מהרשימה...
                    </MenuItem>
                    {availableChapters.map((ch) => (
                      <MenuItem key={ch} value={String(ch)} sx={{ direction: 'rtl' }}>
                        {formatHebrewNumeral(ch)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : null}
          </>
        ) : null}

        {!store.isLoading && showResult ? (
          <Box sx={{ paddingTop: { xs: '22px', sm: '26px' }, paddingBottom: { xs: '10px', sm: '12px' } }}>
            <Typography
              variant="body2"
              sx={{
                color: '#9A9A9A',
                marginBottom: '10px',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              הפרק שהוגרל:
            </Typography>

            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 26px',
                borderRadius: '14px',
                border: '2px solid #F0D7A6',
                background: '#FFFFFF',
                color: '#E39A0A',
                fontWeight: 800,
                fontSize: { xs: '36px', sm: '44px' },
                lineHeight: 1,
                marginBottom: '18px',
              }}
            >
              פרק {store.selectedChapter ? formatHebrewNumeral(store.selectedChapter) : ''}
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                direction: 'rtl',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '12px',
                columnGap: '16px',
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  store.confirmSelectedChapter();
                  store.selectedChapter = null;
                }}
                sx={{
                  height: '40px',
                  padding: '0 22px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '14px',
                  background: '#0F9D58',
                  color: '#FFFFFF',
                  boxShadow: 'none',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  flexDirection: 'row',
                  '&:hover': {
                    background: '#0B8A4E',
                    boxShadow: 'none',
                  },
                }}
              >
                <LucideCheckIcon />
                אני לוקח את הפרק
              </Button>

              <Button
                variant="outlined"
                onClick={() => store.drawNewChapter()}
                sx={{
                  height: '40px',
                  padding: '0 18px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '14px',
                  border: '2px solid #E7E5E4',
                  color: '#44403C',
                  background: '#FFFFFF',
                  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  flexDirection: 'row',
                  '&:hover': {
                    borderColor: '#D6D3D1',
                    background: '#FAFAF9',
                  },
                }}
              >
                <LucideRefreshCwIcon />
                הגרלו פרק אחר
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
});



