import React, { useState, useEffect } from 'react';
import { fetchImages } from './services/unsplashService';
import useInfiniteScroll from './hooks/useInfiniteScroll';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
    onSearch(searchTerm);
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
    <>
      <div>
        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" onClick={onSearchClick}>
          Search
        </button>
      </div>
      {images.length > 0 &&
        images.map((image, index) => (
          <div key={index} ref={index === images.length - 1 ? lastElementRef : null}>
            <img
              src={image.urls.small}
              alt={image.alt_description || 'Unsplash Image'}
            />
          </div>
        ))}
      {loading && <>Loading...</>}
    </>
  );
};

export default App;
