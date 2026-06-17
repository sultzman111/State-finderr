import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Component.jsx/Nav';
import Footer from './Component.jsx/Footer'; 
import Abt from './Component.jsx/Abt';
import Home from './Pages/Home';
import Service from './Pages/Service';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('activeUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --- NEW FUNCTIONAL STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('activeUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('activeUser');
    setCart([]); // Clear cart on logout
  };

  // Helper function to handle adding structural vectors to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Prevent adding the exact same property multiple times
      if (prevCart.find((cartItem) => cartItem.id === item.id)) return prevCart;
      return [...prevCart, item];
    });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-white">
        
        <div>
          {/* Pass down search state controls and cart total item count */}
          <Nav 
            user={user} 
            onLogout={handleLogout} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cartCount={cart.length}
          />
          
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Pass down filter metrics and action functions */}
            <Route 
              path="/services" 
              element={
                <Service 
                  searchQuery={searchQuery} 
                  onAddToCart={addToCart} 
                  cartItems={cart}
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