// pages/api/answer.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAnswer } from '../../lib/geminiAnswer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { question, results } = req.body;

  if (!question || !results || !Array.isArray(results)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const chunks = results.map((r) => r.text);
    const answer = await getAnswer(question, chunks);
    res.status(200).json({ answer });
  } catch (err) {
    console.error('Gemini RAG Answer Error:', err);
    res.status(500).json({ error: 'Answer generation failed' });
  }
}
