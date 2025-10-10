export default function MyQueue() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100">
      <div className="bg-white rounded-3xl shadow-2xl p-16 text-center max-w-xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">My Queue</h2>
        <p className="text-gray-600 text-lg">
          Check your current position and status in all queues you joined.
        </p>
      </div>
    </div>
  );
}
