import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Call createRoot once and store the root instance
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use the root instance to render your React application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
