import React, { useState, FormEvent } from 'react';
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
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const submitForm = async (): Promise<void> => {
    try {
      const response = await fetch('https://api.afg.com/cardholders/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, cardNumber }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const results: SearchResult[] = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <SearchResultsTable results={searchResults} />
    </div>
  );
}

export default SearchPage;
