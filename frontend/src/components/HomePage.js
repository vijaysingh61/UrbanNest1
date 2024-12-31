import React, { useContext } from 'react';


import cities from './cityData';
import { Link, useNavigate } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';
import HomeFeature from './HomeFeature';
import HomeFooter from './HomeFooter';
import HomeSearch from './HomeSearch';
import { SearchContext } from './context/SearchContext';



function HomePage() {
    const { search, setSearch } = useContext(SearchContext);
    const navigate = useNavigate();
    const handleClick = (e)=>{
        setSearch(e);
        navigate("/for-rent/:")
    }

  return (
    <div className="homepage m-0 p-0 w-full  bg-white" >
        
      <header className="header pt-24 w-full pl-10 bg-white">
        <div className='flex  justify-between'>
            <div>
                <div className=" mb-10 pt-10">
                    <h1 className=" text-5xl font-semibold mb-4 text-gray-700 mt-10">Rooms for rent</h1>
                    <p className="text-gray-400 text-xl px-2">Find and rent your perfect room</p>
                </div>
                
                {/* Search Bar */}
                <HomeSearch isHome={true}/>
            </div>
            <img alt='lodo' className='w-2/5' src={require('./images/img.webp')}></img>
        </div>
        
        


        {/* Buttons for Listing and Finding a Place */}
        <div className="flex  gap-24 mb-6 w-full pl-10">
            {/* List a place */}
            <div className="w-2/5 relative cursor-pointer hover:shadow-xl h-48  overflow-hidden rounded-es-[5rem] rounded-se-[5rem] shadow-lg flex flex-col items-center justify-center " 
            ><img className='absolute w-full h-full z-0' src={require('./images/list.jpg')}></img>
            <Link to={"/list/:"}><button className="flex items-center gap-2 relative z-10 bg-gray-800 text-white px-16 py-3 rounded-lg font-semibold">
                    <BsPlusCircle size={20} />
                    List a place
                </button></Link>
            </div>

            {/* Find a place */}
            <div className="w-2/5 overflow-hidden relative cursor-pointer hover:shadow-xl h-48 bg-gray-200 rounded-lg shadow-lg flex rounded-ss-[5rem] rounded-ee-[5rem] flex-col items-center justify-center">
            <img className='absolute w-full h-full z-0' src={require('./images/find.jpeg')}></img>
                <Link to={"/for-rent/:"}><button className="flex items-center relative z-10 gap-2 bg-gray-800 text-white px-16 py-3 rounded-lg font-semibold">
                    <BsPlusCircle size={20} />
                    Find a place
                </button></Link>
            </div>
        </div>
      </header>

      {/** view popular cities */}

       <div className="py-10 px-12">
            <h2 className="text-4xl font-light mb-6">View rooms in popular cities</h2>
            <div className="grid grid-cols-5 gap-4">
                {cities.slice(0,10).map((city, index) => (
                    <div
                        onClick={()=>handleClick(city.city)}
                        key={index}
                        className="relative rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg "
                    >
                        <img
                            src={city.image}
                            alt={city.city}
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                            <p className="text-white font-medium p-2">{city.city}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/**news */}
        <div className="p-10  bg-white">
            {/* Heading */}
            <h2 className="text-left text-3xl font-light text-gray-700 mb-10">
                Trusted by India's best
            </h2>

            {/* Logos */}
            <div className="flex justify-between items-center flex-wrap mb-6">
                {/* Logo placeholders */}
                <div className="text-gray-400 text-xl font-bold">
                <span className="block p-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    The Hindu
                </span>
                </div>
                <div className="text-gray-400 text-xl font-bold">
                <span className="block p-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    Times of India
                </span>
                </div>
                <div className="text-gray-400 text-xl font-bold">
                <span className="block p-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    Hindustan Times
                </span>
                </div>
                <div className="text-gray-400 text-xl font-bold">
                <span className="block p-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    Indian Express
                </span>
                </div>
                <div className="text-gray-400 text-xl font-bold">
                <span className="block  p-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    Dainik Bhaskar
                </span>
                </div>
            </div>
            <button className="bg-gray-800 text-white text-xl font-semibold px-24 py-3 rounded-lg shadow hover:bg-gray-900 transition">
                More in press
            </button>

            </div>

                {/**homw feature */}
        <HomeFeature/>

        {/**cities */}
        <div className=" px-10">
            <h2 className="text-4xl font-light mb-12">Popular cities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cities.slice(0,50).map((city, index) => (
                    <div key={index} onClick={()=>handleClick(city.city)} className="text-gray-700 font-semibold ">
                       <span className='cursor-pointer hover:underline'>{city.city}</span> 
                    </div>
                ))}
            </div>
        </div>

        <HomeFooter/>

    </div>
  );
}

export default HomePage;
