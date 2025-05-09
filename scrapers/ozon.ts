// scrapers/ozon.ts
import { promises as fs } from 'fs';
import path from 'path';

export interface RawReview {
  id: string;
  text: string;
  rating: number;
  date: string;
  author: string;
}

/**
 * Временно возвращает локальный JSON-файл отзывов для MVP.
 */
export async function fetchOzonReviews(
  productSlug: string,
  ruuid?: string
): Promise<RawReview[]> {
  const filePath = path.resolve(process.cwd(), 'data', 'ozon-sample.json');
  const content = await fs.readFile(filePath, 'utf-8');
  const reviews = JSON.parse(content) as RawReview[];
  return reviews;
}
