import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// 🔥 FIREBASE FIREBASE ENGINE IMPORTS
import { db } from './firebase'; 
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

import Nav from './Component.jsx/Nav';
import Footer from './Component.jsx/Footer'; 
import Abt from './Component.jsx/Abt';
import Home from './Pages/Home';
import Service from './Pages/Service';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Fav from './Pages/Fav';   
import Cart from './Pages/Cart'; 
import AddProperty from './Pages/AddProperty';
import MyListings from './Pages/MyListings'; 
import PaymentPage from './Pages/PaymentPage'; // 👈 1. ADDED PAYMENT/HISTORY PAGE IMPORT

// Route Protection Layer to handle unauthorized account access gracefully
const ProtectedRoute = ({ user, children, requiredRole }) => {
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    console.warn(`Access Denied: User role is "${user.role}", but exact "${requiredRole}" authorization is required.`);
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  // --- 1. GLOBAL STATE INITIALIZERS ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('activeUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Buyers keeping private local caching for shopping metrics
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('favoriteItems');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  // --- 2. REAL-TIME CLOUD DATABASE SUBSCRIPTIONS ---
  useEffect(() => {
    // 🌐 Active Live Stream 1: Property Listings
    const unsubscribeListings = onSnapshot(collection(db, "listings"), (snapshot) => {
      const liveListings = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }));
      setListings(liveListings);
    }, (error) => {
      console.error("Error reading live listings stream: ", error);
    });

    // 🌐 Active Live Stream 2: Offers & Transactions Queue
    const unsubscribeTransactions = onSnapshot(collection(db, "transactions"), (snapshot) => {
      const liveTx = snapshot.docs.map(doc => ({
        txId: doc.id, 
        ...doc.data()
      }));
      
      // Sort history items so the newest broadcasts stay right on top
      const sortedTx = liveTx.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setTransactions(sortedTx);
    }, (error) => {
      console.error("Error reading live transactions stream: ", error);
    });

    return () => {
      unsubscribeListings();
      unsubscribeTransactions();
    };
  }, []);

  // --- 3. PRIVATE LOCAL PERSISTENCE EFFECTS (Cart & Favs Only) ---
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favorites));
  }, [favorites]);

  // --- 4. AUTHENTICATION HANDLERS ---
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('activeUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setFavorites([]);
    localStorage.removeItem('activeUser');
    localStorage.removeItem('cartItems');     
    localStorage.removeItem('favoriteItems'); 
  };

  // --- 5. REAL ESTATE CLOUD DATABASE CONTROLLERS ---
  
  const addNewProperty = async (newProperty) => {
    const authorizedListing = { 
      ...newProperty, 
      sellerId: user?.email || 'anonymous',
      createdAt: Date.now()
    };
    try {
      await addDoc(collection(db, "listings"), authorizedListing);
    } catch (err) {
      console.error("Error creating new cloud document: ", err);
      throw err; 
    }
  };

  const deleteProperty = async (id) => {
    try {
      await deleteDoc(doc(db, "listings", id));
    } catch (err) {
      console.error("Error removing cloud document: ", err);
    }
  };

  // ⚡ UPDATED: Accepts a 'navigate' execution callback from the Cart screen layout
  const handleBuyerCheckout = async (totalAmount, navigate) => {
    if (cart.length === 0) return;

    try {
      for (const item of cart) {
        await addDoc(collection(db, "transactions"), {
          propertyId: item.id,
          title: item.title,
          price: item.basePrice,
          buyerEmail: user?.email,
          sellerId: item.sellerId,
          status: 'PENDING',
          createdAt: Date.now()
        });
      }
      setCart([]); 
      
      // If the navigation callback function is passed down from Cart, run it!
      if (navigate) {
        navigate('/payment');
      } else {
        alert('Purchase request broadcasted! Check your historical ledger tab.');
      }
    } catch (err) {
      console.error("Error writing purchase checkout documents: ", err);
      alert("Checkout sync error. Please try again.");
    }
  };

  const handleUpdateTransactionStatus = async (txId, newStatus) => {
    try {
      const transactionRef = doc(db, "transactions", txId);
      await updateDoc(transactionRef, { status: newStatus });
    } catch (err) {
      console.error("Error modifying active transaction reference: ", err);
    }
  };

  // --- 6. LOCAL INTERACTION CONTROLLERS ---
  const addToCart = (item) => {
    setCart((prev) => {
      if (prev.some((cartItem) => cartItem.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
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

  // --- 7. RENDER ROUTER SCHEMATIC ---
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
            <Route path="/" element={<Home user={user} listings={listings} />} />
            
            <Route path="/services" element={
              <Service 
                user={user} 
                customProperties={listings} 
                cartItems={cart}
                favoriteItems={favorites}
                onAddToCart={addToCart} 
                onRemoveFromCart={removeFromCart} 
                onToggleFavorite={toggleFavorite}
                searchQuery={searchQuery}
              />
            } />
            
            <Route 
              path="/AddProperty" 
              element={
                <ProtectedRoute user={user} requiredRole="seller">
                  <AddProperty onAddProperty={addNewProperty} />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/mylistening" 
              element={
                <ProtectedRoute user={user} requiredRole="seller">
                  <MyListings 
                    listings={listings} 
                    currentUser={user} 
                    onDeleteListing={deleteProperty}
                    transactions={transactions}
                    onUpdateTxStatus={handleUpdateTransactionStatus}
                  />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute user={user}>
                  <Fav favoriteItems={favorites} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/cart" 
              element={
                <ProtectedRoute user={user}>
                  {/* ⚡ UPDATED: Passing user context object down to cart filters */}
                  <Cart 
                    user={user}
                    cartItems={cart} 
                    onRemoveFromCart={removeFromCart} 
                    onClearCart={() => setCart([])} 
                    onNavigateToPayment={handleBuyerCheckout}
                    transactions={transactions} 
                  />
                </ProtectedRoute>
              } 
            />

            {/* ⚡ 2. ADDED: SECURE PAYMENT PAGE ROUTE MAP */}
            <Route 
              path="/payment" 
              element={
                <ProtectedRoute user={user}>
                  <PaymentPage 
                    user={user} 
                    transactions={transactions} 
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