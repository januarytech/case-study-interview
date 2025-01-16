import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PaymentHistoryTable from './PaymentHistoryTable';

interface AccountDetailsProps {
  id: string;
}

interface AccountInfo {
  name: string;
  socialSecurityNumber: string;
  dateOfBirth: string;
  address: string;
  creditScore: number;
  email: string;
  phoneNumber: string;
  cardNumber: string;
}

interface AccountInfo {
  id: string;
  name: string;
  socialSecurityNumber: string;
  dateOfBirth: string;
  address: string;
  creditScore: number;
  email: string;
  phoneNumber: string;
  cardNumber: string;
}

interface PaymentRecord {
  date: string;
  description: string;
  amount: number;
  balance: number;
}

interface AccountDetails {
  accountInfo: AccountInfo;
  paymentHistory: PaymentRecord[];
}



const AccountDetails: React.FC = () => {
  const { id } = useParams<AccountDetailsProps>();
  const [accountInfo, setAccountInfo] = useState<AccountInfo>(null);

  useEffect(() => {
    fetchAccountDetails(id)
  }, [id]);


  const fetchAccountDetails = async (accountId: string): Promise<void> => {
    try {
      const response = await fetch(`https://api.apg.com/accounts/${accountId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const accountDetails: AccountDetails = await response.json();
      setAccountInfo(accountDetails);
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  return (
    <div>
      {accountInfo && (
        <div>
          <h2>Account Details</h2>
          <p>Name: {accountInfo.name}</p>
          <p>Social Security Number: {accountInfo.socialSecurityNumber}</p>
          <p>Date of Birth: {accountInfo.dateOfBirth}</p>
          <p>Address: {accountInfo.address}</p>
          <p>Credit Score: {accountInfo.creditScore}</p>
          <p>Email: {accountInfo.email}</p>
          <p>Phone Number: {accountInfo.phoneNumber}</p>
          <p>Card Number: {accountInfo.cardNumber}</p>
          <PaymentHistoryTable accountId={id} />
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
