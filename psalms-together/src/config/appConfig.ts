export const APP_CONFIG = {
  appName: 'תהילים ביחד',
  subtitle: 'קריאה שיתופית של ספר התהילים',
  totalChapters: 150,
  
  colors: {
    primary: '#FF8C42',
    secondary: '#FFD700',
    success: '#4CAF50',
    info: '#2196F3',
    error: '#E74C3C',
    background: '#FAFAFA',
    lightBg: '#F5F5F5',
  },
  
  stats: {
    read: {
      title: 'פרקים שנקראו',
      icon: '📖',
      bgColor: '#F5F5F5',
      accentColor: '#7C7C7C',
    },
    remaining: {
      title: 'נשארו להגרלה',
      icon: '✨',
      bgColor: '#FFF9E6',
      accentColor: '#FFD700',
    },
    active: {
      title: 'פרקים בקריאה',
      icon: '✓',
      bgColor: '#E6F9F0',
      accentColor: '#4CAF50',
    },
    completed: {
      title: 'ספרים שהושלמו',
      icon: '📚',
      bgColor: '#E6F3FF',
      accentColor: '#2196F3',
    },
  },

  messages: {
    drawing: 'הגרלו פרק',
    drawingLoading: 'מסתובב...',
    select: 'בחרו פרק מסוים',
    confirm: 'אני לוקח את הפרק',
    newDraw: 'הגרל פרק אחר',
    selectPlaceholder: 'בחרו פרק...',
    activeChapters: 'פרקים בקריאה:',
    errorMessage: 'שגיאה בטעינת הפרק',
  },
} as const;
