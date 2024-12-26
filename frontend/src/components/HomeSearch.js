import React, { useEffect, useState, useRef } from "react";
import cities from "./cityData";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "./context/SearchContext";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

function HomeSearch({ isHome }) {
  const [serchedCity, setSerchedCity] = useState([
    {
      city: "India",
      lat: "28.6100",
      lng: "77.2300",
      country: "India",
      iso2: "IN",
      admin_name: "India",
      capital: "admin",
      population: "32226000",
      population_proper: "16753235",
    },
  ]);

  const { search, setSearch } = useContext(SearchContext);
  const [search1, setSearch1] = useState("");

  const handleInput = (e) => {
    setSearch1(e.target.value);
  };

  const handleSearchBox = async (e) => {
    setSearch1(e);
    setSearch(e);
    navigate("/for-rent/:");
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    setSearch(search1);
    navigate("/for-rent/:");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    let a = cities.filter((city) =>
      (city.city+" "+city.admin_name).toLowerCase().includes(search1.toLowerCase())
    );
    a = a.splice(0, 5);
    setSerchedCity(a);
  }, [search1, search]);

  const [typing, setTyping] = useState(false);

  // Ref to detect clicks outside
  const mainRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mainRef.current && !mainRef.current.contains(event.target)) {
        setTyping(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

  return (
    <div className="main" ref={mainRef}>
      <div className={`flex ${isHome ? "mb-28 mt-20" : "mt-10"} items-center`}>
        <div className={isHome ? "absolute w-5/12 " : "absolute w-1/3"}>
          <input
            onFocus={() => setTyping(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search Location"
            onChange={handleInput}
            value={search1}
            type="text"
            className={`w-full text-gray-500 text-md font-medium ${
              isHome ? "py-4" : "py-2"
            }  pl-12 pr-8 border rounded-full shadow-lg  outline-none `}
          />
          <span
            className={`absolute left-5 ${
              isHome ? "top-5" : "top-3"
            }  text-gray-500`}
          >
            <FiMapPin size={20} />
          </span>
            <button
                onClick={handleSearch}
              className={`absolute right-5 ${
                isHome ? "top-5" : "top-3"
              }  text-gray-500`}
            >
              <FiArrowRight size={20} />
            </button>
        </div>
      </div>
      <div
        className={`options z-10 rounded-2xl p-4  bg-white shadow-xl ${
          isHome ? "top-96 w-5/12 " : "mt-9 w-1/3 "
        } absolute`}
        style={{ display: typing ? "block" : "none" }}
      >
        {serchedCity.map((city, index) => {
          return (
            <div
              onClick={() => handleSearchBox(city.city)}
              key={index}
              className={`text-left flex items-center gap-2 p-3 my-1 rounded-lg  cursor-pointer bg-gray-100 hover:bg-green-500 hover:text-white`}
            >
              <span className="text-gray-600">
                <FiMapPin size={20} />
              </span>
              <span>
                {city.city?city.city +",":""} {city.admin_name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeSearch;
