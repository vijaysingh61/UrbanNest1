import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from './context/SearchContext';
import cities from './cityData';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Room from './Room';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AvailableRooms = () => {
    const { search } = useContext(SearchContext);
    const city = cities.find((e) => e.city.toLowerCase().includes(search.toLowerCase()));
    const center = city ? [city.lat, city.lng] : [20.5937, 78.9629]; // Default center to India if no city is found
    const [roomArr,setRoomArr] = useState([]);

    useEffect( ()=>{
        const idk = async()=>{
            try{
                    const responce = await axios.get('http://localhost:3001/get-rooms',{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                //console.log(responce.data)
                setRoomArr(responce.data)
            }catch(e){
                console.log("not get",e)
            }
        }
        idk();
    },[])

    return (
        <div className="flex h-screen pt-20">
            {/* Left Side - Content */}
            <div className="w-3/5 p-5 space-y-4">
                {/* Breadcrumb */}
                <div className="text-gray-500 text-sm">
                    <span className="hover:text-gray-700 cursor-pointer">India</span>
                    {city && <span className="hover:text-gray-700 cursor-pointer"> &gt; {city.admin_name}</span>}
                    {city && <span className="hover:text-gray-700 cursor-pointer"> &gt; {city.city}</span>}
                </div>

                {/* Header */}
                <h1 className="text-2xl font-bold">
                    Rooms for rent in {city && city.city + ","} {city && city.admin_name + ","} India
                </h1>

                {/* Filters */}
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">A room</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Budget</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Filters</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Sort By: Last Activity</button>
                </div>

                {/* Listing Section */}
                <div className='flex justify-between w-full'>
                    <div className="text-lg font-semibold ">{roomArr.length} Rooms For Rent</div>
                    <Link to={"/list/:"}>
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900" >+ Add listing</button>
                    </Link>
                </div>
                

                {/* Placeholder Image */}
                <div className="mt-4 flex flex-wrap ">
                    {roomArr.map((value,index)=>(
                        <Room props={value} key={index} />
                    ))}
                </div>
            </div>

            {/* Right Side - Map */}
            <div className="w-2/5 relative">
                {/* <div className="absolute top-4 right-4 bg-white p-2 rounded-lg z-20 shadow-md flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <label className="text-gray-700">Search as I move the map</label>
                </div> */}
                <div className="w-full fixed h-full bg-gray-200 overflow-hidden -z-10"> 
                    <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default AvailableRooms;
