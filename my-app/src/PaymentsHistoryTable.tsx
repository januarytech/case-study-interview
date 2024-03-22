import React, { useEffect, useState } from 'react';

interface PaymentHistoryTableProps {
  accountId: string;
}

interface PaymentRecord {
  date: string;
  description: string;
  amount: number;
  balance: number;
}

const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({ accountId }) => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);

  const fetchHistory = async (accountId: string): Promise<void> => {
    try {
      const response = await fetch(`https://api.apg.com/creditcards/${accountId}/transactions`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const history: PaymentRecord[] = await response.json();
      setPaymentHistory(history);
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchHistory(accountId)
  }, [accountId]);

  return (
    <div>
      <h3>Payment History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.description}</td>
              <td>${record.amount}</td>
              <td>${record.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
