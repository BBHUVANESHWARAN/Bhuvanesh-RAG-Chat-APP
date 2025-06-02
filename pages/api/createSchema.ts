import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/weaviateClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.schema.classCreator().withClass({
      class: 'WebDoc',
      description: 'Stores website content with embeddings',
      vectorizer: 'none',
      properties: [
        { name: 'url', dataType: ['text'] },
        { name: 'text', dataType: ['text'] },
      ],
    }).do();
    res.status(200).json({ message: 'Weaviate schema created' });
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Schema creation error' });
  }
}
