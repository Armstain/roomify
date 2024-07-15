import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import BookingModal from '../components/BookingModal.jsx';
import ReviewForm from '../components/ReviewForm.jsx';
import ReviewList from '../components/ReviewList.jsx';
import useAuth from '../hooks/useAuth.jsx';
import useAxiosSecure from '../hooks/useAxiosSecure.jsx';


const RoomDetails = () => {
    const { user, updateUserData } = useAuth();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const room = useLoaderData();
    const { _id: roomId, name, description, pricePerNight, amenities, totalReviews, imageUrl } = room;
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [reviews, setReviews] = useState([]);
    const roomFromFeaturedRoom = location.state?.room;
    const featuredRoom = roomFromFeaturedRoom || useLoaderData();


    useEffect(() => {

        const existingBooking = user?.bookings?.find(booking => booking.roomId === roomId);
        setIsBooked(!!existingBooking);
    }, [user, room]);


    useEffect(() => {

        const fetchReviews = async () => {
            try {
                const response = await axios.get(

                    `${import.meta.env.VITE_API_URL}/reviews/${roomId}?userId=${user?.uid}`
                );
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        if (roomId) {
            fetchReviews();
        }
    }, [roomId, user, reviews]);

    useEffect(() => {
        const existingBooking = user?.bookings?.find(booking => booking.roomId === roomId);
        setIsBooked(!!existingBooking);
    }, [user, room]);


    const handleReviewSubmit = async (newReview) => {
        setReviews([...reviews, newReview]);
    };



    const handleBookNowClick = () => {
        if (!user) {
            toast.error('Please log in to book a room!');
            return;
        }
        setIsBookingModalOpen(true);
    };

    const handleBooking = async () => {
        const bookingData = {
            roomId,
            roomName: name,
            description,
            pricePerNight,
            date: selectedDate,
            userEmail: user?.email,
            userId: user?.uid,
            image: imageUrl,

        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData, { withCredentials: true });
            if (response.data.insertedId) {

                const updatedBookings = user.bookings ? [...user.bookings, bookingData] : [bookingData];

                updateUserData({
                    ...user,
                    bookings: updatedBookings,
                });

                toast.success('Your room has been booked!');
                setIsBooked(true);
                navigate('/myBookings');
            }
        } catch (error) {
            console.error('Error booking room:', error);
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setIsBookingModalOpen(false);
        }
    };


    return (
        <div className="container mx-auto py-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img src={imageUrl} alt={name} className="w-full h-96 md:h-full object-cover" />
                </div>

                <div className="md:w-1/2 p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
                    <p className="text-gray-600 mb-4">{description}</p>

                    <div className="flex items-center mb-4">
                        <p className="text-lg font-semibold text-blue-600">${pricePerNight}/night</p>
                        <span className="mx-4">•</span>

                        {totalReviews ? (
                            <p className="text-gray-600">Total Reviews: {totalReviews}</p>
                        ) : null}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Amenities</h3>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        {amenities.map((amenity) => (
                            <li key={amenity}>{amenity}</li>
                        ))}
                    </ul>

                    <div className="mb-6">
                        <label htmlFor="bookingDate" className="block text-gray-700 text-sm font-bold mb-2">
                            Select Booking Date:
                        </label>
                        <DatePicker selected={selectedDate} onChange={setSelectedDate} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <button
                        onClick={handleBookNowClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        disabled={isBooked}
                    >
                        {isBooked ? 'Already Booked' : 'Book Now'}
                    </button>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Reviews</h3>
                        <ReviewList reviews={reviews} />


                        {isBooked && !reviews.find(review => review.userId === user?.uid) && <ReviewForm onReviewSubmit={handleReviewSubmit} roomId={roomId} userId={user?.uid} />}</div>
                </div>

                {isBookingModalOpen && (
                    <BookingModal
                        room={room}
                        selectedDate={selectedDate}
                        onClose={() => setIsBookingModalOpen(false)}
                        onSubmit={handleBooking}
                    />
                )}
            </div>
        </div>
    );
};

export default RoomDetails;
