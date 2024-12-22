    import React, { useEffect, useState } from "react";
    import Room from "./Room";
    import axios from "axios";

    const MyListing = () => {

        const [roomArr,setRoomArr] = useState([]);

        useEffect(()=>{
            const idk = async()=>{
                try{
                    const responce = await axios.get('http://localhost:3001/myListing',{
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials:true
                    })
                    //console.log(responce.data)
                    setRoomArr(responce.data)
                    console.log(responce.data)
                }catch(e){
                    console.log("not get",e)
                }
            }
            idk();
        },[])
return (
    <div className="p-6 bg-gray-100 min-h-screen pt-24 flex flex-col justify-center items-center">
        {/* User Profile Section */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded shadow w-2/3 justify-between">
            
            <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <h2 className="text-xl font-medium">vijay, 34</h2>
            <span className="text-gray-500">♂️</span>
            </div>
            <div className="ml-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm">
            Listings 2
            </div>
        </div>

        {/* Listings Section */}
        <div className="mt-6 flex w-2/3 flex-wrap">
            {/* Listing  */}
            {roomArr.map((value,idx)=>(
                <Room props={value} key={idx}/>
            ))}

        </div>
    </div>
);};

    export default MyListing;
