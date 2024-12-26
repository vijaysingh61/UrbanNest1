import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const HomeFooter = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10 mt-10 px-4">
            {/* Links Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                <div>
                    <ul>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Press</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Mailbox</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Contact Us</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Sitemap</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Roomster Reviews</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Download App</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Finding a Room</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Renting out a Room</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Megaphone</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Bookmarks</a></li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Support</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Settings</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Affiliate Program</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Tutorial</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Help Center</a></li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">FAQ</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Fair housing</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Terms of Use</a></li>
                        <li className="mb-5"><a href="#" className="hover:underline text-gray-300">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="flex items-center space-x-4 mt-6 lg:mt-0">
                    <a href="#" className="text-green-500"><FaFacebook size={20} /></a>
                    <a href="#" className="text-green-500"><FaTwitter size={20} /></a>
                    <a href="#" className="text-green-500"><FaInstagram size={20} /></a>
                </div>
            </div>

            {/* App Section */}
            <div className="text-center mt-3">
                <p className="mb-5">Download free app</p>
                <div className="flex justify-center items-center space-x-2 mb-4">
                    <span className="text-yellow-500">★</span>
                    <span className="text-yellow-500">★</span>
                    <span className="text-yellow-500">★</span>
                    <span className="text-yellow-500">★</span>
                    <span className="text-yellow-500">★</span>
                </div>
                <div className="flex justify-center space-x-4">
                    <img
                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                        alt="App Store"
                        className="h-8 cursor-pointer"
                        />

                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="Google Play"
                        className="h-8 cursor-pointer"
                    />
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center mt-6">
                <p>UrbanNest © 2024</p>
            </div>
        </footer>
    );
};

export default HomeFooter;
