import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JoinQueue from "./pages/JoinQueue";
import MyQueue from "./pages/MyQueue";
import Notifications from "./pages/Notifications";
import QueueStatus from "./pages/QueueStatus";

export default function App() {
  const [user, setUser] = useState(null);

  // ✅ Shops loaded from backend
  const [shops, setShops] = useState([]);

  // ✅ Load saved user on startup
  useEffect(() => {
    const saved = localStorage.getItem("vq_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // ✅ Load all shops at startup
  useEffect(() => {
    axios
      .get("/api/shops")
      .then((res) => setShops(res.data))
      .catch((err) => console.log("❌ Error loading shops", err));
  }, []);

  // ✅ Customer joins queue
  const handleJoinRequest = async (chosenShopId, serviceType) => {
    try {
      const payload = {
        shopId: chosenShopId,
        serviceType,
        userEmail: user?.email,
      };

      await axios.post("/api/queue-requests", payload);
      alert("Request Sent ✅");
    } catch (err) {
      console.error("❌ Could not join queue", err);
      alert("Could not join queue");
    }
  };

  // ✅ Persist user + LocalStorage
  const setUserPersist = (u) => {
    setUser(u);
    if (u) localStorage.setItem("vq_user", JSON.stringify(u));
    else localStorage.removeItem("vq_user");
  };

  return (
    <Router>
      <div className="h-screen w-screen flex flex-col overflow-x-hidden overflow-y-auto bg-gray-50">
        <Navbar user={user} setUser={setUserPersist} />

        <div className="flex-grow w-full mt-16">
          <Routes>
            {/* ✅ Home */}
            <Route path="/" element={<Home user={user} />} />

            {/* ✅ Auth */}
            <Route path="/login" element={<Login setUser={setUserPersist} />} />
            <Route path="/register" element={<Register />} />

            {/* ✅ Queue pages */}
            <Route
              path="/joinqueue"
              element={
                <JoinQueue
                  user={user}
                  handleJoin={handleJoinRequest}
                  availableQueues={shops}
                />
              }
            />

            <Route path="/myqueue" element={<MyQueue user={user} />} />
            <Route path="/notifications" element={<Notifications user={user} />} />
            <Route path="/queuestatus" element={<QueueStatus user={user} />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}
