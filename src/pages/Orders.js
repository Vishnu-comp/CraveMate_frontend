import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const token = localStorage.getItem('token');
  let userEmail = '';

  // Decode JWT token to get user email
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userEmail = decodedToken.sub; // Assuming 'sub' contains the user's email
    } catch (error) {
      console.error('Error decoding token:', error);
      setError('Invalid token. Please log in again.');
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setError('Please log in to view your orders.');
        setLoading(false);
        return;
      }

      if (userEmail) {
        try {
          setLoading(true);
          console.log('Fetching orders for:', userEmail);
          const response = await api.get(`/api/order/user/${userEmail}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Fetched orders:', response.data);
          setOrders(response.data || []);
        } catch (error) {
          console.error('Error fetching orders:', error);
          if (error.response) {
            console.error('Response error:', error.response.data);
            if (error.response.status === 403) {
              setError('You are not authorized to view these orders. Please try logging in again.');
              logout(); // Optionally log the user out
            } else {
              setError('Failed to fetch orders. Please try again.');
            }
          } else {
            setError('Failed to fetch orders. Please check your connection.');
          }
        } finally {
          setLoading(false);
        }
      } else {
        setError('User email not found. Please log in again.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, userEmail, token, logout]);

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center py-4">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
              <p className="text-gray-600 mb-2">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-4">Status: {order.status}</p>
              <h3 className="text-lg font-semibold mb-2">Items:</h3>

              <ul className="list-none mb-4">
                {order.itemIds && order.itemIds.length > 0 ? (
                  order.itemIds.map((item) => {
                    const [id, name, price, imageUrl] = item.split('|');
                    return (
                      <li key={id} className="flex items-center mb-4">
                        <img 
                          src={imageUrl} 
                          alt={name} 
                          className="w-24 h-24 object-cover mr-4" 
                        />
                        <div>
                          <p className="text-lg font-semibold">{name}</p>
                          <p className="text-gray-600">Price: Rs{parseFloat(price).toFixed(2)}</p>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li>No items found for this order</li>
                )}
              </ul>

              <p className="text-xl font-bold">Total: Rs{order.totalAmount?.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;