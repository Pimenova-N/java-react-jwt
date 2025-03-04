import { Navigate } from 'react-router';
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;