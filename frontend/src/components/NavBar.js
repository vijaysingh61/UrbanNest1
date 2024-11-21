import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './context/AuthProvider'

function NavBar() {

    const {isAuthenticated} = useContext(AuthContext);
  return (
    <div className='w-full h-20 fixed z-50'>
        <nav className="bg-yellow-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">
                    <img alt='lodo' className='w-12' src={require('./images/logo.jpg')}></img>
                </Link>
                {isAuthenticated?
                    <Link to={"/profile/:"}>
                        <div className='w-24 text-center p-2 h-11 rounded-xl bg-teal-200'>Profile</div>
                    </Link>:
                    <div className="space-x-4">
                        <Link to="/signup" >
                            <button className="bg-white text-yellow-500 font-semibold px-4 py-2 rounded hover:bg-yellow-100">
                                Sign Up
                            </button>
                        </Link>
                    
                        <Link to="/login" >
                            <button className="bg-yellow-700 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-600">
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