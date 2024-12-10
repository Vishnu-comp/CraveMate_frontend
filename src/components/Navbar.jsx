import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import img from '../asset/img5.png'

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goToCart = () => {
    navigate('/cart');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
        <Link to="/" className="flex items-center text-xl font-bold text-orange-500">
      <img src={img} alt="Food Order Logo" className="h-8 w-8 mr-2" /> {/* Adjust size as needed */}
      CraveMate
    </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-orange-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <>
                <div className="relative mx-2 cursor-pointer" onClick={goToCart}>
                  <FaShoppingCart className="text-gray-600 hover:text-orange-500" size={24} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <div className="relative group mx-2">
                  <FaUserCircle className="text-gray-600 hover:text-orange-500" size={24} />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Previous Orders</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <span className="mx-2 text-gray-700">{user?.sub}</span>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-orange-500 mx-2">Login</Link>
                <Link to="/register" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">Register</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">{user?.sub}</span>
                  <div className="relative cursor-pointer" onClick={goToCart}>
                    <FaShoppingCart className="text-gray-600 hover:text-orange-500" size={24} />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </div>
                <Link to="/orders" className="block py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Previous Orders</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-600 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block py-2 text-gray-600 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;