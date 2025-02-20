import React, { useState, useCallback, useEffect, lazy } from 'react';
import Layout from './components/Layout/Layout';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchImages } from './services/unsplashService';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import { ThreeDots } from 'react-loader-spinner';

const ImageGrid = lazy(() => import('./components/ImageGrid/ImageGrid'));

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const { data, total_pages } = await fetchImages({ query, page });

      setImages((prevImages) => (page === 1 ? data : [...prevImages, ...data]));

      if (query) {
        setHasMore(page < total_pages);
      } else {
        setHasMore(data.length > 0);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    loadImages();
  }, [query, page]);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setPage(1);
    setImages([]);
    setHasMore(true);
  };

  // Attach a ref to the last element using our custom infinite scroll hook.
  const lastElementRef = useInfiniteScroll(loading, hasMore, () => {
    setPage((prevPage) => {
      // console.log('useInfiniteScroll: prevPage', prevPage);
      return prevPage + 1;
    })
  });

  return (
    <Layout>
      <SearchBar onSearch={handleSearch} />
      <ImageGrid images={images} loading={loading} lastElementRef={lastElementRef} />
      <ThreeDots
        visible={loading}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </Layout>
  );
};

export default App;
