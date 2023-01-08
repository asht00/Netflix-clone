import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase.js';

function App() {
  const user = null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //Logged in
        console.log(userAuth);
      } else {
        //Logged out
      }
    });

    return unsubscribe;
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
        <Routes>
          <Route exact path='/' element={<HomeScreen />} />
        </Routes>
        )}
      </Router>  
    </div>
  );
}

export default App;
