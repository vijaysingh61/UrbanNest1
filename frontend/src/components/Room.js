import React from 'react';
import { FaHeart, FaUser, FaEnvelope, FaPhone, FaMale } from 'react-icons/fa';

const Room = ({props}) => {
    console.log(props)
  return (
    <div className="max-w-sm w-2/5 m-3 rounded overflow-hidden shadow-lg border border-gray-200 bg-white">
      {/* Favorite icon and time badge */}
      <div className="relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
          <FaHeart />
        </button>
        <div className="bg-gray-300 h-40 flex items-center justify-center">
          <FaUser className="text-gray-500 text-6xl" />
        </div>
        <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg">
          about 2 months ago
        </span>
      </div>

      <div className="p-4">
        {/* User Information */}
        <div className="flex items-center space-x-3 mb-2">
          <FaUser className="text-gray-400 w-8 h-8" />
          <div className="text-sm">
            <p className="font-semibold text-gray-800">Rudra, 22 <FaMale className="inline text-gray-500" /></p>
            <p className="text-gray-500">Room for rent | {props.address}</p>
          </div>
        </div>

        {/* Listing Title */}
        <h2 className="text-lg font-bold text-gray-800">New Listing</h2>
        
        {/* Listing Description */}
        <p className="text-gray-600 text-sm mt-2">
            {props.description}
        </p>

        {/* Availability & Rent */}
        <div className="text-sm text-gray-500 mt-4">
          <p>Available Date: <span className="font-semibold text-gray-800">Immediately</span></p>
        </div>
        <div className="text-lg font-bold text-gray-800 mt-2">₹ {props.rate} INR / month</div>

        {/* Validation Icons */}
        <div className="flex space-x-4 items-center mt-4">
          <div className="flex items-center text-gray-600 text-sm">
            <FaEnvelope className="text-green-500 mr-1" /> Email Validated
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <FaPhone className="text-green-500 mr-1" /> Phone Validated
          </div>
        </div>

        {/* Message Button */}
        <button className="mt-4 w-full bg-gray-800 text-white text-sm font-semibold py-2 rounded-lg hover:bg-gray-900">
          Message
        </button>
      </div>
    </div>
  );
};

export default Room;
