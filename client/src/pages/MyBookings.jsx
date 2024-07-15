import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import ReviewForm from "../components/ReviewForm.jsx";
import UpdateBookingModal from "../components/UpdateBookingModal.jsx";
import CancellationModal from "../components/CancellationModal.jsx";
import { format, isBefore } from 'date-fns';
import RoomDetails from "./RoomDetails";

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState(true);



    const fetchMyBookings = async () => {
        try {
            const response = await axiosSecure(`/myBookings?email=${user?.email}`);
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (user) {
            fetchMyBookings();
        }
    }, [user, fetchMyBookings]);

    const handleReviewClick = (booking) => {
        setSelectedBooking(booking);
        setShowReviewModal(true);
    };

    const handleUpdateClick = (booking) => {
        if (booking && booking.date) {
            setSelectedBooking(booking);
            setIsUpdateModalOpen(true);
        } else {
            toast.error("Booking date is missing. Please try again later.");
        }
    };

    const handleCancelBooking = (bookingId) => {
        setIsCancellationModalOpen(true);
        setSelectedBooking(bookingId);
    };

    const confirmCancelBooking = async () => {
        try {
            const response = await axiosSecure.delete(`/bookings/${selectedBooking}`);
            if (response.data.deletedCount > 0) {
                toast.success("Booking cancelled successfully");
                fetchMyBookings();
            }
        } catch (error) {
            console.error("Error cancelling booking:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsCancellationModalOpen(false);
            setSelectedBooking(null);
        }
    };

    const handleUpdateBooking = async (updatedDate) => {
        if (isBefore(updatedDate, new Date())) {
            toast.error("Please select a date in the future.");
            return;
        }

        try {
            const response = await axiosSecure.patch(`/bookings/${selectedBooking._id}`, {
                date: updatedDate.toISOString(),
            }, { withCredentials: true });
            if (response.data.modifiedCount > 0) {
                toast.success("Booking updated successfully");
                fetchMyBookings();
            }
        } catch (error) {
            console.error("Error updating booking:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsUpdateModalOpen(false);
            setSelectedBooking(null);
        }
    };

    return (
        <div className="container mx-auto py-12">
            <h2 className="text-3xl font-bold text-center mb-8">My Bookings</h2>

            {isLoading ? (
                <p className="text-center text-gray-500">Loading bookings...</p>
            ) : bookings.length === 0 ? (
                <p className="text-center text-gray-500">You have no bookings yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Responsive grid */}
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
                        >
                            {/* Image with Placeholder Handling */}
                            <img
                                src={booking.image}
                                alt={booking.roomName}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{booking.roomName}</h3>
                                {booking.date && (
                                    <p className="text-gray-600 text-sm mb-4">
                                        Booked for: {format(new Date(booking.date), "MM/dd/yyyy")}
                                    </p>
                                )}

                                {/* Buttons with Improved Alignment and Responsiveness */}
                                <div className="flex flex-col md:flex-row md:space-x-4 mt-4"> {/* Stack buttons on mobile */}
                                    <button
                                        onClick={() => handleReviewClick(booking)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto mb-2 md:mb-0" // Full width on mobile
                                        disabled={booking.reviewSubmitted}
                                    >
                                        {booking.reviewSubmitted ? "Reviewed" : "Write Review"}
                                    </button>
                                    <button onClick={() => handleUpdateClick(booking)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto mb-2 md:mb-0">
                                        Update Date
                                    </button>
                                    <button onClick={() => handleCancelBooking(booking._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Review Modal */}
            {showReviewModal && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 shadow-md relative">
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowReviewModal(false)}
                        >
                            &times;
                        </button>
                        <ReviewForm
                            roomId={selectedBooking.roomId}
                            userId={user?.uid}
                            onReviewSubmit={() => {
                                toast.success("Review submitted successfully!");

                                setShowReviewModal(false);
                            }}
                        />
                    </div>
                </div>
            )}


            {/* Update Booking Modal */}
            {isUpdateModalOpen && selectedBooking && (
                <UpdateBookingModal
                    booking={selectedBooking}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onSubmit={handleUpdateBooking}
                />
            )}

            {isCancellationModalOpen && (
                <CancellationModal
                    onClose={() => setIsCancellationModalOpen(false)}
                    onConfirm={confirmCancelBooking}
                />
            )}
        </div>
    );
};

export default MyBookings;
