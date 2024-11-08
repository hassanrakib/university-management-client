import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAppSelector(selectToken);

  // if no token
  if(!token) {
    return <Navigate to="/login" replace />
  }
  return children;
}
