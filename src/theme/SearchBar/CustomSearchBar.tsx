import React, { useRef } from 'react';
import { useSearch } from './useSearch';
import { SearchResults, SearchResult } from './SearchResults';
import styles from './styles.module.css';

export function CustomSearchBar() {
  const {
    query,
    setQuery,
    results,
    activeIndex,
    setActiveIndex,
    isOpen,
    setIsOpen,
  } = useSearch();
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    // Delay closing to allow click events on results
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        ref={inputRef}
        type="search"
        placeholder="Search docs..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={styles.searchBox}
      />
      {isOpen && results.length > 0 && (
        <SearchResults
          results={results}
          activeIndex={activeIndex}
          onResultClick={handleResultClick}
          onResultHover={setActiveIndex}
        />
      )}
    </div>
  );
}
