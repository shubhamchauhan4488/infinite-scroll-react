import axios from 'axios';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';

export const fetchImages = async ({ query = '', page = 1, perPage = 16 }) => {
  const endpoint = query ? `${BASE_URL}/search/photos` : `${BASE_URL}/photos`;

  try {
    const response = await axios.get(endpoint, {
      params: {
        query: query || undefined,
        page,
        per_page: perPage,
        client_id: ACCESS_KEY,
      },
    });

    const data = response.data;
    return {
      data: data.results ? data.results : data,
      total_pages: data.total_pages || 0,
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images. Please try again later.');
  }
};