import React, { useState, useEffect } from 'react';
import { fetchImages } from './services/unsplashService';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import SearchBar from './components/SearchBar/SearchBar';
import Layout from './components/Layout/Layout';
import ImageGrid from './components/ImageGrid/ImageGrid';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadImages = async () => {
    setLoading(true);
    try {
      const { data, total_pages } = await fetchImages({ query, page });
      // Determine if more images are available.
      if (query) {
        setHasMore(page < total_pages);
      } else {
        setHasMore(data.length > 0);
      }
      setImages((prevImages) => (page === 1 ? data : [...prevImages, ...data]));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load images when the query or page changes.
  useEffect(() => {
    loadImages();
  }, [query, page]);

  const onSearchClick = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
    setPage(1);
    setImages([]);
    setHasMore(true);
  };

  const lastElementRef = useInfiniteScroll(loading, hasMore, () => {
    setPage((prevPage) => {
      console.log('useInfiniteScroll: prevPage', prevPage);
      return prevPage + 1;
    })
  });

  return (
    <Layout>
     <SearchBar onSearch={onSearchClick} />
     <ImageGrid images={images} loading={loading} lastElementRef={lastElementRef} />
      {loading && <>Loading...</>}
    </Layout>
  );
};

export default App;
