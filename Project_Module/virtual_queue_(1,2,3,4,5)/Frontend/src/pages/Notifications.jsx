import { useEffect, useState } from "react";

export default function Notifications({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!user?.email) return;

    try {
      const res = await fetch(`/api/queue-requests/user/${user.email}`);
      const data = await res.json();

      const notifs = data.map((r) => {
        if (r.status === "APPROVED") {
          return {
            id: r.id,
            text: `✅ Approved: "${r.shopName}" (${r.serviceType}) — ETA ${r.estimatedTimeMin} min`,
          };
        }

        if (r.status === "SERVED") {
          return {
            id: r.id,
            text: `🎉 Served: "${r.shopName}" (${r.serviceType}) — Please proceed.`,
          };
        }

        return null;
      }).filter(Boolean);

      setNotifications(notifs);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-pink-400 via-orange-400 to-yellow-300 text-white flex flex-col justify-center items-center px-8 pt-28">
      <h2 className="text-5xl font-extrabold mb-10 drop-shadow-lg">
        Notifications 🔔
      </h2>

      {loading && <p className="text-xl">Loading notifications...</p>}

      {!loading && notifications.length === 0 && (
        <p className="text-xl text-white/90">No new notifications yet.</p>
      )}

      {!loading && notifications.length > 0 && (
        <div className="space-y-6 w-full max-w-3xl">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <p className="text-lg">{note.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
