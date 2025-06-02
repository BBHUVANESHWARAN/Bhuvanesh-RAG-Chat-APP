import React, { useState } from 'react';

type Props = {
  urls: string[];
  setUrls: (urls: string[]) => void;
  onScrape: () => void;
};

export default function URLInput({ urls, setUrls, onScrape }: Props) {
  const [url, setUrl] = useState('');

  const addUrl = () => {
    if (url.trim()) {
      setUrls([...urls, url.trim()]);
      setUrl('');
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="border px-3 py-2 rounded w-full md:w-80 mr-2"
      />
      <button
        onClick={addUrl}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0 md:ml-2"
      >
        ➕ Add
      </button>

      <ul className="mt-3 text-sm list-disc pl-5">
        {urls.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>

      <button
        onClick={onScrape}
        className="mt-4 bg-green-600 text-white px-5 py-2 rounded"
      >
        🧹 Scrape & Embed
      </button>
    </div>
  );
}
