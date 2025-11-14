import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ 1) LOGIN request
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Login failed");
      const user = await res.json();

      // ✅ 2) If shopkeeper → fetch their shop
      let shop = null;
      if (user.role === "shopkeeper") {
        try {
          const shopRes = await fetch(
            `http://localhost:8080/api/shops/owner/${user.email}`
          );

          if (shopRes.ok) {
            shop = await shopRes.json();
          }
        } catch {
          console.log("Shop fetch failed");
        }
      }

      // ✅ 3) Store full user context in frontend
      setUser({ ...user, shop });

      navigate("/");
    } catch (err) {
      alert("Invalid email. User not registered.");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-10 md:p-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1 className="text-5xl font-extrabold mb-6 leading-tight text-center">
          Welcome Back 👋
        </h1>
        <p className="text-lg text-white/90 mb-8 max-w-md text-center">
          Log in to manage your queues, monitor your position, or help your
          customers join easily — anywhere, anytime.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/5522/5522275.png"
          alt="Login Illustration"
          className="w-72 md:w-80 drop-shadow-2xl"
        />
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center bg-gradient-to-br from-yellow-400 via-orange-300 to-red-400"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-11/12 max-w-md bg-white p-10 rounded-3xl shadow-2xl space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-6">
            Sign In
          </h2>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-xl font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
