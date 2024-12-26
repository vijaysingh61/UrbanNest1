import React from 'react';
import { LuMailCheck } from "react-icons/lu";
import { TbDeviceMobileCheck } from "react-icons/tb";
import { MapContainer, TileLayer , Marker, Popup } from 'react-leaflet';
import { FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import "leaflet/dist/leaflet.css";

import L from "leaflet";

// Fix for Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";



const RoomDetail = () => {

    const location = useLocation();
    const roomDetail = location.state?.props;
    //const { roomDetail } = useContext(SearchContext);
    const imgurl = 'http://localhost:3001/' + roomDetail.profile.profilePicture;
    // Setting up the default icon for Leaflet markers
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
    });

    
  return (
    <div className="max-w-4xl mx-auto p-4 pt-32">
      {/* Image Gallery */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2 mb-5 border-gray-300">
        {roomDetail.images.map((image, index) => {
            const imgUrl = "http://localhost:3001/" + image;
            return (
            <div className="relative overflow-hidden h-96" key={index}>
                <img
                src={imgUrl}
                alt="Room"
                className="w-full h-full object-cover"
                />
            </div>
            );
        })}
        </div>


      {/* Listing Details */}
      <div className='flex gap-5 '>
        <div className='w-7/12'>
        <h2 className="text-2xl font-semibold mb-2 capitalize p-1">{roomDetail.headline}</h2>
        <div className="bg-white shadow-md rounded-lg p-4 mb-5 border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <div className="text-gray-700 font-semibold">
                <p className=" font-medium text-gray-400">Price/month</p> ₹{roomDetail.rate} INR
                </div>
                <div className="text-gray-700 font-semibold mt-2">
                <p className=" font-medium text-gray-400">Available Date</p> Immediately
                </div>
            </div>
            <div>
                <div className="text-gray-700 font-semibold">
                <p className=" font-medium text-gray-400">Listing Type</p> Room for Rent
                </div>
            </div>
            </div>

            
        </div>

        <div className="flex gap-4 py-5 px-5 my-4 mb-5 border border-gray-300 shadow-md rounded-lg">
                <div className="flex items-center mr-5 gap-2">
                    <LuMailCheck className='text-2xl' /><span className='text-green-600'> Email Validated</span>
                </div>
                <div className="flex items-center gap-2 ">
                   <TbDeviceMobileCheck className='text-2xl' /> <span className='text-green-600'> Phone Validated</span>
                </div>
        </div>

        {/**map */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-5">
            <div className="flex items-center mb-4">
                <span className="text-green-600 text-lg mr-2"><FiMapPin size={20} /></span>
                <h2 className="text-lg font-semibold capitalize">{roomDetail.address.local+", " + roomDetail.address.city +", " + roomDetail.address.state}</h2>
            </div>
            <div className="h-64 rounded-lg overflow-hidden z-0">
                <MapContainer
                center={roomDetail.address.coordinates}
                zoom={12}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={roomDetail.address.coordinates}>
                    <Popup className=' capitalize'>{roomDetail.address.local }</Popup>
                </Marker>
                
                </MapContainer>
            </div>
            </div>

        {/* Description */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-5 border border-gray-300">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
            {roomDetail.description}
            </p>
        </div>

        {/* Amenities */}
        {roomDetail.amenities[1] &&
            <div className="bg-white shadow-md rounded-lg p-4 mb-5 border border-gray-300">
                <h2 className="text-lg font-semibold mb-2">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roomDetail.amenities.map((amenity) => (
                    <div
                    key={amenity}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-center text-gray-700"
                    >
                    {amenity}
                    </div>
                ))}
                </div>
            </div>
        }

            {/**residence */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">Residence</h2>
                <div className="grid gap-2">
                    <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Building Type:</span>
                    <span className="text-gray-800">Apartment Building (10+ units)</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Furnished:</span>
                    <span className="text-gray-800">{roomDetail.isFurnished?"Yes":"No"}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Measurement:</span>
                    <span className="text-gray-800 font-medium">{roomDetail.measurement + " sq ft" || "N/A"}</span>
                    </div>
                </div>
                </div>

        </div>

        {/* Contact Section */}
        <div className=' mt-12 '>
            <div className="bg-white sticky top-28  shadow-md rounded-lg p-4 mb-5 border border-gray-300 h-fit">
                <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {roomDetail.profile.profilePicture ?
                        <img src={imgurl} className='w-full h-full rounded-full' alt='profile'/> :
                        <FaUser className="text-gray-500 mt-1 " />
                    }
                </div>
                <div className="ml-4">
                    <h3 className="font-semibold">{roomDetail.profile.name}, {roomDetail.profile.age || "age"}</h3>
                </div>
                </div>
                <textarea
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                rows="4"
                placeholder={"Write message to " + roomDetail.profile.name}
                ></textarea>
                <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 mb-2">
                Send Message
                </button>
                <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
                Save
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default RoomDetail;
