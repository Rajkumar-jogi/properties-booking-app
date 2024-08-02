import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Auth0Provider } from '@auth0/auth0-react';

import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

root.render(
  <Auth0Provider
    domain="dev-j13agl2pr14hxpom.us.auth0.com"
    clientId="2Y0US6iPhBnL6wX9kBfJ36p72mwRSkKk"
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <BrowserRouter>
      <CartProvider>
          <App />
      </CartProvider>  
    </BrowserRouter>
  </Auth0Provider>
)


