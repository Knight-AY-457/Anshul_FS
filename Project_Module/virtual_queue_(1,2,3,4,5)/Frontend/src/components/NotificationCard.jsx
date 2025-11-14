export default function NotificationCard({ message = "", time = "" }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-500">
      <p className="text-gray-700">{message}</p>
      {time && <p className="text-sm text-gray-500 mt-1">{time}</p>}
    </div>
  );
}
