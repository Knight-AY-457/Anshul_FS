import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute
 *
 * Props:
 *  - user        → logged-in user OR null
 *  - children    → component to show
 *  - allowed     → optional ["customer"] or ["shopkeeper"] list
 */
export default function ProtectedRoute({ user, children, allowed }) {
  // ✅ Not logged in → login
  if (!user) return <Navigate to="/login" replace />;

  // ✅ If allowed roles passed, validate
  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <div className="min-h-screen w-full">{children}</div>;
}
