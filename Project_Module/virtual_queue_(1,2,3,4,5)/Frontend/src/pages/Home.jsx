import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home({ user }) {
  const [requests, setRequests] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== CUSTOMER → load their requests =====
  async function loadCustomerRequests() {
    try {
      const res = await axios.get(`/api/queue-requests/user/${user.email}`);
      setRequests(res.data);
    } catch (e) {
      console.error("❌ load customer requests failed", e);
    }
    setLoading(false);
  }

  // ===== SHOPKEEPER → load pending + approved =====
  async function loadShopRequests() {
    try {
      const shopRes = await axios.get(`/api/shops/owner/${user.email}`);
      const shop = shopRes.data;
      if (!shop) {
        setPending([]);
        return;
      }

      // ✅ Get ALL → so approved users remain visible for serving
      const res = await axios.get(
        `/api/queue-requests/shop/${shop.name}/all`
      );

      // Show only PENDING + APPROVED
      const filtered = res.data.filter(
        (r) => r.status === "PENDING" || r.status === "APPROVED"
      );

      setPending(filtered);
    } catch (e) {
      console.error("❌ load shop requests failed", e);
    }
    setLoading(false);
  }

  // ===== ACTIONS → approve / decline / serve =====
  async function handleAction(id, action) {
    try {
      await axios.put(`/api/queue-requests/${id}/${action}`);

      if (user.role === "shopkeeper") {
        loadShopRequests();
      } else {
        loadCustomerRequests();
      }
    } catch (e) {
      console.error("❌ action failed", e);
      alert(e?.response?.data ?? "Action failed!");
    }
  }

  useEffect(() => {
    if (!user) return;
    user.role === "shopkeeper"
      ? loadShopRequests()
      : loadCustomerRequests();
  }, [user]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-500 text-white flex flex-col justify-center items-center overflow-hidden px-6 md:px-16">
      {!user ? (
        // 🚀 Guest home
        <div className="text-center max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
              Queue Smarter.
            </span>
            <br />
            Skip the Wait 🚀
          </h1>
          <p className="text-xl mt-8 text-white/90 font-light leading-relaxed">
            Manage queues effortlessly — whether you’re a shopkeeper or a
            customer.
          </p>
        </div>
      ) : user.role === "shopkeeper" ? (
        // ✅ SHOPKEEPER VIEW
        <div className="w-full max-w-5xl mt-10">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Manage Queues 🧾
          </h2>

          <h3 className="text-3xl font-semibold mb-4">Customer Requests 📬</h3>

          {pending.length === 0 ? (
            <p>No active requests.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 overflow-y-auto max-h-[70vh]">
              {pending.map((req) => (
                <div
                  key={req.id}
                  className="bg-white/10 p-6 rounded-xl flex flex-col gap-3 shadow-lg"
                >
                  <p className="text-xl font-bold">{req?.user?.name}</p>
                  <p>
                    {req.shopName} — <span>{req.serviceType}</span>
                  </p>

                  {/* ✅ Queue Position */}
                  <p className="text-yellow-200">Position: {req.position}</p>

                  <div className="flex gap-4">
                    {/* ✅ If request is PENDING → Approve / Decline */}
                    {req.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleAction(req.id, "approve")}
                          className="px-4 py-2 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-300"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleAction(req.id, "decline")}
                          className="px-4 py-2 bg-red-400 text-black font-semibold rounded-lg hover:bg-red-300"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {/* ✅ If APPROVED → Show Serve */}
                    {req.status === "APPROVED" && (
                      <button
                        onClick={() => handleAction(req.id, "served")}
                        className="px-4 py-2 bg-blue-400 text-black font-semibold rounded-lg hover:bg-blue-300"
                      >
                        Serve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // ✅ CUSTOMER VIEW
        <div className="w-full max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">My Queue Status 📊</h2>

          {requests.length === 0 ? (
            <p className="text-xl text-white/90">
              You haven’t joined any queues yet. Go to “Join Queue” to get
              started!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="bg-white/10 p-6 rounded-xl shadow-lg flex flex-col"
                >
                  <p className="text-xl font-semibold">{r.shopName}</p>
                  <p className="text-yellow-300">{r.serviceType}</p>

                  <p
                    className={`mt-2 font-bold ${
                      r.status === "APPROVED"
                        ? "text-green-300"
                        : r.status === "DECLINED"
                        ? "text-red-300"
                        : r.status === "SERVED"
                        ? "text-blue-300"
                        : "text-yellow-200"
                    }`}
                  >
                    Status: {r.status}
                  </p>

                  {/* ✅ ETA + Position */}
                  {r.status !== "SERVED" && (
                    <>
                      <p className="text-white/70 mt-1">
                        Position: {r.position}
                      </p>
                      <p className="text-white/70 mt-1">
                        Estimated time: {r.estimatedTimeMin} mins
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
