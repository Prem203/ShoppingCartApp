import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShoppingCart from './Pages/ShoppingCart.jsx';
import AddProduct from './Pages/AddProduct.jsx';
import EditProduct from './Pages/EditProduct.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/ShoppingCart",
    element: <ShoppingCart />,
  },
  
  {
    path: "/AddProduct",
    element: <AddProduct />,
  },

  {
    path: "/EditProduct",
    element: <EditProduct />
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} /> 
  </React.StrictMode>,
)
