import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { isValid } from 'date-fns';

const UpdateBookingModal = ({ booking, onClose, onSubmit }) => {
    const [updatedDate, setUpdatedDate] = useState(new Date(booking.date));
    const [dateError, setDateError] = useState(null);

    const handleDateChange = (date) => {
        setUpdatedDate(date);
        setDateError(null);
    };

    const handleSubmit = () => {
        if (isValid(updatedDate)) {
            onSubmit(updatedDate);
        } else {
            setDateError('Invalid date selected');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Update Booking Date</h2>
                <DatePicker
                    selected={updatedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                />

                {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-3">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBookingModal;
