import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

const ProductList = () => {
  const { market, location } = useParams();
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    let url = `http://localhost:5000/products?market=${encodeURIComponent(market)}`;
    if (location) {
      url += `&location=${encodeURIComponent(location)}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, [market, location]);

  return (
    <div className="container">
      <h2>Products for: {market}{location ? ` - ${location}` : ""}</h2>
      {products.length === 0 ? (
        <p>No products available for this {location ? "location" : "market"}.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Measure</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.measure}</td>
                <td>{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <Link to="/">Back to Markets</Link>
      </div>
    </div>
  );
};

export default ProductList;
