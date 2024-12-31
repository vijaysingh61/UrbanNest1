    import React, { useContext, useEffect, useState } from "react";
    import Room from "./Room";
    import axios from "axios";
import { FaUser } from "react-icons/fa";
import { UserData } from "./context/userData";

    const MyListing = () => {

        const [roomArr,setRoomArr] = useState([]);
        const {userInfo} = useContext(UserData)

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
        const imgurl = userInfo && 'http://localhost:3001/' + userInfo.profilePicture;
return (
    <div className="p-6 bg-gray-100 min-h-screen pt-24 flex flex-col justify-center items-center">
        {/* User Profile Section */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded shadow w-2/3 justify-between">
            <div className="flex items-center">
                <div className=" h-16 w-16 rounded-full flex items-center overflow-hidden bg-gray-200 mx-2  justify-center text-gray-400">
                    {userInfo && userInfo.profilePicture ?                            
                        <img src={imgurl} className="w-full h-full" alt='profile'/> :
                        <FaUser className="text-gray-500 mt-1 text-4xl" />
                    }
                </div>
            <h2 className="text-xl font-medium capitalize">{userInfo && userInfo.name},
                <span className="text-md text-gray-700">{userInfo && userInfo.age || " age"}</span>
            </h2>
            <span className="text-gray-500">♂️</span>
            </div>
            <div className="ml-auto font-semibold bg-gray-200 text-gray-700 px-4 py-2 rounded-sm text-sm">
            Listing : {roomArr.length}
            </div>
        </div>

        {/* Listings Section */}
        <div className="mt-6 flex w-2/3 flex-wrap">
            {/* Listing  */}
            {roomArr.map((value,idx)=>(
                <div key={idx} className="w-1/2 p-2">
                <Room props={value} /></div>
            ))}

        </div>
    </div>
);};

    export default MyListing;
