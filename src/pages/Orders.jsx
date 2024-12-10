// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import { jwtDecode } from 'jwt-decode';
// import { useAuth } from '../context/AuthContext';
// import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast notifications

// function Orders() {
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { isAuthenticated, logout } = useAuth();
//     const token = localStorage.getItem('token');
//     let userEmail = '';

//     // Decode JWT token to get user email
//     if (token) {
//         try {
//             const decodedToken = jwtDecode(token);
//             userEmail = decodedToken.sub; // Assuming 'sub' contains the user's email
//         } catch (error) {
//             console.error('Error decoding token:', error);
//             setError('Invalid token. Please log in again.');
//             toast.error('Invalid token. Please log in again.'); // Notify user about invalid token
//         }
//     }

//     useEffect(() => {
//         const fetchOrders = async () => {
//             if (!isAuthenticated) {
//                 setError('Please log in to view your orders.');
//                 toast.warn('Please log in to view your orders.'); // Notify user to log in
//                 setLoading(false);
//                 return;
//             }

//             if (userEmail) {
//                 try {
//                     setLoading(true);
//                     console.log('Fetching orders for:', userEmail);
//                     const response = await api.get(`/api/order/user/${userEmail}`, {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     });
//                     console.log('Fetched orders:', response.data);
//                     setOrders(response.data || []);
//                     toast.success('Orders fetched successfully!'); // Notify successful fetch
//                 } catch (error) {
//                     console.error('Error fetching orders:', error);
//                     if (error.response) {
//                         console.error('Response error:', error.response.data);
//                         if (error.response.status === 403) {
//                             setError('You are not authorized to view these orders. Please try logging in again.');
//                             toast.error('You are not authorized to view these orders. Please log in again.'); // Notify authorization error
//                             logout(); // Optionally log the user out
//                         } else {
//                             setError('Failed to fetch orders. Please try again.');
//                             toast.error('Failed to fetch orders. Please try again.'); // Notify fetch failure
//                         }
//                     } else {
//                         setError('Failed to fetch orders. Please check your connection.');
//                         toast.error('Failed to fetch orders. Please check your connection.'); // Notify connection error
//                     }
//                 } finally {
//                     setLoading(false);
//                 }
//             } else {
//                 setError('User email not found. Please log in again.');
//                 toast.error('User email not found. Please log in again.'); // Notify missing email
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [isAuthenticated, userEmail, token, logout]);

//     if (loading) {
//         return <div className="text-center py-8">Loading orders...</div>;
//     }

//     if (error) {
//         return <div className="text-center py-8 text-red-500">{error}</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
//             {orders.length === 0 ? (
//                 <p className="text-center py-4">You have no orders yet.</p>
//             ) : (
//                 <div className="space-y-6">
//                     {orders.map((order) => {
//                         // Count the number of unique item IDs for this order
//                         const uniqueItemCount = new Set(order.itemIds.map(item => item.split('|')[0])).size;

//                         return (
//                             <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
//                                 <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
//                                 <p className="text-gray-600 mb-2">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
//                                 <p className="text-gray-600 mb-4">Status: {order.status}</p>
//                                 <h3 className="text-lg font-semibold mb-2">Total Unique Items: {uniqueItemCount}</h3>

//                                 <h3 className="text-lg font-semibold mb-2">Items:</h3>
//                                 <ul className="list-none mb-4">
//                                     {order.itemIds && order.itemIds.length > 0 ? (
//                                         order.itemIds.map((item) => {
//                                             const [id, name, price, imageUrl] = item.split('|');
//                                             return (
//                                                 <li key={id} className="flex items-center mb-4">
//                                                     <img
//                                                         src={imageUrl}
//                                                         alt={name}
//                                                         className="w-24 h-24 object-cover mr-4"
//                                                     />
//                                                     <div>
//                                                         <p className="text-lg font-semibold">{name}</p>
//                                                         <p className="text-gray-600">Price: Rs{parseFloat(price).toFixed(2)}</p>
//                                                     </div>
//                                                 </li>
//                                             );
//                                         })
//                                     ) : (
//                                         <li>No items found for this order</li>
//                                     )}
//                                 </ul>

//                                 <p className="text-xl font-bold">Total: Rs{order.totalAmount?.toFixed(2)}</p>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//             <ToastContainer /> {/* Add the ToastContainer here */}
//         </div>
//     );
// }

// export default Orders;







import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
        <span className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleString()}</span>
      </div>
      {order.itemIds.map((item, index) => {
        const [ ,name, price, imageUrl] = item.split('|');
        return (
          <div key={index} className="flex items-center mb-2">
            <img src={imageUrl} alt={name} className="w-16 h-16 object-cover rounded-full mr-4" />
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-600">{price}</p>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
          </div>
        );
      })}
      <div className="flex justify-between items-center mt-4">
        <p className="font-semibold">Total: Rs{order.totalAmount?.toFixed(2)}</p>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
          {order.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const token = localStorage.getItem('token');
  let userEmail = '';

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userEmail = decodedToken.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      setError('Invalid token. Please log in again.');
      toast.error('Invalid token. Please log in again.');
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setError('Please log in to view your orders.');
        toast.warn('Please log in to view your orders.');
        setLoading(false);
        return;
      }

      if (userEmail) {
        try {
          setLoading(true);
          const response = await api.get(`/api/order/user/${userEmail}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrders(response.data || []);
          toast.success('Orders fetched successfully!');
        } catch (error) {
          console.error('Error fetching orders:', error);
          setError('Failed to fetch orders. Please try again.');
          toast.error('Failed to fetch orders. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('User email not found. Please log in again.');
        toast.error('User email not found. Please log in again.');
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
      <h1 className="text-3xl font-bold mb-6">ORDER LIST</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {orders.map((order, index) => (
          <span key={index} className={`px-3 py-1 rounded-full text-sm ${order.status.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' : order.status.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
            #{order.id}
          </span>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Orders;
