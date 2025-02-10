import React, { useState, useEffect } from 'react';
import { fetchImages } from './services/unsplashService';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadImages = async () => {
    setLoading(true);
    try {
      const { data } = await fetchImages({ query, page });

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

  const nextHandler = () => { setPage(page + 1); };

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
          <div key={index}>
            <img
              src={image.urls.small}
              alt={image.alt_description || 'Unsplash Image'}
            />
          </div>
        ))}
      <button onClick={nextHandler}>Next</button>
      {loading && <>Loading...</>}
    </>
  );
};

export default App;
