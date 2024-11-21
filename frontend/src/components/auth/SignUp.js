import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const SignUp = () => {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const {checkAuthStatus} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        const formData = {
            username,
            email,
            password
        }
        try{
            const responce = await axios.post("http://localhost:3001/signup",formData,{
                header:{
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            console.log(responce.data)
            await checkAuthStatus()
            navigate("/profile/"+responce.data.username)


        }catch(e){
            console.log(e)
        }
        
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center pt-20 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            required 
                            value={username||''}
                            onChange={(e)=>setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-gray-700 font-semibold">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            name="confirm-password" 
                            required 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Sign Up Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-lg transition duration-200"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                {/* Login Link */}
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/login"  className="text-yellow-500 font-semibold hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
