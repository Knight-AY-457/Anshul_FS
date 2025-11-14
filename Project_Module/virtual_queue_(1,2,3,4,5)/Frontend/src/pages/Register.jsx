import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/register",
        { name, email, role }
      );

      // ✅ Registration successful
      alert("✅ Registered Successfully");
      navigate("/login");

    } catch (err) {
      console.log("Register error:", err?.response);

      let msg = "Registration failed.";

      if (err?.response?.status === 409) {
        // ✅ Backend custom messages
        msg = err?.response?.data?.message || "Email already registered.";
      } else if (err?.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err?.message) {
        msg = err.message;
      }

      alert(`❌ ${msg}`);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      {/* Left */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white p-10 md:p-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1 className="text-5xl font-extrabold mb-6 text-center leading-tight">
          Join the Future of Queuing 🚀
        </h1>
        <p className="text-lg text-white/90 mb-8 max-w-md text-center">
          Create your account and start managing queues seamlessly — whether
          you're helping customers or joining as one.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/869/869636.png"
          alt="Register Illustration"
          className="w-72 md:w-80 drop-shadow-2xl"
        />
      </motion.div>

      {/* Right */}
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
            Register
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 text-gray-800"
          >
            <option value="customer">Customer</option>
            <option value="shopkeeper">Shopkeeper</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-xl font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
