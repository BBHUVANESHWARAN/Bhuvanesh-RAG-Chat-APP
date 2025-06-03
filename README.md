# 🔍 Bhuvanesh RAG Chat App

A full-stack AI-powered Retrieval-Augmented Generation (RAG) chat application that uses:

- 🧠 **Google Gemini API** for question answering
- 🌐 **Weaviate** for vector semantic search
- 📄 **MongoDB Atlas** for storing chat history with timestamps
- ⚡ **Next.js + TypeScript** frontend and API
- ☁️ **Deployed on Vercel**, connected via GitHub

---

## 🚀 Features

✅ Scrape content from public web URLs  
✅ Embed scraped text into Weaviate (via Gemini)  
✅ Ask natural language questions  
✅ Retrieve most relevant context using semantic search  
✅ Generate final answers using Gemini LLM  
✅ Store chat history to MongoDB Atlas with timestamps  
✅ Export chat history to JSON  
✅ Auto-deploy via GitHub → Vercel integration

---

## 🧠 Technologies

| Stack      | Tech                       |
|------------|----------------------------|
| Frontend   | React + Next.js + Tailwind |
| Backend    | Node.js (API Routes)       |
| Embedding  | Google Gemini API          |
| Vector DB  | Weaviate Cloud             |
| Chat DB    | MongoDB Atlas              |
| Hosting    | Vercel                     |

---

## 📦 Installation

```bash
git clone https://github.com/BBHUVANESHWARAN/Bhuvanesh-RAG-Chat-APP.git
cd Bhuvanesh-RAG-Chat-APP
npm install

**➕ Create .env.local**
'''
GEMINI_API_KEY=your_gemini_api_key
WEAVIATE_URL=https://your-weaviate-instance.weaviate.network
WEAVIATE_API_KEY=your_weaviate_api_key
MONGODB_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/ragchat
'''

**💻 Usage**
'''
npm run dev
'''

Pro
Then open: http://localhost:3000
Add one or more URLs
Click "Scrape & Embed"
Ask a question like: What is artificial intelligence?
Click “Generate Final Answer”
View or export full chat history

**📁 Project Structure**
'''
/components         → UI components (ChatWindow, URLInput)
/pages/api          → API routes for scrape, embed, query, answer, saveChat
/lib                → Helpers for Gemini, Mongo, Weaviate
/models             → TS types (optional)
/public             → Static assets
'''

**🌍 Live Demo**
🔗 https://bhuvanesh-rag-chat-app.vercel.app

**🙋‍♂️ Author**
Made with 💻 and ☕ by Bhuvaneshwaran


