import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
