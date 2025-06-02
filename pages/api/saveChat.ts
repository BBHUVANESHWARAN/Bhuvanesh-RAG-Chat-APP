import clientPromise from '../../lib/mongo';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const client = await clientPromise;
    const db = client.db('ragchat');
    const collection = db.collection('chats');

    const { userQuery, answer } = req.body;
    const timestamp = new Date();

    await collection.insertOne({ userQuery, answer, timestamp });

    res.status(200).json({ success: true, message: 'Chat saved.' });
  } catch (error) {
    console.error('Save Chat Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
