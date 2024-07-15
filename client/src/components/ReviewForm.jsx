import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

const ReviewForm = ({ roomId, onReviewSubmit, userId }) => {
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please log in to post a review.');
            return;
        }

        try {
            const reviewData = {
                roomId,
                userId,
                username: user.displayName,
                rating,
                comment,
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, reviewData);
            if (response.status === 201) {
                toast.success('Review submitted successfully!');
                setRating(0);
                setComment('');
                onReviewSubmit();
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">
                    Rating (1-5):
                </label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                    Comment:
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
