import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/token";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (getToken()) navigate("/home");
    else navigate("/");
  }, [navigate]);
  // return token ? children : <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
