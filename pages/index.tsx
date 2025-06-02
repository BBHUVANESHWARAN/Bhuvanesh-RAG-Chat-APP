import React, { useState } from 'react';
import URLInput from '../components/URLInput';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
  const [urls, setUrls] = useState<string[]>([]);
  const [scrapedData, setScrapedData] = useState<any[]>([]);
  const [isScraped, setIsScraped] = useState(false);

  const [query, setQuery] = useState('');
  const [retrievedResults, setRetrievedResults] = useState<any[]>([]);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleScrapeAndEmbed = async () => {
    if (urls.length === 0) {
      alert('Please add at least one URL');
      return;
    }

    try {
      const scrapeRes = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls }),
      });

      const scrapeData = await scrapeRes.json();

      if (!scrapeData.success) {
        alert('❌ Scraping failed');
        return;
      }

      setScrapedData(scrapeData.scraped);
      setIsScraped(true);

      const embedRes = await fetch('/api/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: scrapeData.scraped }),
      });

      const embedData = await embedRes.json();

      if (!embedData.success) {
        alert('❌ Embedding failed');
        return;
      }

      alert('✅ Scraping and Embedding completed successfully!');
    } catch (error) {
      console.error('Scrape + Embed Error:', error);
      alert('Something went wrong.');
    }
  };

  const handleQuery = async () => {
    if (!query.trim()) {
      alert('Please enter a question');
      return;
    }

    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: query }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert('Query failed');
      return;
    }

    setRetrievedResults(data.results || []);
    setFinalAnswer('');
  };

  const handleGenerateAnswer = async () => {
    const res = await fetch('/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: query,
        results: retrievedResults,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert('Answer generation failed');
      return;
    }

    const newEntry = {
      question: query,
      answer: data.answer,
      sources: retrievedResults.map((r) => ({
        url: r.url,
        preview: r.text.slice(0, 300),
        certainty: r._additional.certainty,
      })),
    };

    setFinalAnswer(data.answer);
    setChatHistory((prev) => [...prev, newEntry]);

    // Save to DB
    await fetch('/api/saveChat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userQuery: query, answer: data.answer }),
    });
  };

  const handleShowHistory = async () => {
    try {
      const res = await fetch('/api/chatHistory');
      const data = await res.json();
      setChatHistory(data.chats);
      setShowHistory(true);
    } catch (error) {
      console.error('Fetch History Error:', error);
    }
  };

  return (
    <main className="p-6 font-sans max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 RAG Chat App</h1>

      <URLInput urls={urls} setUrls={setUrls} onScrape={handleScrapeAndEmbed} />
      {isScraped && <ChatWindow scrapedData={scrapedData} />}

      <h3 className="mt-8 text-lg font-semibold">🧠 Ask a Question</h3>
      <div className="flex mt-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. What is artificial intelligence?"
          className="flex-grow p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleQuery}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {retrievedResults.length > 0 && (
        <>
          <h4 className="font-semibold text-md mb-2">🔎 Top Matches:</h4>
          <ul className="space-y-3">
            {retrievedResults.map((doc, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded shadow-sm">
                <b className="text-blue-700">{doc.url}</b>
                <p className="text-sm mt-1">{doc.text.slice(0, 300)}...</p>
                <p className="text-xs text-gray-500 mt-1">
                  Certainty: {doc._additional.certainty.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <button
            onClick={handleGenerateAnswer}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ✨ Generate Final Answer
          </button>

          {finalAnswer && (
            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-black rounded">
              <h4 className="font-bold mb-2">💡 Answer from Gemini:</h4>
              <p>{finalAnswer}</p>
            </div>
          )}
        </>
      )}

      <button
        onClick={handleShowHistory}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        📖 Show Chat History
      </button>

      {showHistory && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">📜 Chat History</h2>
          <ul className="space-y-2">
            {chatHistory.map((chat, i) => (
              <li key={i} className="border rounded p-3 bg-white shadow">
                <p className="text-sm text-gray-600">
                  🕒 {new Date(chat.timestamp).toLocaleString()}
                </p>
                <p><strong>🧑 Q:</strong> {chat.userQuery}</p>
                <p><strong>🤖 A:</strong> {chat.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
