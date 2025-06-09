import React, { useEffect, useState } from 'react';
import InvestorCard from './InvestorCard';
import api from '../../services/api';

const InvestorList = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await api.get('/investors');
        setInvestors(response.data);
      } catch (error) {
        setInvestors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestors();
  }, []);

  if (loading) return <div>Loading investors...</div>;

  return (
    <div className="investor-list">
      {investors.map((inv) => (
        <InvestorCard key={inv._id} investor={inv} />
      ))}
    </div>
  );
};

export default InvestorList;