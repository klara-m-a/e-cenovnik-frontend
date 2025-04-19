// LocationSelector.js
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './App.css';

const markets = [
  { name: "Разнопромет", locations: ["Кочани"] },
  { name: "ВенМаркет", locations: ["Центар", "Градски пазар", "Руенска"] }
];


const LocationSelector = () => {
  const { market } = useParams();
  const navigate = useNavigate();
  const selectedMarket = markets.find(m => m.name === market);

  if (!selectedMarket) {
    return <div className="container"><p>Market not found.</p></div>;
  }

  // If there is only one "default" location, automatically navigate to the product list.
  if (selectedMarket.locations.length === 1 && selectedMarket.locations[0] === "default") {
    navigate(`/cenovnik/${encodeURIComponent(market)}`);
    return null;
  }

  return (
    <div className="container">
      <h2>{market} – Select a Location</h2>
      <div className="location-buttons">
        {selectedMarket.locations.map((loc, idx) => (
          <Link key={idx} to={`/cenovnik/${encodeURIComponent(market)}/${encodeURIComponent(loc)}`}>
            <button>{loc}</button>
          </Link>
        ))}
      </div>
      <div>
        <Link to="/">Back to Markets</Link>
      </div>
    </div>
  );
};

export default LocationSelector;
