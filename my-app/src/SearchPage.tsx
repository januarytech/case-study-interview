import React, { useState, FormEvent, ChangeEvent } from 'react';
import SearchResultsTable from './SearchResultsTable';

export interface SearchResult {
  id: string;
  name: string;
  cardNumber: string;
  issuanceDate: string;
  currentBalance: number;
  nextPaymentDate: string;
  overdueBalance: number;
  daysOverdue: number;
}

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);


  const submitForm = async (): Promise<void> => {
    try {
      const response = await fetch('https://api.afg.com/account-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchQuery),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const results: SearchResult[] = await response.json();
      setSearchResults(results)
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error;
    }
  };


  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm()
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name, card number, or issuance date"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <SearchResultsTable results={searchResults} />
    </div>
  );
}

export default SearchPage;
