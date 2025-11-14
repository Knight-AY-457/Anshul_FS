import { useEffect, useState } from "react";
import axios from "axios";

export default function JoinQueue({ user, onJoinSuccess }) {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load all shops
  async function loadShops() {
    try {
      const res = await axios.get("/api/shops");
      setShops(res.data);
    } catch (e) {
      console.error("❌ load shops failed", e);
    }
  }

  useEffect(() => {
    loadShops();
  }, []);

  // ✅ Join queue
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedShop) return alert("Select a shop first");
    if (!serviceType.trim()) return alert("Enter service name");

    setLoading(true);

    try {
      const res = await axios.post("/api/queue-requests", {
        shopId: Number(selectedShop),
        serviceType,
        userEmail: user?.email,
      });

      alert("Request sent successfully ✅");

      // ✅ parent can refresh data
      if (onJoinSuccess) onJoinSuccess(res.data);

      setServiceType("");
      setSelectedShop("");

    } catch (e) {
      console.error("❌ join queue failed", e);
      alert("Error joining queue ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 text-white flex flex-col items-center justify-center px-6 pt-20">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10">
        <h2 className="text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
          Join a Queue 🕒
        </h2>

        {shops.length === 0 ? (
          <p className="text-center text-xl">
            No shops are available right now.
          </p>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* Select Shop */}
            <div>
              <label className="block text-lg mb-2">Select Shop</label>
              <select
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
                className="w-full p-4 rounded-xl text-gray-800 focus:ring-4 focus:ring-yellow-300"
              >
                <option value="">-- Choose shop --</option>

                {shops.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Enter service */}
            <div>
              <label className="block text-lg mb-2">
                Enter required service
              </label>
              <input
                type="text"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="Haircut, Passport renewal, Parcel, etc."
                className="w-full p-4 rounded-xl text-gray-800 focus:ring-4 focus:ring-yellow-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-red-800 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105"
            >
              {loading ? "Sending..." : "Join Queue"}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
