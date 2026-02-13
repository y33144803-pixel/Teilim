import { makeAutoObservable } from 'mobx';
import tehillim from '../../tehillim.json';

export interface TehillimChapter {
  number: number;
  hebrewNumber: string;
  name: string;
  verses: string[] | string;
}

interface ActiveChapter {
  id: string;
  number: number;
  status: 'reading' | 'completed';
  createdAt: Date;
}

export class PsalmsStore {
  chapters: TehillimChapter[] = [];
  totalChapters = 150;
  readChapters: number[] = [];
  activeChapters: ActiveChapter[] = [];
  completedCycles = 0;
  selectedChapter: number | null = null;
  error: string | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    // Load local Tehillim JSON
    try {
      this.chapters = Array.isArray(tehillim) ? (tehillim as TehillimChapter[]) : [];
      if (this.chapters.length > 0) {
        this.totalChapters = this.chapters.length;
      }
    } catch {
      this.error = 'לא ניתן לטעון את קובץ התהילים המקומי';
    }
  }

  get unreadChapters(): number {
    return this.totalChapters - this.readChapters.length;
  }

  get readCount(): number {
    return this.readChapters.length;
  }

  get activeChaptersCount(): number {
    return this.activeChapters.filter(ch => ch.status === 'reading').length;
  }

  get availableChapters(): number[] {
    return Array.from({ length: this.totalChapters }, (_, i) => i + 1).filter(
      num => !this.readChapters.includes(num) && !this.activeChapters.some(ch => ch.number === num && ch.status === 'reading')
    );
  }

  drawRandomChapter(): void {
    this.isLoading = true;
    this.error = null;
    this.selectedChapter = null;

    setTimeout(() => {
      const availableChapters = this.availableChapters;

      if (availableChapters.length === 0) {
        this.error = 'שגיאה בטעינת הפרק';
        this.isLoading = false;
        return;
      }

      this.selectedChapter = availableChapters[Math.floor(Math.random() * availableChapters.length)];
      this.isLoading = false;
    }, 800);
  }

  selectChapter(chapterNumber: number): void {
    this.selectedChapter = chapterNumber;
    this.error = null;
  }

  confirmSelectedChapter(): void {
    if (this.selectedChapter === null) return;

    const newChapter: ActiveChapter = {
      id: `${Date.now()}-${this.selectedChapter}`,
      number: this.selectedChapter,
      status: 'reading',
      createdAt: new Date(),
    };

    this.activeChapters.push(newChapter);
    this.selectedChapter = null;
  }

  completeChapter(chapterId: string): void {
    const chapter = this.activeChapters.find(ch => ch.id === chapterId);
    if (chapter) {
      chapter.status = 'completed';
      this.readChapters.push(chapter.number);

      if (this.readChapters.length === this.totalChapters) {
        this.completedCycles += 1;
        this.readChapters = [];
      }

      this.activeChapters = this.activeChapters.filter(ch => ch.id !== chapterId);
    }
  }

  selectChapterForReading(chapterId: string): void {
    const chapter = this.activeChapters.find(ch => ch.id === chapterId);
    if (chapter) {
      chapter.status = 'reading';
    }
  }

  clearError(): void {
    this.error = null;
  }

  drawNewChapter(): void {
    this.drawRandomChapter();
  }
}

export const psalmsStore = new PsalmsStore();
