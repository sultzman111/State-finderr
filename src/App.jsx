import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Nav from './Component.jsx/Nav';
import Footer from './Component.jsx/Footer'; 
import Abt from './Component.jsx/Abt';
import Home from './Pages/Home';
import Service from './Pages/Service';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Fav from './Pages/Fav';   
import Cart from './Pages/Cart'; 
import PaymentPage from './Pages/PaymentPage'; 

// A Guard wrapper that checks authentication. If signed out, captures intent state!
const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();

  if (!user) {
    // Redirect to signin, saving the exact page they attempted to look at in window history state
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

const CartWithNavigation = ({ cartItems, onRemoveFromCart, onClearCart, setCheckoutTotal }) => {
  const navigate = useNavigate();
  
  return (
    <Cart 
      cartItems={cartItems} 
      onRemoveFromCart={onRemoveFromCart} 
      onClearCart={onClearCart} 
      onNavigateToPayment={(totalAmount) => {
        setCheckoutTotal(totalAmount); 
        navigate('/payment');         
      }}
    />
  );
};

const PaymentPageWithNavigation = ({ totalAmount, itemCount, onClearCart }) => {
  return (
    <PaymentPage 
      totalAmount={totalAmount}
      itemCount={itemCount}
      onPaymentComplete={() => {
        onClearCart();  
      }}
    />
  );
};

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('activeUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('favoriteItems');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [checkoutTotal, setCheckoutTotal] = useState('₦0');

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

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

  // Safe checks: If user is missing, programmatically triggers alert or manual redirect fallback link inside components
  const addToCart = (item) => {
    setCart((prevCart) => {
      if (prevCart.find((cartItem) => cartItem.id === item.id)) return prevCart;
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

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
            {/* FIXED LINE BELOW: Passed the user prop into Home so it can toggle between "Get Started" and "More About Us" */}
            <Route path="/" element={<Home user={user} />} />
            
            <Route 
              path="/services" 
              element={
                <Service 
                  user={user} 
                  searchQuery={searchQuery} 
                  cartItems={cart}
                  favoriteItems={favorites}
                  onAddToCart={addToCart} 
                  onRemoveFromCart={removeFromCart} 
                  onToggleFavorite={toggleFavorite}
                />
              } 
            />
            
            {/* PROTECTED FAVORITES ROUTE */}
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute user={user}>
                  <Fav 
                    favoriteItems={favorites} 
                    onToggleFavorite={toggleFavorite} 
                    onAddToCart={addToCart}
                  />
                </ProtectedRoute>
              } 
            />
            
            {/* PROTECTED CART ROUTE */}
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute user={user}>
                  <CartWithNavigation 
                    cartItems={cart} 
                    onRemoveFromCart={removeFromCart} 
                    onClearCart={clearCart} 
                    setCheckoutTotal={setCheckoutTotal}
                  />
                </ProtectedRoute>
              } 
            />

            {/* PROTECTED PAYMENT ROUTE */}
            <Route 
              path="/payment" 
              element={
                <ProtectedRoute user={user}>
                  <PaymentPageWithNavigation 
                    totalAmount={checkoutTotal}
                    itemCount={cart.length}
                    onClearCart={clearCart}
                  />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/about" element={<Abt />} />
            <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;