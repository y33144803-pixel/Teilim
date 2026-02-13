import { Stack, Button, Box, Typography, Alert, CircularProgress, FormControl, Select, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PsalmsStore } from '../stores/PsalmsStore';
import { useState } from 'react';
import { formatHebrewNumeral } from '../utils/hebrewNumerals';
import { CheckIcon, ListIcon, RefreshCwIcon, ShuffleIcon, SparklesIcon } from './icons/LucideIcons';

interface DrawingZoneProps {
  store: PsalmsStore;
}

interface DrawingErrorAlertProps {
  error: string;
  onClose: () => void;
}

function DrawingErrorAlert({ error, onClose }: DrawingErrorAlertProps) {
  return (
    <Alert
      severity="error"
      sx={{
        marginBottom: '20px',
        borderRadius: '12px',
        direction: 'rtl',
        textAlign: 'right',
      }}
      onClose={onClose}
    >
      {error}
    </Alert>
  );
}

function DrawingZoneBadge() {
  return (
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
      <SparklesIcon size={14} />
      הגרלת פרקים
    </Box>
  );
}

interface DrawActionsProps {
  disabled: boolean;
  isLoading: boolean;
  onDrawRandom: () => void;
  onToggleSelect: () => void;
}

function DrawActions({ disabled, isLoading, onDrawRandom, onToggleSelect }: DrawActionsProps) {
  return (
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
        disabled={disabled || isLoading}
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
            background: isLoading ? '#E7B96B' : '#CCCCCC',
            color: isLoading ? '#FFFFFF' : '#999',
          },
        }}
        onClick={onDrawRandom}
      >
        {isLoading ? <CircularProgress size={18} thickness={5} sx={{ color: 'currentColor' }} /> : <ShuffleIcon size={18} />}
        הגרילו פרק
      </Button>

      <Button
        variant="outlined"
        disabled={disabled || isLoading}
        onClick={onToggleSelect}
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
        <ListIcon size={18} />
        בחרו פרק מסוים
      </Button>
    </Stack>
  );
}

interface ChapterSelectProps {
  availableChapters: number[];
  onSelect: (chapterNumber: number) => void;
}

function ChapterSelect({ availableChapters, onSelect }: ChapterSelectProps) {
  return (
    <Box sx={{ paddingTop: '16px', display: 'flex', justifyContent: 'center' }}>
      <FormControl sx={{ width: { xs: '100%', sm: '420px' } }}>
        <Select
          value=""
          displayEmpty
          onChange={(e) => {
            const value = e.target.value as string;
            const num = parseInt(value, 10);
            if (!Number.isNaN(num)) {
              onSelect(num);
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
  );
}

interface DrawingResultProps {
  selectedChapterNumber: number;
  onConfirm: () => void;
  onDrawNew: () => void;
}

function DrawingResult({ selectedChapterNumber, onConfirm, onDrawNew }: DrawingResultProps) {
  return (
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
        פרק {formatHebrewNumeral(selectedChapterNumber)}
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
          onClick={onConfirm}
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
          <CheckIcon size={18} />
          אני לוקח את הפרק
        </Button>

        <Button
          variant="outlined"
          onClick={onDrawNew}
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
          <RefreshCwIcon size={18} />
          הגרלו פרק אחר
        </Button>
      </Stack>
    </Box>
  );
}

export const DrawingZone = observer(function DrawingZone({ store }: DrawingZoneProps) {
  const [isSelectingChapter, setIsSelectingChapter] = useState(false);

  const availableChapters = store.availableChapters;

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
        {store.error ? <DrawingErrorAlert error={store.error} onClose={() => store.clearError()} /> : null}

        <DrawingZoneBadge />

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

            <DrawActions
              disabled={availableChapters.length === 0}
              isLoading={store.isLoading}
              onDrawRandom={() => {
                setIsSelectingChapter(false);
                store.drawRandomChapter();
              }}
              onToggleSelect={() => setIsSelectingChapter((v) => !v)}
            />

            {isSelectingChapter && !store.isLoading ? (
              <ChapterSelect
                availableChapters={availableChapters}
                onSelect={(chapterNumber) => {
                  setIsSelectingChapter(false);
                  store.selectChapter(chapterNumber);
                  store.confirmSelectedChapter();
                }}
              />
            ) : null}
          </>
        ) : null}

        {!store.isLoading && showResult && store.selectedChapter !== null ? (
          <DrawingResult
            selectedChapterNumber={store.selectedChapter}
            onConfirm={() => store.confirmSelectedChapter()}
            onDrawNew={() => store.drawNewChapter()}
          />
        ) : null}
      </Box>
    </>
  );
});



