// lib/geminiEmbed.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function getEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'embedding-001' }); // or 'embed-gecko'

  const result = await model.embedContent({
    content: {
      role: 'user',
      parts: [{ text }],
    },
    taskType: 'RETRIEVAL_DOCUMENT', // or 'RETRIEVAL_QUERY' if querying
  });

  return result.embedding.values;
}
