import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md py-3 px-10 flex justify-between items-center z-50 border-b border-white/20">
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wide drop-shadow-lg"
      >
        Virtual Queue
      </Link>

      <div className="flex items-center space-x-4">
        {!user && (
          <>
            <Link
              to="/"
              className="px-4 py-2 text-sm rounded-xl bg-white/20 hover:bg-white/30 transition font-semibold"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-sm rounded-xl bg-yellow-300 text-indigo-800 font-bold hover:scale-105 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm rounded-xl bg-white text-indigo-700 font-bold hover:bg-indigo-100 hover:scale-105 transition"
            >
              Register
            </Link>
          </>
        )}

        {user && user.role === "customer" && (
          <>
            <Link
              to="/joinqueue"
              className="px-4 py-2 text-sm rounded-xl bg-white/20 hover:bg-white/30 font-semibold"
            >
              Join Queue
            </Link>
            <Link
              to="/queuestatus"
              className="px-4 py-2 text-sm rounded-xl bg-white/20 hover:bg-white/30 font-semibold"
            >
              Queue Status
            </Link>
            <Link
              to="/myqueue"
              className="px-4 py-2 text-sm rounded-xl bg-white/20 hover:bg-white/30 font-semibold"
            >
              My Queue
            </Link>
          </>
        )}

        {user && user.role === "shopkeeper" && (
          <>
            <Link
              to="/"
              className="px-4 py-2 text-sm rounded-xl bg-white/20 hover:bg-white/30 font-semibold"
            >
              Requests
            </Link>
          </>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-xl bg-red-500 hover:bg-red-600 font-bold transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
