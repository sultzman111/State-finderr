import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './Component.jsx/Nav';
import Footer from './Component.jsx/Footer'; 
import Abt from './Component.jsx/Abt';
import Home from './Pages/Home';
import Service from './Pages/Service';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Fav from './Pages/Fav';   
import Cart from './Pages/Cart'; 
import PaymentPage from './Pages/PaymentPage'; // Import your new isolated payment component

// A small internal helper component to handle the clean redirect action via React Router hooks
const CartWithNavigation = ({ cartItems, onRemoveFromCart, onClearCart, setCheckoutTotal }) => {
  const navigate = useNavigate();
  
  return (
    <Cart 
      cartItems={cartItems} 
      onRemoveFromCart={onRemoveFromCart} 
      onClearCart={onClearCart} 
      onNavigateToPayment={(totalAmount) => {
        setCheckoutTotal(totalAmount); // Pass calculated sum up to app state
        navigate('/payment');         // Push user to the isolated payment page
      }}
    />
  );
};

// MODIFIED REMOVED AUTOMATIC HOME NAVIGATION FORCING
const PaymentPageWithNavigation = ({ totalAmount, itemCount, onClearCart }) => {
  return (
    <PaymentPage 
      totalAmount={totalAmount}
      itemCount={itemCount}
      onPaymentComplete={() => {
        onClearCart();  // Clears items out of state and local storage safely
        // The automatic navigate('/') line was deleted here so you remain on this screen!
      }}
    />
  );
};

function App() {
  // Load user data from localStorage if it exists
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('activeUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persistent Cart state initialization
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persistent Favorites state initialization
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('favoriteItems');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  
  // Temporary bridge state to move the sum string from Cart to PaymentPage safely
  const [checkoutTotal, setCheckoutTotal] = useState('$0');

  // Sync Cart changes to local storage instantly
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  // Sync Favorites changes to local storage instantly
  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favorites));
  }, [favorites]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('activeUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('activeUser');
    localStorage.removeItem('cartItems');     
    localStorage.removeItem('favoriteItems'); 
    setCart([]);
    setFavorites([]);
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      if (prevCart.find((cartItem) => cartItem.id === item.id)) return prevCart;
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Hard reset cart state and wipe clear local storage instantly
  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cartItems', JSON.stringify([])); 
  };

  const toggleFavorite = (item) => {
    setFavorites((prevFavs) => {
      const exists = prevFavs.some((favItem) => favItem.id === item.id);
      if (exists) {
        return prevFavs.filter((favItem) => favItem.id !== item.id);
      } else {
        return [...prevFavs, item];
      }
    });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-white">
        <div>
          <Nav 
            user={user} 
            onLogout={handleLogout} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cartCount={cart.length}
            favoriteCount={favorites.length}
          />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/services" 
              element={
                <Service 
                  searchQuery={searchQuery} 
                  cartItems={cart}
                  favoriteItems={favorites}
                  onAddToCart={addToCart} 
                  onRemoveFromCart={removeFromCart} 
                  onToggleFavorite={toggleFavorite}
                />
              } 
            />
            
            {/* FAVORITES ROUTE */}
            <Route 
              path="/favorites" 
              element={
                <Fav 
                  favoriteItems={favorites} 
                  onToggleFavorite={toggleFavorite} 
                  onAddToCart={addToCart} 
                />
              } 
            />
            
            {/* UPDATED CART ROUTE WITH PAY ROUTING TRIGGER */}
            <Route 
              path="/cart" 
              element={
                <CartWithNavigation 
                  cartItems={cart} 
                  onRemoveFromCart={removeFromCart} 
                  onClearCart={clearCart} 
                  setCheckoutTotal={setCheckoutTotal}
                />
              } 
            />

            {/* NEW ENTIRELY ISOLATED PAYMENT PAGE ROUTE */}
            <Route 
              path="/payment" 
              element={
                <PaymentPageWithNavigation 
                  totalAmount={checkoutTotal}
                  itemCount={cart.length}
                  onClearCart={clearCart}
                />
              } 
            />
            
            <Route path="/about" element={<Abt />} />
            <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;