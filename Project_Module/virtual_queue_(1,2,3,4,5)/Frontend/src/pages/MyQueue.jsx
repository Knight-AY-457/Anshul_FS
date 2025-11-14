import { useEffect, useState } from "react";
import QueueCard from "../components/QueueCard";

export default function MyQueue({ user }) {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user queue requests
  const fetchQueues = async () => {
    try {
      const res = await fetch(`/api/queue-requests/user/${user.email}`);
      let data = await res.json();

      // ✅ Use backend ETA + position
      setQueues(data);
    } catch (err) {
      console.error("Error fetching queues:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchQueues();
  }, [user]);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 text-white flex flex-col items-center px-8 pt-28">

      <h2 className="text-5xl font-extrabold mb-10 drop-shadow-lg text-center">
        My Queues 🧾
      </h2>

      {loading && <p className="text-xl">Loading your queues...</p>}

      {!loading && queues.length === 0 && (
        <p className="text-xl text-white/90">
          You are not in any queue yet.
          <br />
          Go to <span className="font-bold">Join Queue</span> to send a request!
        </p>
      )}

      {!loading && queues.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {queues.map((q) => (
            <QueueCard
              key={q.id}
              name={q.shop?.name ?? q.shopName}
              number={q.id}
              service={q.serviceType}
              status={q.status}
              position={q.position}
              estimatedTimeMin={q.estimatedTimeMin}
            />
          ))}
        </div>
      )}
    </div>
  );
}
