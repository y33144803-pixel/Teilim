import { Stack, Paper, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { PsalmsStore } from '../stores/PsalmsStore';
import { EmptyState } from './EmptyState';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

interface ActiveChaptersProps {
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

function BookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 0 1 1h7V6H4a1 1 0 0 0-1 1z" />
      <path d="M21 18a1 1 0 0 1-1 1h-7V6h7a1 1 0 0 1 1 1z" />
    </svg>
  );
}

export const ActiveChapters = observer(function ActiveChapters({ store }: ActiveChaptersProps) {
  const [viewedChapterNumber, setViewedChapterNumber] = useState<number | null>(null);

  if (store.activeChapters.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <Box sx={{ marginTop: '24px', direction: 'rtl' }}>
        <Box
          sx={{
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '10px',
            direction: 'rtl',
          }}
        >
          <Box sx={{ color: '#0284C7' }}>
            <BookIcon />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#111827',
              fontSize: '22px',
              lineHeight: 1.1,
              textAlign: 'right',
              fontFamily: '"Assistant", sans-serif',
            }}
          >
            פרקים בקריאה
          </Typography>

          <Box
            sx={{
              width: '28px',
              height: '28px',
              borderRadius: '999px',
              background: '#D9ECFF',
              color: '#1D4ED8',
              fontWeight: 800,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Assistant", sans-serif',
              flexShrink: 0,
            }}
          >
            {store.activeChapters.length}
          </Box>
        </Box>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{
            alignItems: 'stretch',
            columnGap: { md: '32px' },
          }}
        >
          <Stack spacing={2} sx={{ flex: 1 }}>
            {store.activeChapters.map((chapter) => (
              <Paper
                key={chapter.id}
                sx={{
                  padding: { xs: '14px 16px', sm: '16px 18px' },
                  borderRadius: '16px',
                  background: '#EEF7FF',
                  border: '2px solid #7CCBFF',
                  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.10)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  direction: 'rtl',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
                  },
                }}
              >
                <Stack direction="row" sx={{ alignItems: 'center', gap: '14px', direction: 'rtl' }}>
                  <Box
                    sx={{
                      background: '#0EA5E9',
                      color: 'white',
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '18px',
                      flexShrink: 0,
                      fontFamily: '"Assistant", sans-serif',
                    }}
                  >
                    {formatHebrewNumeral(chapter.number)}
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: '#1F2937',
                      fontSize: '16px',
                      direction: 'rtl',
                      textAlign: 'right',
                      fontFamily: '"Assistant", sans-serif',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    פרק {formatHebrewNumeral(chapter.number)}
                  </Typography>
                </Stack>

                <Stack spacing={1} direction="row" sx={{ alignItems: 'center', gap: '10px', direction: 'rtl' }}>
                  <Button
                    size="small"
                    variant="text"
                    sx={{
                      color: '#1D4ED8',
                      textTransform: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '6px 10px',
                      minWidth: 'auto',
                      display: 'flex',
                      gap: '6px',
                      alignItems: 'center',
                      flexDirection: 'row',
                      fontFamily: '"Assistant", sans-serif',
                      '&:hover': {
                        background: 'rgba(29, 78, 216, 0.10)',
                      },
                    }}
                    onClick={() => setViewedChapterNumber(chapter.number)}
                  >
                    <VisibilityOutlinedIcon sx={{ fontSize: '18px' }} />
                    צפייה
                  </Button>

                  <Button
                    size="small"
                    variant="text"
                    sx={{
                      color: '#16A34A',
                      textTransform: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '6px 10px',
                      minWidth: 'auto',
                      display: 'flex',
                      gap: '6px',
                      alignItems: 'center',
                      flexDirection: 'row',
                      fontFamily: '"Assistant", sans-serif',
                      '&:hover': {
                        background: 'rgba(22, 163, 74, 0.10)',
                      },
                    }}
                    onClick={() => {
                      if (viewedChapterNumber === chapter.number) {
                        setViewedChapterNumber(null);
                      }
                      store.completeChapter(chapter.id);
                    }}
                  >
                    <DoneOutlinedIcon sx={{ fontSize: '18px' }} />
                    סיימתי
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>

          <Box
            sx={{
              flex: 1,
              background: '#FFFFFF',
              border: '1px solid #E8E8E8',
              borderRadius: '16px',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
              padding: { xs: '14px 14px', sm: '16px 18px' },
              direction: 'rtl',
              textAlign: 'right',
              minHeight: { xs: 'auto', md: '220px' },
            }}
          >
            {viewedChapterNumber === null ? (
              <Typography
                variant="body2"
                sx={{
                  color: '#9A9A9A',
                  fontSize: '14px',
                  fontFamily: '"Assistant", sans-serif',
                }}
              >
                עדיין לא נבחר
              </Typography>
            ) : (
              (() => {
                const ch = store.chapters.find((c: any) => c.number === viewedChapterNumber);
                return (
                  <>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 800,
                        color: '#111827',
                        marginBottom: '10px',
                        fontSize: '14px',
                        fontFamily: '"Assistant", sans-serif',
                      }}
                    >
                      פרק {formatHebrewNumeral(viewedChapterNumber)}
                    </Typography>

                    {ch ? (
                      <Box sx={{ maxHeight: { xs: '220px', md: '420px' }, overflow: 'auto', paddingLeft: '6px' }}>
                        {Array.isArray(ch.verses) ? (
                          ch.verses.map((v: string, idx: number) => (
                            <Typography
                              key={idx}
                              variant="body1"
                              sx={{
                                fontSize: '16px',
                                lineHeight: '1.85',
                                color: '#374151',
                                marginBottom: '8px',
                                fontFamily: '"Assistant", sans-serif',
                              }}
                            >
                              {v}
                            </Typography>
                          ))
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: '16px',
                              lineHeight: '1.85',
                              color: '#374151',
                              fontFamily: '"Assistant", sans-serif',
                            }}
                          >
                            {ch.verses}
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#777',
                          fontSize: '14px',
                          fontFamily: '"Assistant", sans-serif',
                        }}
                      >
                        לא נמצא תוכן לפרק זה
                      </Typography>
                    )}
                  </>
                );
              })()
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
});



