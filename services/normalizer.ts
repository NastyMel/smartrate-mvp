import { RawReview } from '../scrapers/ozon';

export interface NormalizedReview {
  id: string;
  text: string;
  rating: number;
  date: string;              // ISO-строка
  author: string;
  authorTrustScore: number;  // 0–1, чем выше — тем надёжнее отзыв
}

export function normalizeReviews(raw: RawReview[]): NormalizedReview[] {
  const seen = new Set<string>();
  return raw
    .filter(r => r.text.trim().length > 5 && r.rating > 0)
    .filter(r => {
      const hash = `${r.text.slice(0,50)}|${r.author}`;
      if (seen.has(hash)) return false;
      seen.add(hash);
      return true;
    })
    .map(r => {
      const lengthScore = Math.min(r.text.length / 200, 1);
      const punctScore = Math.min((r.text.match(/[.,!?]/g)?.length ?? 0) / 5, 1);
      const authorTrustScore = Math.round((0.6 * lengthScore + 0.4 * punctScore) * 100) / 100;
      return {
        id: r.id,
        text: r.text.trim(),
        rating: r.rating,
        date: new Date(r.date).toISOString(),
        author: r.author,
        authorTrustScore,
      };
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
