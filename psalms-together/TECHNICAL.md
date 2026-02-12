# Technical Documentation - תהילים ביחד

## Architecture Overview

### State Management Pattern (MobX Class-based)

The application uses **MobX** with a single `PsalmsStore` class that manages all state. This pattern ensures:
- All state mutations happen in one place
- Reactive updates across all components
- Type-safe state management with TypeScript

### Data Flow

```
User Interaction → Component Handler → Store Method → State Update → Component Re-render
```

### PsalmsStore Structure

```typescript
class PsalmsStore {
  // State Properties
  totalChapters: number          // Fixed at 150
  readChapters: number[]         // Completed chapter numbers
  activeChapters: ActiveChapter[] // Currently reading chapters
  completedCycles: number        // Full 150-chapter cycles completed
  selectedChapter: number | null  // Currently selected chapter
  error: string | null           // Error messages
  isLoading: boolean             // Loading state for async operations

  // Computed Properties (getters)
  get unreadChapters(): number    // Chapters not yet read
  get readCount(): number         // Total chapters read
  get activeChaptersCount(): number // Active reading count

  // Action Methods
  drawRandomChapter(): void       // Selects random available chapter
  selectChapter(num): void        // Manually select chapter
  confirmSelectedChapter(): void  // Add selected to active list
  completeChapter(id): void       // Mark as complete
  clearError(): void              // Reset error state
  drawNewChapter(): void          // Clear selection
}
```

## Component Architecture

### Component Hierarchy

```
App
├── Header
├── Stats (observer)
│   └── StatCard (4 instances)
├── DrawingZone (observer)
└── ActiveChapters (observer)
```

### Component Responsibilities

#### Header
- Display app title and subtitle
- Pastel gradient styling
- Simple presentational component

#### Stats
- Displays 4 stat cards in responsive grid
- Observes: readCount, unreadChapters, activeChaptersCount, completedCycles
- Uses CSS Grid for layout (not flex)

#### StatCard
- Reusable stat display component
- Props: icon, title, value, backgroundColor, accentColor
- Hover animation effect

#### DrawingZone
- Main interaction area
- Two views:
  1. Selection state: Shows draw button and select dropdown
  2. Drawn state: Shows large chapter number with action buttons
- Handles error display

#### ActiveChapters
- Lists all chapters currently being read
- Shows chapter number, status badge
- Action buttons: View (placeholder) and Complete
- Only renders if activeChapters.length > 0

## Styling Strategy

### Material-UI (MUI) Integration

All styling uses MUI's `sx` prop to ensure:
- Type-safe CSS-in-JS
- Theme consistency
- Responsive design support
- No direct CSS classes

### Color Scheme

**Pastel Colors (Soft, Professional)**
- Primary Orange: `#FF8C42`
- Accent Yellow: `#FFD700`
- Success Green: `#4CAF50`
- Info Blue: `#2196F3`
- Light Background: `#FAFAFA`

### Design System

- **Border Radius**: 12px - 24px (modern, soft corners)
- **Shadows**: Subtle (0 2px 8px to 0 8px 24px)
- **Gradients**: Linear pastel blends
- **Spacing**: 16px, 20px, 24px, 32px (8px scale)

## API Integration Pattern

While currently using mock data, the store is prepared for real API calls:

```typescript
// Pattern used in drawRandomChapter():
// 1. Set isLoading = true
// 2. setTimeout (simulating API delay)
// 3. Update state
// 4. Set isLoading = false
// 5. Handle errors with error state property

// When ready for real APIs:
// - Replace setTimeout with actual API calls
// - Use .then() and .catch() (not try/catch initially)
// - Update PsalmsStore methods accordingly
```

## Component Observers

All components that read from the store are wrapped with `observer()` from `mobx-react-lite`:

```typescript
export const Stats = observer(function Stats({ store }: StatsProps) {
  // Component automatically re-renders when:
  // - store.readCount changes
  // - store.unreadChapters changes
  // - store.activeChaptersCount changes
  // - store.completedCycles changes
});
```

## TypeScript Interfaces

### ActiveChapter
```typescript
interface ActiveChapter {
  id: string;              // Unique identifier
  number: number;          // Chapter number (1-150)
  status: 'reading' | 'completed'; // Current status
  createdAt: Date;         // Creation timestamp
}
```

### Component Props
All component props are fully typed:
- `HeaderProps`
- `StatCardProps`
- `StatsProps`
- `DrawingZoneProps`
- `ActiveChaptersProps`

## Performance Considerations

1. **Observer Pattern**: Only components reading from affected store properties re-render
2. **No Unnecessary Renders**: Using React.memo and functional components
3. **Event Handlers**: All bound directly without memory overhead
4. **List Keys**: Using unique `chapter.id` for ActiveChapters list

## Browser Compatibility

- Modern browsers supporting ES2020+
- React 19.2.0
- No polyfills required

## Responsive Design

Using MUI's `useMediaQuery` hook when needed:
- Mobile: Single column grid
- Tablet: 2-column grid
- Desktop: 4-column grid for stats

## Code Quality

### No Comments
- Code clarity achieved through:
  - Descriptive variable names
  - Clear function purposes
  - Obvious component structure

### TypeScript
- Full type coverage
- No `any` types
- Strict mode enabled

### Clean Architecture
- Single Responsibility Principle
- Separation of concerns (Store vs Components)
- DRY principles applied

## Build & Deployment

### Development
```bash
npm run dev      # Vite dev server at localhost:5173
npm run build    # Production build
```

### Output
- HTML: dist/index.html
- CSS: dist/assets/*.css
- JS: dist/assets/*.js

## Future Enhancements

1. **Backend Integration**
   - User authentication
   - Cloud storage for reading progress
   - Sharing functionality

2. **Features**
   - Chapter preview/content display
   - Reading history and analytics
   - User preferences/settings
   - Notifications

3. **Performance**
   - Virtual scrolling for large lists
   - Code splitting by route
   - Image optimization

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

---

Built with professional React patterns and best practices ✨
