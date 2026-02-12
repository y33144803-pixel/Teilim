# תהילים ביחד - Psalms Together

אפליקציית React מקצועית לניהול קריאה שיתופית של ספר התהילים עם 150 פרקים.

## 🏗️ ארכיטקטורה

### טכנולוגיות
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Material UI (MUI)** - Comprehensive UI Components
- **MobX** - State Management (Class-based)
- **Vite** - Build Tool & Dev Server

### מבנה הפרויקט
```
src/
├── stores/
│   └── PsalmsStore.ts          (Class-based MobX Store)
├── components/
│   ├── Header.tsx              (Header with logo and title)
│   ├── StatCard.tsx            (Individual stat card component)
│   ├── Stats.tsx               (Stats dashboard with 4 metrics)
│   ├── DrawingZone.tsx         (Chapter drawing and selection)
│   └── ActiveChapters.tsx      (Active chapters list)
├── App.tsx                     (Main application component)
└── index.css                   (Global styles)
```

## ✨ פיצ'רים

### 1. לוח סטטיסטיקה (Stats Dashboard)
- **פרקים שנקראו**: מציגה כמה פרקים נקראו מתוך 150
- **נשארו להגרלה**: מספר הפרקים שעדיין זמינים
- **פרקים בקריאה**: מונה הפרקים הפעילים כרגע
- **ספרים שהושלמו**: מספר סבבים מלאים (150 פרקים)

### 2. אזור ההגרלה (Drawing Zone)
- **כפתור הגרלה רנדומלית**: בוחר פרק בעיוור מהפרקים הזמינים
- **בחירה ידנית**: רשימה נפתחת (Select) לבחירה דיוקית
- **תצוגה מוגדלת**: כאשר נבחר פרק, מוצגת תצוגה מיוחדת עם הפרק בגדול
- **אישור או ניסיון חדש**: כפתורים להאישור או הגרלה חדשה

### 3. ניהול פרקים פעילים (Active Chapters)
- רשימת כל הפרקים בקריאה כרגע
- כפתור "צפייה" לקריאת הפרק (מוכן להרחבה עתידית)
- כפתור "סיימתי" להסרת הפרק מרשימת הקריאה ותוספתו לפרקים שנקראו

### 4. גיהול שגיאות
- Alert אדום בעת חוסר פרקים זמינים
- ניהול מצבי טעינה

## 🎨 עיצוב

### צבעים
- **כתום (Primary)**: #FF8C42 - רמזים ודגשים
- **צהוב (Accent)**: #FFD700, #FFF9E6 - רקע לטיפול בפרקים
- **ירוק (Success)**: #4CAF50 - כפתורי אישור
- **כחול (Info)**: #2196F3 - כפתורים משניים

### עיצוב ויזואלי
- Border Radius גבוה (12px - 24px) - מראה מודרני
- Gradients נעימות - Pastel colors
- Shadows עדינים - עומק וממד
- Responsive Design - עבודה בכל גודל מסך

## 🚀 הפעלה

### התקנה
```bash
npm install
```

### Development Server
```bash
npm run dev
```
השרת יהיה זמין ב: `http://localhost:5173`

### Build للإنتاج
```bash
npm run build
```

## 📦 State Management (MobX)

### PsalmsStore Class
```typescript
export class PsalmsStore {
  totalChapters = 150;           // סה"כ פרקים
  readChapters: number[] = [];   // פרקים שנקראו
  activeChapters: ActiveChapter[] = [];  // פרקים בקריאה
  completedCycles = 0;           // סבבים מושלמים
  selectedChapter: number | null = null; // פרק נבחר
  error: string | null = null;   // הודעת שגיאה
  isLoading = false;             // מצב טעינה
}
```

### Methods
- `drawRandomChapter()`: בחירת פרק רנדומלי
- `selectChapter(number)`: בחירה ידנית של פרק
- `confirmSelectedChapter()`: הוספת פרק לרשימה הפעילה
- `completeChapter(id)`: סימון פרק כהושלם
- `clearError()`: ניקוי הודעות שגיאה

## 🏆 עקרונות קוד

### Functional Components Only
כל רכיב הוא functional component עם observer מ-MobX.

### Props with TypeScript
כל ה-Props מוגדרים עם TypeScript interfaces.

### Material UI Components
- **Stack** - Layout מרכזי בכל המקומות
- **Box** - Container גנרי
- **Button** - כפתורים סטנדרטיים
- **Paper** - כרטיסים וקופסאות
- **Typography** - טקסט עם סטיילינג
- **Select** - בחירה בחלונות קפצים
- **Alert** - הודעות מצב

### Styling with sx Prop
כל העיצוב נעשה דרך sx prop של MUI - ללא CSS עבור flex display.

## 📝 Notes

- אין הערות בקוד - הקוד עצמו הוא ברור
- כל השמות משתנים ברורים ותיאוריים
- State updates מתבצעים בלבד דרך ה-Store
- No try/catch - השתמשנו ב-.then() ו-.catch() לAPI calls (שהם מדומים כרגע)

## 🔄 Workflow

1. בחירת פרק (אוטומטית או ידנית)
2. אישור הפרק ותוספתו לרשימה הפעילה
3. הצגת הפרק ברשימת הפרקים בקריאה
4. סימון כהושלם ותוספתו לפרקים שנקראו
5. כאשר מגיעים ל-150 פרקים, מתחיל סבב חדש

---

✨ אפליקציה מקצועית וקלינית לקריאה שיתופית
