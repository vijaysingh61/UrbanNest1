import React, {useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TbCameraPlus } from 'react-icons/tb'
import { AuthContext } from './context/AuthProvider'
import { UserData } from './context/userData'



function Profile() {
    const [editBirth,setEditBirth]  = useState(false)
    const [editBio,setEditBio]  = useState(false)
    const [editPhone,setEditPhone]  = useState(false)
    const [editGender,setEditGender]  = useState(false)
    
    
    const {userInfo,setUserInfo} = useContext(UserData)
    const imgurl = userInfo && 'http://localhost:3001/' + userInfo.profilePicture
    useEffect(()=>{
        console.log(userInfo)
        const idk = async()=>{
            const responce = await axios.get("http://localhost:3001/get-profile",{
                headers: {
                            'Content-Type': 'application/json',
                    },
                withCredentials:true
            })
            setUserInfo(responce.data)
        }
        idk();
    },[])

   

    const handleProfileImg = async(e)=>{
        
        //console.log(profileImage,e.target.files[0])
        const formData = new FormData();
        formData.append("profilePicture",e.target.files[0]);
        try {
            const res = await axios.post("http://localhost:3001/profile-pic", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
            });
            const data = res.data;
            console.log('profile updated successfully:', res.data);
            window.location.reload();
            
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }
    
    const editProfile = async(e)=>{
        e.preventDefault();
        console.log(e.target)
    }

    const {checkAuthStatus} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogout = async()=>{
        try{
            const responce = axios.get("http://localhost:3001/logout",{
                headers:{
                    'Content-Type': 'application/json',
                },
                withCredentials:true
            })
            await checkAuthStatus()
            navigate("/")
            
        }catch(e){
            console.log(e)
        }
    }

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 min-h-screen pt-24 justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-semibold">Profile info</h2>
                
                <button className="px-5 py-1 mt-1 bg-gray-500 font-semibold text-white rounded-md hover:bg-gray-700" onClick={handleLogout}>LogOut</button>
            
            </div>
            <div className="space-y-6">
                {/* First Name */}
                <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-gray-600 text-sm">Full name</h3>
                    <p className="text-gray-900">{userInfo && userInfo.name || "N/A"}</p>
                </div>
                </div>
                
                <hr />

                {/* Email Number */}
                <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-gray-600 text-sm">Email</h3>
                    <p className="text-gray-900">{userInfo && userInfo.email || "N/A"}</p>
                </div>
                </div>
                <hr />

                {/* Phone Number */}
                <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-gray-600 text-sm">Phone number</h3>
                    {editPhone?
                    <div className='mt-2 shadow-2xl '>
                        <input type='number' defaultValue={91} className='w-12 outline-none bg-gray-100 p-1 border-2 '></input>
                        <input type='text' className='border-2 p-1 px-2 outline-none bg-gray-100'></input>
                    </div>:
                    <p className="text-gray-900">{userInfo && userInfo.phone || "N/A"}</p>
                    }
                    
                </div>
                <a href="#edit" onClick={()=>setEditPhone((prev)=>!prev)} className="text-blue-600 hover:underline">{editPhone?"cancel":"Edit"}</a>
                </div>
                <hr />

                {/* Birthday */}
                <div className="flex justify-between items-center w-full">
                <div className='w-2/3'>
                    <h3 className="text-gray-600 text-sm">Birthday</h3>
                    {editBirth?
                       <Birth></Birth> : <p className="text-gray-900">{userInfo && userInfo.birthday || "N/A"}</p>
                    }
                    
                </div>
                <a href="#edit" onClick={()=>setEditBirth((prev)=>!prev)} className="text-blue-600 hover:underline">{editBirth?"cancel":"Edit"}</a>
                </div>
                <hr />

                {/* Identified As */}
                <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-gray-600 text-sm">Identified as</h3>
                    {editGender?<Gender/>:<p className="text-gray-900">{userInfo && userInfo.gender || "N/A"}</p>}
                    
                </div>
                <a href="#edit" onClick={()=>setEditGender((prev)=>!prev)} className="text-blue-600 hover:underline">{editGender?"cancel":"Edit"}</a>
                </div>
                <hr />


                {/* About Me */}
                <div className="flex justify-between items-center w-full">
                <div className='w-2/3'>
                    <h3 className="text-gray-600 text-sm">About me</h3>
                    {editBio?
                        <form className="flex flex-col items-start gap-4 p-4" onSubmit={editProfile}>
                            {/* Text Area */}
                            <div className="w-full">
                                <textarea
                                id="about"
                                placeholder="Write something about you"
                                className="w-full h-32 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                ></textarea>
                                <div className="flex justify-between mt-1 text-sm text-gray-500">
                                <span></span>
                                <span>0/2000</span>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" type='submit'>
                                Save
                            </button>
                        </form>:<p className="text-gray-900">{userInfo && userInfo.about || "Add a description"}</p>}
                    
                </div>
                <a href="#edit" onClick={()=>setEditBio((prev)=>!prev)} className="text-blue-600 hover:underline">{editBio?"cancel":"Edit"}</a>
                </div>
            </div>
            </div>


        <div className="w-full md:w-1/3 lg:w-1/4  space-y-4 flex flex-col items-center ">
            <div className='bg-white p-6 rounded-lg shadow flex flex-col items-center '>
            <div className="w-72 h-72 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-4xl mb-5">
                {userInfo && userInfo.profilePicture ?
                    <img src={imgurl} className='w-full h-full rounded-md' alt='profile'/> :
                    <span>👤</span>
                }
            </div>
            <div className="flex flex-col items-center">
                <label
                htmlFor="file-input"
                className="px-10 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 cursor-pointer"
                >
                <TbCameraPlus className="text-xl inline mx-2" /> Add
                </label>
                <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handleProfileImg}
                />
            </div>
            </div>
            
            <Link to={"/mylisting"}><button className="px-24 py-2 font-semibold bg-gray-400 hover:bg-gray-300 text-gray-900 rounded-lg text-xl">My Listing</button></Link>

            <Link to={"/list/:"} >
                <button className="px-24 py-3 bg-gray-700 font-semibold text-white rounded-lg hover:bg-gray-900">+ Add listing</button>
            </Link> 
            
            
        </div>
        
    </div>

  )
}

function Birth(){
    return (
        <div className="flex  gap-4 w-60 p-4">
            <div className="flex items-center gap-2">
                <label htmlFor="year" className="text-sm">
                Year
                </label>
                <input
                type="text"
                id="year"
                placeholder="1990"
                className="w-14 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="month" className="text-sm">
                Month
                </label>
                <input
                type="text"
                id="month"
                placeholder="11"
                className="w-14 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="day" className="text-sm">
                Day
                </label>
                <input
                type="text"
                id="day"
                placeholder="11"
                className="w-14 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Save
            </button>
            </div>
    )
}


function Gender() {
  return (
    <div className="flex flex-col items-start gap-4 p-4">
      {/* Dropdown */}
      <div>
        <label htmlFor="pronoun" className="sr-only">
          Pronoun
        </label>
        <select
          id="pronoun"
          className="w-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          defaultValue="He/Him"
        >
          <option value="He/Him">He/Him</option>
          <option value="She/Her">She/Her</option>
          <option value="They/Them">They/Them</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Save Button */}
      <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
        Save
      </button>
    </div>
  );
}







export default Profile