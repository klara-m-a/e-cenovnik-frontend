import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import MarketSelector from './MarketSelector';
import ProductList from './ProductList';
import FileUpload from './FileUpload';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import './App.css';

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>e-cenovnik.mk</h1>
          <nav>
            <Link to="/">Home</Link> |{" "}
            {adminLoggedIn ? (
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            ) : (
              <Link to="/admin/login">Admin Login</Link>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MarketSelector />} />
            <Route path="/market/:market" element={<ProductList />} />
            <Route path="/market/:market/:location" element={<ProductList />} />
            <Route path="/admin/login" element={<AdminLogin onLogin={() => setAdminLoggedIn(true)} />} />
            <Route path="/admin/dashboard" element={
              adminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" replace />
            } />
            <Route path="/admin/upload/:market" element={
              adminLoggedIn ? <FileUpload /> : <Navigate to="/admin/login" replace />
            } />
            <Route path="/admin/upload/:market/:location" element={
              adminLoggedIn ? <FileUpload /> : <Navigate to="/admin/login" replace />
            } />
          </Routes>
        </main>
        <footer>
          <p>&copy; {new Date().getFullYear()} e-cenovnik.mk</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
