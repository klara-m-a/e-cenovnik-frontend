import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const AdminDashboard = () => {
  const markets = [
    { name: "Raznopromet" },
    { name: "Market2", locations: ["lokacija1", "lokacija2"] },
    { name: "Market3" }
  ];
  
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>Select a market to upload/update product files:</p>
      <ul>
        {markets.map((market, idx) => (
          <li key={idx}>
            {market.locations ? (
              <>
                <span>{market.name}:</span>
                <ul>
                  {market.locations.map((loc, i) => (
                    <li key={i}>
                      <Link to={`/admin/upload/${market.name}/${loc}`}>
                        Upload for {market.name} - {loc}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link to={`/admin/upload/${market.name}`}>
                Upload for {market.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
