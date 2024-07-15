import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <div className="mt-4">
            {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id} className="mb-4">
                            <div className="flex items-center mb-2">
                                <p className="text-gray-600 font-semibold mr-2">{review.username}</p>
                                <p className="text-yellow-500 text-sm">
                                    {Array(review.rating).fill().map((_, i) => (
                                        <span key={i}>★</span> // Display star ratings
                                    ))}
                                </p>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(review.timestamp).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;
