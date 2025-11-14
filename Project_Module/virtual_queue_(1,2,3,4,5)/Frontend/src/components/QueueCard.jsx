export default function QueueCard({
  name,
  number,
  status,
  service,
  position,
  eta,
  estimatedTimeMin,   // ✅ NEW (from backend)
}) {
  // ✅ Normalize backend status
  const st = status?.toUpperCase();

  const statusColor =
    st === "PENDING"
      ? "bg-yellow-400 text-black"
      : st === "APPROVED"
      ? "bg-green-400 text-black"
      : st === "DECLINED"
      ? "bg-red-400 text-black"
      : st === "SERVED"
      ? "bg-blue-400 text-black"
      : "bg-gray-300 text-black";

  // ✅ Prefer backend calculated ETA, fallback to eta if sent manually
  const finalETA = estimatedTimeMin ?? eta;

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col gap-2 hover:scale-105 transition w-full">
      <h3 className="text-2xl font-semibold text-white">{name}</h3>

      {service && (
        <p className="text-lg text-yellow-200">
          Service: {service}
        </p>
      )}

      {/* ✅ Queue Position */}
      {position != null && (
        <p className="text-lg text-yellow-200">
          Position: {position}
        </p>
      )}

      {/* ✅ ETA */}
      {finalETA != null && (
        <p className="text-lg text-yellow-200">
          ETA: {finalETA} min
        </p>
      )}

      <p className="text-lg text-yellow-200">
        Queue ID: {number}
      </p>

      <span
        className={`px-4 py-1 rounded-full text-sm font-bold self-start ${statusColor}`}
      >
        {st}
      </span>
    </div>
  );
}
