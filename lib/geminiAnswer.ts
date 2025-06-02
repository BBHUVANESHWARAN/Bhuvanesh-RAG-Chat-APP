import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string, {
  apiEndpoint: 'https://generativelanguage.googleapis.com/v1',
});

export async function getAnswer(question: string, contextChunks: string[]): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const context = contextChunks.join('\n\n');

  const prompt = `
You are a helpful assistant. Use the context below to answer the question accurately.

Context:
${context}

Question:
${question}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
