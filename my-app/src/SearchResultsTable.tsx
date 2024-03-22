import React from 'react';
import { useHistory } from 'react-router-dom';
import { SearchResult } from "./SearchPage";


interface SearchResultsTableProps {
  results: SearchResult[];
}

function SearchResultsTable({ results }: SearchResultsTableProps) {
  const history = useHistory();

  const handleRowClick = (accountId: string) => {
    history.push(`/account-details/${accountId}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Card Number</th>
          <th>Date of Issuance</th>
          <th>Current Balance</th>
          <th>Next Payment Date</th>
          <th>Overdue Balance</th>
          <th>Days Overdue</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.id} onClick={() => handleRowClick(result.id)}>
            <td>{result.name}</td>
            <td>{result.cardNumber}</td>
            <td>{result.issuanceDate}</td>
            <td>{result.currentBalance}</td>
            <td>{result.nextPaymentDate}</td>
            <td>{result.overdueBalance}</td>
            <td>{result.daysOverdue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SearchResultsTable;
