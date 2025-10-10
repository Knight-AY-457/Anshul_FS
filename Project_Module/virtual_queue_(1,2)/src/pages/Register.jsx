import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Register clicked — backend not connected yet!");
  }

  return (
    <div className="flex justify-center items-center min-h-[95vh] bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 transform hover:scale-105 transition duration-300"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <input
          name="name"
          placeholder="Name"
          className="border border-gray-300 rounded-xl w-full p-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-xl w-full p-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-xl w-full p-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white w-full py-3 rounded-xl font-bold text-lg hover:from-teal-500 hover:to-green-500 transition-all duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}
