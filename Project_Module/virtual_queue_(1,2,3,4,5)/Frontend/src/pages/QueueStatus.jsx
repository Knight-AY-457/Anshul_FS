import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { Users, Clock, CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function QueueStatus({ user }) {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    activeQueues: 0,
    avgWaitTime: "0 min",
    servedToday: 0,
  });

  useEffect(() => {
    if (!user) return;

    // ✅ Only shopkeeper allowed
    if (user.role !== "shopkeeper") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        // ✅ Step 1: Find shop for this owner
        const shopRes = await axios.get(`/api/shops/owner/${user.email}`);
        const shop = shopRes.data;
        if (!shop?.name) return;

        const shopName = shop.name;

        // ✅ Step 2: Get ALL requests for this shop
        const allReq = await axios.get(
          `/api/queue-requests/shop/${shopName}/all`
        );

        const all = allReq.data || [];

        // Pending only
        const pending = all.filter((r) => r.status === "PENDING");

        // Served today
        const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
        const servedToday = all.filter(
          (r) =>
            r.status === "SERVED" &&
            r.servedTime &&
            r.servedTime.startsWith(today)
        ).length;

        // ✅ Average wait time based on `estimatedTimeMin` of pending
        let avg = 0;
        if (pending.length > 0) {
          const sum = pending.reduce(
            (acc, r) => acc + (r.estimatedTimeMin ?? 0),
            0
          );
          avg = Math.round(sum / pending.length);
        }

        setStats({
          activeQueues: pending.length,
          avgWaitTime: `${avg} min`,
          servedToday,
        });
      } catch (err) {
        console.error("Error loading queue stats:", err);
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 text-white flex flex-col justify-center items-center px-8">
        <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
          Please Login
        </h2>
        <p className="text-lg opacity-90">
          You must be logged in to view your queue status.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 text-white flex flex-col justify-center items-center px-8">
      <h2 className="text-5xl font-extrabold mb-10 drop-shadow-lg">
        Queue Status Dashboard 📊
      </h2>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        <StatCard title="Active Queues" value={stats.activeQueues} icon={<Users />} />
        <StatCard title="Avg Wait Time" value={stats.avgWaitTime} icon={<Clock />} />
        <StatCard title="Served Today" value={stats.servedToday} icon={<CheckCircle />} />
      </div>
    </div>
  );
}
