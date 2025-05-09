import { writeFileSync } from 'fs';
import { fetchOzonReviews } from '../scrapers/ozon';

async function run() {
  const productId = '162089093'; // замените на реальный ID товара
  const reviews = await fetchOzonReviews(productId);
  console.log(`Получено отзывов: ${reviews.length}`);
  writeFileSync(`../data/ozon-reviews-${productId}.json`, JSON.stringify(reviews, null, 2));
}

run().catch(console.error);
