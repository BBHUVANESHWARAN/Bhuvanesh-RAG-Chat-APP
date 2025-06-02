import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API /scrape called');

  if (req.method !== 'POST') {
    console.log('Rejected non-POST request');
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { urls } = req.body;
  console.log('Received URLs:', urls);

  if (!Array.isArray(urls) || urls.length === 0) {
    console.log('No URLs provided or invalid format');
    return res.status(400).json({ error: 'No URLs provided' });
  }

  try {
    const results = [];
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    for (const url of urls) {
      console.log(`Scraping URL: ${url}`);

      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        httpsAgent,
      });

      const $ = cheerio.load(data);

      // Extract text only from paragraph tags to avoid HTML tags in content
      let pageText = '';
      $('p').each((_, elem) => {
        pageText += $(elem).text() + ' ';
      });
      pageText = pageText.replace(/\s+/g, ' ').trim();

      console.log(`Scraped text length for ${url}: ${pageText.length}`);

      results.push({
        url,
        content: pageText.slice(0, 3000), // Limit content length
      });
    }

    console.log('Scraping completed successfully');
    return res.status(200).json({ success: true, scraped: results });
  } catch (error: any) {
    console.error('Scrape error:', error.message || error);
    return res.status(500).json({ error: 'Failed to scrape URLs' });
  }
}
