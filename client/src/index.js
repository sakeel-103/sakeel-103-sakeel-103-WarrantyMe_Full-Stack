import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-zkw25fcb4mi7wrdl.us.auth0.com"
      clientId="ffUa28S6M3PZjoahpRy8TBlXGmr9NNip"
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_API_URL || 'http://localhost:5000'}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();