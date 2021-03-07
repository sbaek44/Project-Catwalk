import React, { useState, useEffect } from 'react';

const Search = ({ searchReviews, searchQuery, setSearchQuery }) => {
  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-reviews" >
      <form>
        <span>
          <input onChange={updateSearchQuery} type="search" name="inputText" placeholder="search.." />
        </span>
      </form>
    </div>
  );
};

export default Search;
