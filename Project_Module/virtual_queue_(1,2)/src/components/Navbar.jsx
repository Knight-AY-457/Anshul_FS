import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 flex justify-between items-center shadow-xl sticky top-0 z-50">
      <h1 className="text-3xl font-extrabold tracking-wide">Virtual Queue</h1>
      <div className="space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
        <Link to="/join" className="hover:text-yellow-300 transition duration-300">Join Queue</Link>
        <Link to="/myqueue" className="hover:text-yellow-300 transition duration-300">My Queue</Link>
        <Link to="/login" className="hover:text-yellow-300 transition duration-300">Login</Link>
        <Link to="/register" className="hover:text-yellow-300 transition duration-300">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
