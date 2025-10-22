import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FilterPage from './pages/FilterPage';
import PGListPage from './pages/PGListPage';
import PGDetails from './pages/PGDetails'; // ✅ Correct import name



// Protected Route
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Header />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/filters" element={<PrivateRoute><FilterPage /></PrivateRoute>} />
          <Route path="/pgs" element={<PrivateRoute><PGListPage /></PrivateRoute>} />
          <Route path="/pgs/:id" element={<PrivateRoute><PGDetails /></PrivateRoute>} /> {/* ✅ Fixed here */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
