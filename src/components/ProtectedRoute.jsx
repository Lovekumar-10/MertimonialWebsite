// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // ✅ add loading

  // 1️⃣ Wait till auth state loads
  if (loading) return null; // optional: show spinner

  // 2️⃣ Redirect guest users
  if (!user) return <Navigate to="/login" replace />;

  // 3️⃣ Render authenticated page
  return children;
};

export default ProtectedRoute;