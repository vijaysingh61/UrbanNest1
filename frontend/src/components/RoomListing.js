    import React, { useState } from 'react';
    import { FaLocationArrow } from 'react-icons/fa';
    import axios from 'axios'

    const RoomListing = () => {
    const [address,setAddress] = useState("")
    const [images, setImages] = useState([]);
    const [rate, setRate] = useState('');
    const [currency, setCurrency] = useState('INR');
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    
    const [furnished, setFurnished] = useState(false);
    const [measurement, setMeasurement] = useState('');
    const [unit, setUnit] = useState('');
    const [amenities, setAmenities] = useState([]);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    const handleAmenityClick = (amenity) => {
        setAmenities((prev) =>
        prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
        );
    };

    const handleContinue = async (e) => {
        e.preventDefault();

        const roomData = {
            address,
            images, // This now contains Base64 strings
            rate,
            currency,
            headline,
            description,
            measurement,
            unit,
            amenities
        };

        try {
            const res = await axios.post("http://localhost:3001/list", roomData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Room listed successfully:', res.data);
        } catch (error) {
            console.error('Error listing room:', error);
        }
    };

    

    return (
        <form className="max-w-3xl mx-auto p-4 pt-24" onSubmit={handleContinue}>
        <h1 className="text-2xl font-bold mb-4">I'm offering an entire place</h1>

        {/* Monthly Rental Rate */}
        <div className='flex items-center border-2 my-2 px-1'>
            <FaLocationArrow/>
            <input
                type='text' 
                placeholder='Enter Place Address'
                className='p-2 outline-none  w-full'
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                required
            />
        </div>
        <div className="flex space-x-2 items-center mb-4">
            <input
            type="number"
            placeholder="Monthly Rental Rate"
            className="w-full p-2 border rounded"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
            />
            <select
            className="p-2 border rounded"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            {/* Add more currencies as needed */}
            </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
            <label className="block font-medium">Upload Images</label>
            <input type="file" multiple onChange={handleFileUpload} className="p-2 mt-2 border rounded w-full" />
            <div className="grid grid-cols-4 gap-2 mt-2">
            {images.map((image, index) => (
                <div key={index} className="h-24 w-full bg-gray-200 rounded flex items-center justify-center">
                <img src={URL.createObjectURL(image)} alt="preview" className="h-full w-full object-cover rounded" />
                </div>
            ))}
            </div>
        </div>

        {/* Headline */}
        <input
            type="text"
            placeholder="Headline"
            className="w-full p-2 border rounded mb-4"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            required
        />

        {/* Description */}
        <textarea
            placeholder="Description"
            className="w-full p-2 border rounded mb-4"
            rows="4"
            maxLength="200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        />


        {/* Furnished Toggle */}
        <div className="flex items-center mb-4">
            <span className="mr-2 font-medium">Furnished</span>
            <input
            type="checkbox"
            checked={furnished}
            onChange={(e) => setFurnished(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
            />
        </div>

        {/* Measurement */}
        <div className="flex space-x-2 items-center mb-4">
            <input
            type="number"
            placeholder="Measurement"
            className="w-full p-2 border rounded"
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
            required
            />
            <select
            className="p-2 border rounded"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            >
            <option value="sq ft">sq ft</option>
            <option value="m²">m²</option>
            {/* Add more units as needed */}
            </select>
        </div>

        {/* Amenities */}
        <div className="mb-4">
            <div className="font-medium">Amenities</div>
            <div className="grid grid-cols-3 gap-2 mt-2">
            {['WiFi', 'Gym', 'Pool', 'Parking', 'Elevator', 'Security'].map((amenity) => (
                <button
                key={amenity}
                onClick={() => handleAmenityClick(amenity)}
                className={`p-2 border rounded ${amenities.includes(amenity) ? 'bg-gray-200' : ''}`}
                >
                {amenity}
                </button>
            ))}
            </div>
        </div>

        {/* Submit Button */}
        <button type='' className="w-full p-2 bg-gray-800 text-white rounded mt-4">Continue</button>
        </form>
    );
    };

    export default RoomListing;
