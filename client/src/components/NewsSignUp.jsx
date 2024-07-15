import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsSignUp = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic email validation (add more robust validation if needed)
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        // Simulate successful subscription (replace with actual backend call)
        toast.success("Thank you for subscribing!");
        setEmail("");
    };

    const validateEmail = (email) => {
        // Basic email validation using a regex (you can customize this)
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 mb-4">
                Get the latest updates on our best deals and exclusive offers!
            </p>

            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow mr-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsSignUp;
