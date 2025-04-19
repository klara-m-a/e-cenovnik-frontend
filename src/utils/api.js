// Base API URL - changes based on environment
let API_BASE = '';

// Check if we're in production or development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Local development
  API_BASE = 'http://localhost:8080';
} else if (window.location.hostname === 'test.e-cenovnik.mk') {
  // Test environment
  API_BASE = 'https://test.e-cenovnik.mk/api';
} else if (window.location.hostname === 'e-cenovnik.mk') {
  // Production environment
  API_BASE = 'https://e-cenovnik.mk/api';
}

export { API_BASE };