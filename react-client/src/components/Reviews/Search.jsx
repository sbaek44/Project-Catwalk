import React, { useState, useEffect } from 'react';

const Search = ({ searchReviews, searchQuery, setSearchQuery }) => {
  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form>
      <span>
        <input onChange={updateSearchQuery} type="text" name="inputText" placeholder="search.." />
      </span>
    </form>
  );
};

export default Search;
