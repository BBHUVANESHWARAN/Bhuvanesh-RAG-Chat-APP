// pages/api/query.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/weaviateClient';
import { getEmbedding } from '../../lib/geminiEmbed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API /query called');

  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Invalid question' });
  }

  try {
    const vector = await getEmbedding(question);

    const result = await client.graphql
      .get()
      .withClassName('WebDoc')
      .withFields('url text _additional { certainty distance }')
      .withNearVector({ vector, certainty: 0.7 })
      .withLimit(3)
      .do();

    const docs = result.data.Get.WebDoc;
    console.log(`🔍 Retrieved ${docs.length} docs for query: ${question}`);
    res.status(200).json({ results: docs });
  } catch (err) {
    console.error('❌ Query error:', err);
    res.status(500).json({ error: 'Query failed' });
  }
}
