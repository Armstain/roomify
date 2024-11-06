import { Link } from "react-router-dom";

const FeaturedRoom = ({ room }) => {
  const {
    name,
    description,
    pricePerNight,
    imageUrl,
    _id,
    amenities,
    reviews,
  } = room;

  return (
    <div className="max-w-md mx-auto my-8 overflow-hidden bg-white  rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-102 transition-all duration-300">
      <div className="relative">
        <img
          src={imageUrl}
          alt={`${name} Room`}
          className="w-full h-72 object-cover hover:opacity-95 transition-opacity"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-indigo-600 font-semibold">
            ${pricePerNight}/night
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-indigo-600 transition-colors">
          {name}
        </h2>

        {/* Rating and Reviews */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-600">({reviews || 0} reviews)</span>
        </div>

        <p className="text-gray-700 line-clamp-3 mb-4">{description}</p>

        {/* Amenities with icons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {amenities &&
            amenities.map((amenity, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {amenity}
              </span>
            ))}
        </div>

        <Link
          to={`/roomDetails/${_id}`}
          className="block w-full px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-center transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FeaturedRoom;
