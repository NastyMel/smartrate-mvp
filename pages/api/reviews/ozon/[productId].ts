import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchOzonReviews } from '../../../../scrapers/ozon';
import { normalizeReviews } from '../../../../services/normalizer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId, ruuid } = req.query as {
    productId: string;
    ruuid?: string;
  };
  try {
    // Передаём ruuid во fetchOzonReviews, если он есть в запросе
    const raw = await fetchOzonReviews(productId, ruuid);
    const normalized = normalizeReviews(raw);
    res.status(200).json({ count: normalized.length, reviews: normalized });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Internal Error' });
  }
}
