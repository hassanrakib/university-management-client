import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type ProtectedRouteProps = { children: ReactNode; role: string };

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  let user = null;

  if (token) {
    user = verifyToken(token);
  }

  if (user && role !== user.role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  // if no token or user is not found by that token
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
