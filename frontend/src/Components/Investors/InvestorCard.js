import React from 'react';

const InvestorCard = ({ investor }) => (
  <div className="investor-card">
    <img
      src={investor.avatar || '/default-avatar.png'}
      alt={investor.name}
      className="investor-avatar"
      style={{ width: 64, height: 64, borderRadius: '50%' }}
    />
    <h3>{investor.name}</h3>
    <p>{investor.bio}</p>
    <div>
      <span>Followers: {investor.followers?.length || 0}</span>
      <span style={{ marginLeft: 16 }}>Investments: {investor.investments?.length || 0}</span>
    </div>
    <button style={{ marginTop: 10 }}>Follow</button>
  </div>
);

export default InvestorCard;