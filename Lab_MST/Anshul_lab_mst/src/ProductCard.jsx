export default function ProductCard({ name, price, description, instock }) {
  return (
    <div className="border rounded-xl p-4 w-64">
      <h2 className="text-xl font-bold ">{name}</h2>
      <p className="text-gray-600 ">{description}</p>
      <p className="text-lg font-semibold">₹{price}</p>
      {instock ? (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Buy Now
        </button>
      ) : (
        <p className="text-red-500 font-bold">Out of Stock</p>
      )}
    </div>
  );
}