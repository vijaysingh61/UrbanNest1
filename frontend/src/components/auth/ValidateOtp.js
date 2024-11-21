import React from 'react';

const ValidateOtp = ({isSubmit}) => {
  return (
    <div className="max-w-md mx-auto p-8 space-y-6 border rounded-md shadow-md pt-36" style={{display : isSubmit?"block":"none"}}>
      <h2 className="text-2xl font-semibold text-center">Enter validation code</h2>
      <p className="text-center text-gray-500">Code sent to +919479310987</p>
      
      <div className="flex justify-center space-x-4">
        <input
          type="text"
          maxLength="1"
          className="w-12 h-12 text-2xl text-center border-b-2 border-gray-300 focus:outline-none focus:border-gray-800"
        />
        <input
          type="text"
          maxLength="1"
          className="w-12 h-12 text-2xl text-center border-b-2 border-gray-300 focus:outline-none focus:border-gray-800"
        />
        <input
          type="text"
          maxLength="1"
          className="w-12 h-12 text-2xl text-center border-b-2 border-gray-300 focus:outline-none focus:border-gray-800"
        />
        <input
          type="text"
          maxLength="1"
          className="w-12 h-12 text-2xl text-center border-b-2 border-gray-300 focus:outline-none focus:border-gray-800"
        />
      </div>
      
      <button className="w-full py-2 mt-4 text-white bg-gray-800 rounded-md hover:bg-gray-700">
        Verify
      </button>
      
      <div className="text-center text-gray-500 mt-4">
        <p>
          Didn’t get the code?{' '}
          <span className="text-green-600 cursor-pointer hover:underline">
            Resend Code
          </span>
        </p>
        <p className="mt-2">OR</p>
        <p>
          Contact{' '}
          <span className="text-green-600 cursor-pointer hover:underline">
            24/7 Support
          </span>.
        </p>
      </div>
    </div>
  );
};

export default ValidateOtp;