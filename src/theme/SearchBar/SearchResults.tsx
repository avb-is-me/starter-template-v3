import React from 'react';
import styles from './styles.module.css';
import { useHistory } from '@docusaurus/router';

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  category?: string;
  version?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  activeIndex: number;
  onResultClick: (result: SearchResult) => void;
  onResultHover: (index: number) => void;
}

export function SearchResults({ 
  results, 
  activeIndex, 
  onResultClick,
  onResultHover 
}: SearchResultsProps) {
  const history = useHistory();

  if (!results.length) {
    return null;
  }

  const handleClick = (result: SearchResult) => {
    onResultClick(result);
    history.push(result.url);
  };

  return (
    <div className={styles.searchResults}>
      {results.map((result, index) => (
        <div
          key={result.id}
          className={`${styles.searchResult} ${
            index === activeIndex ? styles.searchResultActive : ''
          }`}
          onClick={() => handleClick(result)}
          onMouseEnter={() => onResultHover(index)}
        >
          {result.category && (
            <span className={styles.searchResultCategory}>
              {result.category}
            </span>
          )}
          {result.version && (
            <span className={styles.searchResultCategory}>
              {result.version}
            </span>
          )}
          <div className={styles.searchResultTitle}>{result.title}</div>
          <div className={styles.searchResultText}>{result.content}</div>
        </div>
      ))}
    </div>
  );
}
