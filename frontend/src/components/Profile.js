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
    
    
    const {userInfo,setUserInfo,loading,setLoading} = useContext(UserData)
    const imgurl = userInfo && 'http://localhost:3001/' + userInfo.profilePicture
    

   

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
    
     const [phone, setPhone] = useState(userInfo?.phone || "");
    const [birthday, setBirthday] = useState(userInfo?.birthday || "");
    const [gender, setGender] = useState(userInfo?.gender || "");
    const [bio, setBio] = useState(userInfo?.bio || "");

    const editProfile = async (field) => {
        let payload = {};
        const userId = userInfo._id;
        // Determine the field to update
        switch (field) {
            case "phone":
                payload = { phone,userId };
                break;
            case "birthday":
                payload = { birthday,userId };
                break;
            case "gender":
                payload = { gender,userId };
                break;
            case "bio":
                payload = { bio,userId };
                break;
            default:
                return;
        }

        try {
            const response = await axios.put("http://localhost:3001/update-profile", payload, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            // Update local userInfo state with the new value
            setUserInfo((prev) => ({
                ...prev,
                ...payload,
            }));
            console.log()

            // Close editing mode for the field
            if (field === "phone") setEditPhone(false);
            if (field === "birthday") setEditBirth(false);
            if (field === "gender") setEditGender(false);
            if (field === "bio") setEditBio(false);

            console.log("Profile updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const {setIsAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogout = async()=>{
        try{
            setLoading(true)
            const responce = axios.get("http://localhost:3001/logout",{
                headers:{
                    'Content-Type': 'application/json',
                },
                withCredentials:true
            })
            await setIsAuthenticated(false)
            setUserInfo([])
            navigate("/")
            window.location.reload()
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
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
                    {editPhone ? (
                        <div className="mt-2 shadow-2xl">
                            <span className="border w-13 inline-block pl-1">
                                +<input
                                    type="number"
                                    defaultValue={91}
                                    className="w-10 outline-none py-1"
                                    disabled
                                />
                            </span>
                            <input
                                type="text"
                                className="border p-1 px-2 outline-none"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <button
                                className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800 ml-2"
                                onClick={() => editProfile("phone")}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-900">{userInfo?.phone || "N/A"}</p>
                    )}
                </div>
                <a
                    href="#edit"
                    onClick={() => setEditPhone((prev) => !prev)}
                    className="text-blue-600 hover:underline"
                >
                    {editPhone ? "Cancel" : "Edit"}
                </a>
            </div>
            <hr />

            {/* Birthday */}
            <div className="flex justify-between items-center w-full">
                <div className="w-2/3">
                    <h3 className="text-gray-600 text-sm">Birthday</h3>
                    {editBirth ? (
                        <><input
                            type="date"
                            className="border p-1 px-2 outline-none"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                            <button
                                className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800 ml-2"
                                onClick={() => editProfile("birthday")}
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-900">{userInfo? new Date(userInfo.birthday).toUTCString() : "N/A"}</p>
                    )}
                </div>
                <a
                    href="#edit"
                    onClick={() => setEditBirth((prev) => !prev)}
                    className="text-blue-600 hover:underline"
                >
                    {editBirth ? "Cancel" : "Edit"}
                </a>
            </div>
            <hr />

            {/* Identified As */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-gray-600 text-sm">Identified as</h3>
                    {editGender ? (
                        <><select
                            className="border p-1 px-2 outline-none"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <button
                                className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800 ml-2"
                                onClick={() => editProfile("gender")}
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-900">{userInfo?.gender || "N/A"}</p>
                    )}
                </div>
                <a
                    href="#edit"
                    onClick={() => setEditGender((prev) => !prev)}
                    className="text-blue-600 hover:underline"
                >
                    {editGender ? "Cancel" : "Edit"}
                </a>
            </div>
            <hr />

            {/* bio Me */}
            <div className="flex justify-between items-center w-full">
                <div className="w-2/3">
                    <h3 className="text-gray-600 text-sm">About me</h3>
                    {editBio ? (
                        <><textarea
                            id="bio"
                            placeholder="Write something About you"
                            className="w-full h-32 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <button
                                className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800 ml-2"
                                onClick={() => editProfile("bio")}
                            >
                                Save
                            </button></>
                        
                    ) : (
                        <p className="text-gray-900">{userInfo?.bio || "Add a description"}</p>
                    )}
                </div>
                <a
                    href="#edit"
                    onClick={() => setEditBio((prev) => !prev)}
                    className="text-blue-600 hover:underline"
                >
                    {editBio ? "Cancel" : "Edit"}
                </a>
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









export default Profile