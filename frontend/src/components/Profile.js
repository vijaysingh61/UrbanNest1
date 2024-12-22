import React, { useContext } from 'react'
import { Link } from 'react-router-dom'


function Profile() {

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 min-h-screen pt-24 justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Profile info</h2>
            <Link to={"/mylisting"}><button className="px-4 py-1 bg-gray-800 text-white rounded-lg text-sm">My Listingcy</button></Link>
            </div>
            <div className="space-y-4">
            <div>
                <h3 className="text-gray-600 text-sm">First name</h3>
                <p className="text-gray-900">Vijay</p>
            </div>
            <div>
                <h3 className="text-gray-600 text-sm">Last name</h3>
                <p className="text-gray-900">Dingh</p>
            </div>
            <div>
                <h3 className="text-gray-600 text-sm">Phone number</h3>
                <p className="text-gray-900">+176 94****0987</p>
            </div>
            <div>
                <h3 className="text-gray-600 text-sm">Birthday</h3>
                <p className="text-gray-900 flex items-center">Nov 11, 1990 <a href="w" className="ml-2 text-blue-600 text-sm">Edit</a></p>
            </div>
            <div>
                <h3 className="text-gray-600 text-sm">Identified as</h3>
                <p className="text-gray-900 flex items-center">He/Him <a href="w" className="ml-2 text-blue-600 text-sm">Edit</a></p>
            </div>
            <div>
                <h3 className="text-gray-600 text-sm">Languages I speak</h3>
                <a href="w" className="text-blue-600 text-sm">Add</a>
            </div>
            <div>
                <h3 className="text-gray-600 text-sm">About me</h3>
                <a href="w" className="text-blue-600 text-sm">Add</a>
            </div>
            </div>
        </div>

        <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-lg shadow flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-4xl">
            <span>👤</span>
            </div>
            <button className="px-4 py-1 bg-gray-300 text-gray-800 rounded-lg">Add</button>
            <Link to={"/list/:"} >
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">+ Add listing</button>
            </Link> 
        </div>
        

    </div>

  )
}

export default Profile