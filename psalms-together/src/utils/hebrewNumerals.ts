const ONES: Record<number, string> = { 1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה', 6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט' };
const TENS: Record<number, string> = { 10: 'י', 20: 'כ', 30: 'ל', 40: 'מ', 50: 'נ', 60: 'ס', 70: 'ע', 80: 'פ', 90: 'צ' };
const HUNDREDS: Record<number, string> = { 100: 'ק' };

function numberToHebrew(num: number): string {
  if (num === 0) return '0';
  let remaining = num;
  let result = '';

  if (remaining >= 100) {
    const hundreds = Math.floor(remaining / 100) * 100;
    if (hundreds >= 100) {
      result += HUNDREDS[100] || '';
      remaining -= 100;
    }
  }

  if (remaining === 15) return result + 'טו';
  if (remaining === 16) return result + 'טז';

  if (remaining >= 10) {
    const tens = Math.floor(remaining / 10) * 10;
    if (tens) {
      result += TENS[tens] || '';
      remaining = remaining % 10;
    }
  }

  if (remaining > 0) {
    result += ONES[remaining] || '';
  }

  return result;
}

export function formatHebrewNumeral(num: number): string {
  const letters = numberToHebrew(num);
  if (!letters) return num.toString();
  if (letters.length === 1) return letters + '׳';
  return letters.slice(0, -1) + '"' + letters.slice(-1);
}
