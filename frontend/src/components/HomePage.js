import React, { useEffect, useState } from 'react';
import "./styles/homepage.css"
import NavBar from './NavBar'
import cities from './cityData';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from './context/SearchContext';

function HomePage() {

    const [serchedCity,setSerchedCity] = useState([{
        "city": "Delhi", 
        "lat": "28.6100", 
        "lng": "77.2300", 
        "country": "India", 
        "iso2": "IN", 
        "admin_name": "Delhi", 
        "capital": "admin", 
        "population": "32226000", 
        "population_proper": "16753235"
    }])

   const {search,setSearch} = useContext(SearchContext)

   const handleSearch = (e)=>{
        setSearch(e.target.value);
   }

   useEffect(()=>{
        let a = cities.filter((city)=> city.city.toLowerCase().includes(search.toLowerCase()));
        a = a.splice(0,10);
        setSerchedCity(a)
        
   },[search])

  return (
    <div className="homepage m-0 p-0 w-full">
        
      <header className="header mt-20 w-full">
        <h1>Find and Rent Your Perfect Room</h1>
        <div className='text-left'>
            <input type="text" placeholder="Search locations..." className="search-bar text-black outline-none" onChange={handleSearch} value={search} />
            <Link to={"/for-rent/:india"} className=''>
                <button className='w-8 h-12 -ml-1 rounded-e-xl bg-yellow-400 text-black'> &gt; </button>
            </Link>
        </div>
        
        <div className='options w-full rounded-2xl p-4 bg-slate-300 w-1/3 '>
            {
                serchedCity.map((city,index)=>{
                    return (
                        <div key={index} className='text-left bg-slate-500 rounded-lg p-2 my-1'>
                            {city.city} , {city.admin_name} </div>
                    )
                })
            }
        </div>

        <div className="actions">
          <Link to={"/for-rent/:"}><button className="find-place">Find a Place</button></Link>
          <Link to={"/list/:"}><button className="list-place">List a Place</button></Link>
        </div>
      </header>

      <section className="popular-cities">
        <h2>Popular Cities</h2>
        <div className="cities-grid">
          <div className="city">New York</div>
          <div className="city">Los Angeles</div>
          <div className="city">San Francisco</div>
          {/* Add more cities as needed */}
        </div>
      </section>

      <section className="trusted-by">
        <h2>Trusted By the World's Best</h2>
        <div className="media-logos">
          {/* Logos from press outlets like Mashable, Lifehacker, etc. */}
        </div>
      </section>

      <footer className="footer w-full">
        <p>Roomster © 2024</p>
        <div className="app-promotion">
          <p>Download our app for the best experience!</p>
          {/* Add app store links */}
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
