import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { BASE_URL } from '../Utils/constants';

const ProtectedRoutes = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${BASE_URL}checkAuth`, {
        withCredentials: true, // Ensures cookies are sent with the request
      });
      console.log(response.data.authenticated);
      if (response.data.authenticated) {
        console.log(response)
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      console.log(isAuthenticated);
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]); // Run only once on mount


  if (isAuthenticated === null) {
    return (
    <div className="flex justify-center items-center h-96">
      <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div> 
    )// or a loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoutes
