import React from 'react';

const CancellationModal = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
                <p>This action cannot be undone.</p>
                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-3">No</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Yes, Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CancellationModal;
