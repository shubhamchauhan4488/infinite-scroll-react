import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchClick = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
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
  );
};

export default SearchBar;
