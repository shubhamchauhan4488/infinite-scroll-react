const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchImages = async ({ query, page = 1, perPage = 16 }) => {
  const endpoint = query
    ? `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&page=${page}&per_page=15&client_id=${ACCESS_KEY}`
    : `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  return  {data: data.results ? data.results : data, total_pages: data?.total_pages || 0};
};
