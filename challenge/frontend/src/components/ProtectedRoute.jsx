import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "../utils/token";
import { ROUTES } from "../utils";
import Navbar from "./NavBar";
import CustomSpinner from "./CustomSpinner";

const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getToken()) navigate(ROUTES.HOME);
    else navigate(ROUTES.LOGIN);
    setLoading(false);
  }, [navigate]);

  if (loading) return <CustomSpinner size="xl" />;

  return (
    <>
      {getToken() && <Navbar />}
      <Component />
    </>
  );
};

export default ProtectedRoute;
