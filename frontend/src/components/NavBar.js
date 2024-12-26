import React, { useContext, useEffect, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { AuthContext } from './context/AuthProvider'
import { FaUser } from 'react-icons/fa';

function NavBar() {
    const location = useLocation();
    const userData = location.state?.data;
    const {isAuthenticated,checkAuthStatus} = useContext(AuthContext);
    useEffect(()=>{
        checkAuthStatus();
    })
    const imgurl = userData && 'http://localhost:3001/' + userData.profilePicture;
  return (
    <div className='w-full h-20 fixed z-50'>
        <nav className="bg-white shadow-lg p-4 h-20 flex items-center z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">
                    <img alt='lodo' className='w-16' src={require('./images/logo.png')}></img>
                </Link>
                {isAuthenticated?
                    <Link to={"/profile/:"}>
                        <div className=" h-7 rounded-md p-5 flex items-center hover:bg-gray-200 justify-center text-gray-400">
                            {userData && userData.profilePicture ?
                                <img src={imgurl} alt='profile'/> :
                                <FaUser className="text-gray-500 mt-1 " />
                            }
                            <p className='text-black mx-2'>vijay</p>
                        </div>
                    </Link>:
                    <div className="space-x-4">
                        <Link to="/signup" >
                            <button className="bg-white text-gray-900 font-semibold px-4 py-2 rounded hover:bg-gray-900 hover:text-white border-2 border-black">
                                Sign Up
                            </button>
                        </Link>
                    
                        <Link to="/login" >
                            <button className="bg-gray-500 text-white font-semibold px-5 py-2 rounded  hover:bg-gray-400 ">
                                Login
                            </button>
                        </Link>
                    </div>
                }
                
                
            </div>
        </nav>

    </div>
  )
}

export default NavBar