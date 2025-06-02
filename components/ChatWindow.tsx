import React from 'react';

export default function ChatWindow({ scrapedData }: { scrapedData: any[] }) {
  return (
    <div className="bg-gray-100 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">🧠 Scraped Content Preview</h2>
      <ul className="space-y-3 max-h-80 overflow-y-auto">
        {scrapedData.map((item, index) => (
          <li key={index} className="border-b pb-2">
            <strong className="block">{item.url}</strong>
            <p className="text-gray-700 text-sm">{item.content.slice(0, 300)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
