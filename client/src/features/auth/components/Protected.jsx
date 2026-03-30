import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = () => {
  const {  user } = useAuth();

  

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // This is the most important line for nested routes
  return <Outlet />;
};

export default Protected;