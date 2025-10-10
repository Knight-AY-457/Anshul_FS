export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white rounded-3xl shadow-2xl p-16 text-center max-w-xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Virtual Queue</h2>
        <p className="text-gray-600 text-lg">
          This is your virtual queue system. Navigate using the menu above.
        </p>
      </div>
    </div>
  );
}
