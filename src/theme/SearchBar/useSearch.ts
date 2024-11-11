import { useState, useCallback, useEffect } from 'react';
import { useOrama } from './useOrama';
import { SearchResult } from './SearchResults';
import debounce from 'lodash/debounce';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const { searchBoxConfig } = useOrama();

  const search = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchBoxConfig?.search || !searchQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        const searchResults = await searchBoxConfig.search(searchQuery);
        const formattedResults = searchResults.hits.map((hit: any) => ({
          id: hit.id,
          title: hit.document.title,
          content: hit.document.content,
          url: hit.document.url,
          category: hit.document.category,
          version: hit.document.version,
        }));
        setResults(formattedResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      }
    }, 300),
    [searchBoxConfig]
  );

  useEffect(() => {
    search(query);
  }, [query, search]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && results[activeIndex]) {
            window.location.href = results[activeIndex].url;
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    },
    [isOpen, results, activeIndex]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    query,
    setQuery,
    results,
    activeIndex,
    setActiveIndex,
    isOpen,
    setIsOpen,
  };
}
