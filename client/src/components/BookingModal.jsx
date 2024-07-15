import React from 'react';

const BookingModal = ({ room, selectedDate, onClose, onSubmit }) => {
    const { name, description, pricePerNight } = room;
    const formattedDate = selectedDate.toLocaleDateString();

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Confirm Booking</h2>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <p>{description}</p>
                </div>

                <div className="mb-4">
                    <p className="text-lg font-semibold">${pricePerNight}/night</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="bookingDate" className="block text-gray-700 text-sm font-bold mb-2">Booking Date:</label>
                    <p id="bookingDate">{formattedDate}</p>
                </div>

                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                        Cancel
                    </button>
                    <button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
