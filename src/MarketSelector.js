import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const MarketSelector = () => {
  // Static list of 3 markets
  const allMarkets = [
    { name: "Raznopromet" },
    { name: "Market2", locations: ["lokacija1", "lokacija2"] },
    { name: "Market3" }
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredMarkets = allMarkets.filter(market =>
    market.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Markets</h2>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Search markets..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <ul>
        {filteredMarkets.map((market, idx) => (
          <li key={idx}>
            <Link to={`/market/${market.name}`}>{market.name}</Link>
            {market.locations && market.locations.length > 0 && (
              <ul>
                {market.locations.map((loc, i) => (
                  <li key={i}>
                    <Link to={`/market/${market.name}/${loc}`}>{loc}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketSelector;
