export default function Dashboard() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
      <div className="bg-white rounded-3xl shadow-2xl p-16 text-center max-w-xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Dashboard</h2>
        <p className="text-gray-600 text-lg">
          Manage your queues, view statistics, and track your virtual tickets here.
        </p>
      </div>
    </div>
  );
}
