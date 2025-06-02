import clientPromise from '../../lib/mongo';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('ragchat');
    const collection = db.collection('chats');

    const chats = await collection.find({}).sort({ timestamp: -1 }).toArray();
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error('Fetch Chat History Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
