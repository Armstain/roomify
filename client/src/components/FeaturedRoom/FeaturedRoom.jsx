import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedRoom = ({ room }) => {
    const { name, description, pricePerNight, imageUrl, _id, amenities, reviews } = room;

    return (
        <div className="max-w-md mx-auto my-8 overflow-hidden bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <img
                src={imageUrl}
                alt={`${name} Room`}  // More descriptive alt text for accessibility
                className="w-full h-64 md:h-48 object-cover" // Adjust image height on smaller screens
            />

            <div className="p-4 md:p-6">  {/* Adjusted padding for better spacing on smaller screens */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
                <p className="text-lg text-indigo-600 mb-4">Starting from ${pricePerNight} / night</p>
                <p className="text-gray-700 line-clamp-3">{description}</p> {/* Limit description lines on mobile */}

                {/* Amenities (Bullet Points) */}
                <ul className="list-disc pl-5 text-gray-600 mb-4 hidden md:block">
                    {amenities && amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                    ))}
                </ul>

                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <p className="text-gray-600">Total Reviews: {reviews || 0}</p>
                    <Link
                        to={`/roomDetails/${_id}`}
                        className="px-4 py-2 mt-2 md:mt-0 rounded-md transition duration-200 shadow-md hover:shadow-lg bg-indigo-500 hover:bg-indigo-700 text-white font-semibold text-center"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedRoom;
