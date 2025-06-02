import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema({
  query: String,
  answer: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
