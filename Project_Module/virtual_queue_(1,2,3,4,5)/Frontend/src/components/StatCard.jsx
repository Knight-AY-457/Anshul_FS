export default function StatCard({ title = "", value = "", icon = null }) {
  return (
    <div className="flex items-center justify-between bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full hover:scale-105 transition">
      <div>
        <h3 className="text-xl font-semibold text-yellow-200">{title}</h3>
        <p className="text-4xl font-extrabold text-white">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  );
}
