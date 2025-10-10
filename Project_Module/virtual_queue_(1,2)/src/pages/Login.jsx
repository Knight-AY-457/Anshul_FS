import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Login clicked — backend not connected yet!");
  }

  return (
    <div className="flex justify-center items-center min-h-[95vh] bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 transform hover:scale-105 transition duration-300"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-xl w-full p-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-xl w-full p-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full py-3 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
