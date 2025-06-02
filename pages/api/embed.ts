import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/weaviateClient';
import { getEmbedding } from '../../lib/geminiEmbed'; // Make sure this exists

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API /embed called');

  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { documents } = req.body;

  if (!Array.isArray(documents) || documents.length === 0) {
    console.log('No valid documents provided');
    return res.status(400).json({ error: 'Invalid documents' });
  }

  try {
    for (const doc of documents) {
      console.log(`Embedding and storing: ${doc.url}`);

      const vector = await getEmbedding(doc.content); // This calls Gemini
      await client.data
        .creator()
        .withClassName('WebDoc')
        .withProperties({ url: doc.url, text: doc.content })
        .withVector(vector)
        .do();

      console.log(`Stored in Weaviate: ${doc.url}`);
    }

    console.log('All documents embedded and stored successfully');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Embedding/store failed:', err);
    res.status(500).json({ error: 'Embedding/store failed' });
  }
}
