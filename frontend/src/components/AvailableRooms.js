import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from './context/SearchContext';
import cities,{cities2} from './cityData';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Room from './Room';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HomeSearch from './HomeSearch';
import { AiOutlineHome } from "react-icons/ai";


import L from "leaflet";

// Fix for Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

function findCityWithState(query) {
        for (const [state, cities] of Object.entries(cities2)) {
            const city = cities.find(city => city.toLowerCase() === query.toLowerCase());
            if (city) {
            return { city, state };
            }
        }
        return {"city":"india","state":"india"}; // Return null if no match is found
}

const AvailableRooms = () => {

    // Setting up the default icon for Leaflet markers
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon2x,
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
        });

    const { search } = useContext(SearchContext);
    

    const city = findCityWithState(search);
    const [roomArr,setRoomArr] = useState([]);

    const [bgClick,setBgClick] = useState(false)
    const [bgInput,setBgInput] = useState({
        lower:"",
        upper:""
    })
    const [applyBg,setApplyBg] = useState(true);

    useEffect( ()=>{
        const idk = async()=>{
            
            try{
                const responce = await axios.get('https://urban-nest-mygv.vercel.app/get-rooms',
                {
                     params: {
                        budget: bgInput,
                        location: search,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials:true
                })
                //console.log(responce.data)
                setRoomArr(responce.data)
            }catch(e){
                console.log("not get",e)
            }
        }
        idk();
    },[search,applyBg])

    

    const handleBudgetInput = (e)=>{
        const {name,value} = e.target;
        setBgInput((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handleFilter = ()=>{
        setApplyBg((prev)=>!prev)
        setBgClick(false)
    }    

    

    return (
        <div className="flex  pt-20 pl-2">
            {/* Left Side - Content */}
            <div className="w-1/2 p-5 space-y-4">
                {/* Breadcrumb */}
                <div className="text-gray-500 text-lg font-semibold flex items-center">
                    <span className='mx-1'><AiOutlineHome /> </span>
                    <span className="hover:text-gray-700 cursor-pointer">&gt; India </span>
                    {city && <span className="hover:text-gray-700 mx-1 cursor-pointer"> &gt; {city.state}</span>}
                    {city && <span className="hover:text-gray-700 mx-1 cursor-pointer"> &gt; {city.city}</span>}
                </div>

                {/* Header */}
                <h1 className="text-3xl font-medium">
                    Rooms for rent in {city && city.city + ","} {city && city.state + ","} India
                </h1>

                {/* Filters */}
                <div className="flex space-x-2 ">
                    
                    <button className="px-4 py-2 m-5   rounded-lg hover:border-gray-800  border border-gray-400 " onClick={()=>setBgClick(true)}
                    >Budget</button>
                    {/**Bight slider */}
                    <div style={{display:bgClick?"block":"none"}} className="p-4 bg-white shadow-lg rounded-lg w-80 absolute z-20 mt-20 border border-gray-900">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Select budget</h2>
                            <button onClick={()=>setBgClick(false)} className="text-gray-400 hover:text-black text-2xl -mt-7">&times;</button>
                        </div>

                        {/* <!-- Input fields for range --> */}
                        <div className="flex items-center justify-between space-x-2 mb-4">
                            <input
                            type="number"
                            placeholder="0"
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                            name='lower'
                            value = {bgInput.lower}
                            onChange={handleBudgetInput}
                            />
                            <span className="text-gray-500">-</span>
                            <input
                            type="number"
                            placeholder="500000"
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={bgInput.upper}
                            name='upper'
                            onChange={handleBudgetInput}
                            />
                        </div>

                        

                        {/* <!-- Buttons --> */}
                        <div className="flex justify-between mt-4">
                            <button onClick={()=>setBgClick(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                            Clear
                            </button>
                            <button
                            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
                            onClick={handleFilter}
                            >
                            Show results
                            </button>
                        </div>
                        </div>



                    <HomeSearch isHome={false}/>
                   
                </div>

                {/* Listing Section */}
                <div className='flex justify-between w-full'>
                    <div className="text-2xl font-semibold ">{roomArr.length} Rooms For Rent</div>
                    <Link to={"/list/:"}>
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900" >+ Add listing</button>
                    </Link>
                </div>
                

                {/* Placeholder Image */}
                <div className="mt-4 full  min-h-96 flex flex-wrap ">
                    {roomArr.map((value,index)=>(
                        <div key={index} className='w-1/2 p-2'><Room props={value}  /></div>
                    ))}
                </div>
            </div>

            {/* Right Side - Map */}
            <div className="w-1/2  ">
                <div className="h-[550px] sticky top-24 shadow-xl overflow-hidden z-0">
                <MapContainer
                center={roomArr[0]?roomArr[0].address.coordinates:[21.0000, 78.0000]}
                zoom={5}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {roomArr.map((value,index)=>(
                    <div key={index}><Marker position={value.address.coordinates}>
                        <Popup className=' capitalize'>{value.address.local }</Popup>
                    </Marker></div>
                ))}
                
                
                </MapContainer>
            </div>
            </div>
        </div>
    );
};

export default AvailableRooms;
