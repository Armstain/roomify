import React from 'react';

const ContactUs = () => {
    return (
        <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Get in Touch</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Section: Contact Form */}
                    <form className="bg-white p-8 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Your Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Right Section: Contact Information */}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                        <div className="mb-4">
                            <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                            <p className="text-gray-600">[Your Hotel Address]</p>
                        </div>
                        <div className="mb-4">
                            <i className="fas fa-phone text-blue-600 mr-2"></i>
                            <p className="text-gray-600">[Your Phone Number]</p>
                        </div>
                        <div className="mb-4">
                            <i className="fas fa-envelope text-blue-600 mr-2"></i>
                            <p className="text-gray-600">[Your Email Address]</p>
                        </div>
                        {/* You can add more contact information as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
