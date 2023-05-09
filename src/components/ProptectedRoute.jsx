import { useUser } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProptectedRoute = ({ children }) => {
  const { authUser } = useUser();
  if (!authUser) {
    return <Navigate to="/login" />;
  }
  return children;
};
