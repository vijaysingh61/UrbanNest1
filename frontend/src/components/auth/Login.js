import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    const {checkAuthStatus} = useContext(AuthContext)
    

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData  = {
            email,
            password
        }

        try{
            const responce = await axios.post("https://localhost:3001/login",formData,{
                header:{
                    'Content-Type' : 'application/json'
                },
                 withCredentials: true
            })
            await checkAuthStatus()
            navigate("/profile/"+responce.data.name)

        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center pt-40 pb-24">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Log In to Your Account</h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            value = {email}
                            onChange = {(e)=>setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Login Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition duration-200"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-gray-500 font-semibold hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
