/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const AboutUs = () => {
    const valuesList = [
        "Value 1: Be customer-obsessed",
        "Value 2: Innovate and experiment",
        "Value 3: Collaborate and have fun",
      ];
    return (
        <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Section: Image or Video */}
                    <div className="rounded-lg overflow-hidden">
                        <img
                            src="https://placehold.co/800x600"
                            alt="Hotel Staff"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Section: Content */}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h3>
                        <p className="text-gray-600 mb-4">
                            At Roomify, we're passionate about creating unforgettable experiences for our guests. Since 2024, we've been dedicated to providing exceptional hospitality, comfortable accommodations, and personalized service.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Our journey began with a simple vision: to redefine what it means to stay at a hotel. Today, we're proud to offer a diverse range of rooms and suites to suit every traveler's needs, all set against the backdrop of stunning.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Whether you're here for business or leisure, we invite you to experience the warmth and hospitality that make Roomify a true home away from home.
                        </p>
                    </div>
                </div>

<div className="mt-16">
  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
  <ul>
    {valuesList.map((value, index) => (
      <li key={index} className="mb-2">
        <span className="text-lg font-medium text-gray-600">{value}</span>
      </li>
    ))}
  </ul>
</div>

                {/* Meet the Team (Optional) */}
                {/* ... */}
            </div>
        </div>
    );
};

export default AboutUs;
