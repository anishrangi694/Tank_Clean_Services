
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/users/profile",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          setIsAdmin(false);
          return;
        }

        const data = await response.json();

        if (data.data?.role === "Admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.log(error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

