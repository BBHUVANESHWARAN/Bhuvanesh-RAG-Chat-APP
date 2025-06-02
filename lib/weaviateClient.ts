import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'https',
  host: process.env.WEAVIATE_URL,  // Your cloud endpoint, e.g. 'hghbn6voqpm33zgp0f1fww.c0.asia-southeast1.gcp.weaviate.cloud'
  apiKey: process.env.WEAVIATE_API_KEY
    ? new weaviate.ApiKey(process.env.WEAVIATE_API_KEY)
    : undefined,
});

export default client;
