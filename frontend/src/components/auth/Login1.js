import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import validator from 'validator';
import ValidateOtp from './ValidateOtp';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

const Login1 = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmit,setIsSubmit] = useState(false);
  
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const validatePhoneNumber = (value) => {
    // Basic validation: phone number length and check if it’s a real number
    if (validator.isMobilePhone(value, 'any', { strictMode: false })) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(phoneNumber === ''){
        setIsValid(false)
        return;
    }
    setIsSubmit(true)
    const phone = {
        phoneNumber
    }
    try{
        const responce = await axios.post("http://localhost:3001/send-otp",phone,{
            headers: {
                    'Content-Type': 'application/json',
                },
        })
        
    }catch(e){
        console.log(e)
    }
    
  };

  return (<>
    <form onSubmit={handleSubmit} id='phone' style={{display : isSubmit?"none":"block"}} className="max-w-md mx-auto p-4 space-y-4 pt-24">
      <h2 className="text-xl font-bold">Enter your mobile phone number to validate or create an account</h2>
      <p className="text-gray-600">VOIP numbers are not accepted.</p>
      
      <div className="flex flex-col space-y-1">
        <label htmlFor="phone" className="text-red-600 font-medium">Phone Number</label>
        <PhoneInput
          country={'us'}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          containerClass="w-full"
          inputClass={`w-full p-2 border rounded ${isValid ? '' : 'border-red-500'}`}
        />
        {!isValid && <span className="text-red-600">Phone number is invalid.</span>}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-gray-800 text-white rounded mt-4 hover:bg-gray-700"
        disabled={!isValid}
      >
        Continue
      </button>
    </form>
    
    <ValidateOtp isSubmit={isSubmit} />
    </>
  );
};

export default Login1;
