export default function QueueStatus() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
      <div className="bg-white rounded-3xl shadow-2xl p-16 text-center max-w-xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Queue Status</h2>
        <p className="text-gray-600 text-lg">
          View detailed status of all queues you are part of.
        </p>
      </div>
    </div>
  );
}
