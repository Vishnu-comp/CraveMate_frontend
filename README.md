# Akasa Air Food Ordering Platform

For frontend repository visit here Backend: [Backend Repository](https://github.com/Vishnu-comp/akasa_air_backend)

A web application designed for users to browse food inventory, manage their cart, and place orders seamlessly. The application features a frontend built with React and a backend developed using Spring Boot with MongoDB.

## Table of Contents

- [Design Overview](#design-overview)
- [Technologies Used](#technologies-used)
- [Frontend Implementation](#frontend-implementation)
- [Backend Implementation](#backend-implementation)
- [How to Run](#how-to-run)
- [Deployment](#deployment)
- [Requirement Details Analysis](#requirement-details-analysis)


## Design Overview

The architecture of the Food Ordering Platform is divided into two main components: the **Frontend** and the **Backend**. Each component has a clear separation of concerns, ensuring maintainability and scalability.

### Frontend (React)

- **Technology Stack**: 
  - React (JavaScript framework)
  - React Router for navigation
  - Axios for API requests
  - Tailwind CSS for styling

- **Key Components**:
  - **Navbar**: Displays navigation options (Login, Register, Browse Inventory, Cart).
  - **Login/Register Pages**: Allow users to sign in and sign up with email and password.
  - **Inventory Page**: Displays items grouped by categories (e.g., Veg, Non-Veg).
  - **Cart Page**: Shows items added to the user's cart and allows modifications.
  - **Orders Page**: Displays the user's order history and order statuses.

- **State Management**: Context API is used for managing authentication (AuthContext) and cart data (CartContext).

### Backend (Spring Boot & MongoDB)

- **Technology Stack**: 
  - Spring Boot for RESTful APIs
  - MongoDB for data persistence
  - JWT for authentication
  - BCrypt for password hashing

- **Key Modules**:
  - **User Authentication**: Handles user registration and login.
  - **Inventory Management**: Provides endpoints to manage inventory items.
  - **Cart Management**: Manages user cart operations.
  - **Order Processing**: Handles checkout and order history.

- **Security**: Spring Security is configured to secure routes except for authentication endpoints.

## Technologies Used

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Spring Boot, MongoDB, JWT, BCrypt
- **Deployment**: Render, Netlify, Vercel

## Frontend Implementation

### Component Structure

- `App.jsx`: Main entry point with routing and layout components.
- `Login.jsx` and `Register.jsx`: Forms for user authentication.
- `Inventory.jsx`: Fetches available items from the backend.
- `Cart.jsx`: Manages user cart items and syncs data with the backend.
- `Orders.jsx`: Displays the user's past orders.

### Key Libraries

- **React Router**: For navigation.
- **Axios**: For HTTP requests.
- **Tailwind CSS**: For responsive UI design.

## Backend Implementation

### Controller Layer

- `AuthController`: Manages login and registration.
- `CartController`: Manages cart operations.
- `OrderController`: Handles checkout processes.
- `InventoryController`: Manages the item inventory.

### Service Layer

- `AuthService`: Validates user data and communicates with UserRepository.
- `CartService`: Manages cart operations and persistence.
- `OrderService`: Handles order creation and history retrieval.

### Repository Layer

- `UserRepository`: Manages user data.
- `ItemRepository`: Handles item stock updates.
- `OrderRepository`: Manages order history.

### Security

Configured with Spring Security and JWT for secure route access.

## How to Run

### Prerequisites

- Node.js and npm installed
- Java Development Kit (JDK) 11 or later
- MongoDB installed and running

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Build the project:
   ```
   ./mvnw clean install
   ```
3. Run the Spring Boot application:
   ```
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

### Environment Configuration

Create a `.env` file in the frontend directory with the following content:
```
REACT_APP_API_URL=http://localhost:8080/api
```

Create an `application.properties` file in the `src/main/resources` directory of the backend with:
```
spring.data.mongodb.uri=mongodb://localhost:27017/food_ordering_db
jwt.secret=your_jwt_secret_key
```

Replace `your_jwt_secret_key` with a secure random string.

## Deployment

- Backend: [Render](https://render-web.onrender.com/)
- Frontend: [Netlify](https://www.netlify.com/) & [Vercel](https://vercel.com/)
- Overall Deployment Links:
  - [Netlify](https://vishnunair-akasaair-fd.netlify.app/)
  - [Vercel](https://vishnunairakasaairfd.vercel.app/)
  - Manage Inventory: [Inventory Page](https://vishnunairakasaairfd.vercel.app/inventory)

## Requirement Details Analysis

### User Registration and Authentication

- **Registration**: Implemented with a POST request to `/api/auth/register` to save user details in MongoDB.
- **Authentication**: Verifies credentials and generates a JWT token upon successful login.

### Browse Item Inventory

- **Category Browsing**: Users can filter items by categories through the InventoryController.
- **Creative Display**: Items are displayed with images, prices, and availability.

### Selection Basket/Cart

1. **Add to Cart**: Items can be added via a POST request to `/api/cart/add/{userEmail}`.
2. **Stock Check on Checkout**: CartService checks item availability before purchase confirmation.
3. **Persistent Cart**: Cart data is saved in the database for user accessibility across sessions.
4. **Edge Case Handling**: Errors during cart management are appropriately handled.
5. **Multi-Device Login**: Cart is accessible across devices tied to the user's email.

### Checkout

- **Total Breakdown**: Checkout page summarizes items and costs.
- **Transaction Success**: Successful orders generate an order ID stored in MongoDB.
- **Unavailable Items Handling**: Users are notified of unavailable items during checkout.
- **Order Deduction**: Stock is updated only after successful checkout.
- **Order History**: Users can view order history via GET request to `/api/order/user/{email}`.


![image](https://github.com/user-attachments/assets/558d3009-6c26-4764-ac5c-9d763158781b)


![image](https://github.com/user-attachments/assets/34a97638-d344-4dca-9538-86c332ea23d7)



![image](https://github.com/user-attachments/assets/0949b062-19c3-4e61-9230-bfe5c61969b2)

![image](https://github.com/user-attachments/assets/5d926ed0-1c66-443f-93bc-18a09207bba3)


![image](https://github.com/user-attachments/assets/e482a848-f819-4282-8507-5e5c2e1f980c)

![image](https://github.com/user-attachments/assets/7d11b8fb-3148-4138-b595-af666e0741ff)

![image](https://github.com/user-attachments/assets/3fd5f76a-41d3-4f4c-85ee-a7bd9daaece7)







