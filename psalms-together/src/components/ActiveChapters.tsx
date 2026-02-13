import { Stack, Paper, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { PsalmsStore } from '../stores/PsalmsStore';
import type { TehillimChapter } from '../stores/PsalmsStore';
import { formatHebrewNumeral } from '../utils/hebrewNumerals';
import { BookIcon } from './icons/LucideIcons';
import { EmptyState } from './EmptyState';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

interface ActiveChaptersProps {
  store: PsalmsStore;
}

type ActiveChapterModel = PsalmsStore['activeChapters'][number];

interface ActiveChaptersHeaderProps {
  count: number;
}

function ActiveChaptersHeader({ count }: ActiveChaptersHeaderProps) {
  return (
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
        {count}
      </Box>
    </Box>
  );
}

interface ActiveChapterItemProps {
  chapter: ActiveChapterModel;
  onView: () => void;
  onComplete: () => void;
}

function ActiveChapterItem({ chapter, onView, onComplete }: ActiveChapterItemProps) {
  return (
    <Paper
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
          onClick={onView}
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
          onClick={onComplete}
        >
          <DoneOutlinedIcon sx={{ fontSize: '18px' }} />
          סיימתי
        </Button>
      </Stack>
    </Paper>
  );
}

interface ChapterPreviewProps {
  viewedChapterNumber: number | null;
  viewedChapter: TehillimChapter | undefined;
}

function ChapterPreview({ viewedChapterNumber, viewedChapter }: ChapterPreviewProps) {
  return (
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

          {viewedChapter ? (
            <Box sx={{ maxHeight: { xs: '220px', md: '420px' }, overflow: 'auto', paddingLeft: '6px' }}>
              {Array.isArray(viewedChapter.verses) ? (
                viewedChapter.verses.map((v: string, idx: number) => (
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
                  {viewedChapter.verses}
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
      )}
    </Box>
  );
}

export const ActiveChapters = observer(function ActiveChapters({ store }: ActiveChaptersProps) {
  const [viewedChapterNumber, setViewedChapterNumber] = useState<number | null>(null);

  const viewedChapter: TehillimChapter | undefined =
    viewedChapterNumber === null ? undefined : store.chapters.find((chapter) => chapter.number === viewedChapterNumber);

  if (store.activeChapters.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <Box sx={{ marginTop: '24px', direction: 'rtl' }}>
        <ActiveChaptersHeader count={store.activeChapters.length} />

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
              <ActiveChapterItem
                key={chapter.id}
                chapter={chapter}
                onView={() => setViewedChapterNumber(chapter.number)}
                onComplete={() => {
                  if (viewedChapterNumber === chapter.number) {
                    setViewedChapterNumber(null);
                  }
                  store.completeChapter(chapter.id);
                }}
              />
            ))}
          </Stack>

          <ChapterPreview viewedChapterNumber={viewedChapterNumber} viewedChapter={viewedChapter} />
        </Stack>
      </Box>
    </>
  );
});



