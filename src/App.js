import { Routes, Route,  useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Properties from './components/Properties';
import ViewOrders from './components/ViewOrders'
import CartList from './components/CartList';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';

import {Circles} from 'react-loader-spinner'

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  // This effect runs when the user tries to access a protected route and is not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && location.pathname !== '/') {
      loginWithRedirect({
        appState: { returnTo: location.pathname }
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location]);

  // Prevent the app from rendering until Auth0 has finished checking the authentication state
  if (isLoading) {
    return <div className='loading-container'>
      <Circles
        height="80"
        width="80"
        color="#6B66F3"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route 
          path='/properties' 
          element={isAuthenticated ? <Properties /> : null} 
        />
        <Route 
          path='/cartList' 
          element={isAuthenticated ? <CartList /> : null} 
        />
        <Route 
          path='/my-orders' 
          element={isAuthenticated ? <ViewOrders /> : null} 
        />
      </Routes>
    </div>
  );
}

export default App;
