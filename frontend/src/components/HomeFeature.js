import React from "react";
import { FaHome, FaUserFriends, FaDog } from "react-icons/fa";

const HomeFeature = () => {
    const features = [
        {
            title: "Find a home",
            description:
                "Search rooms for rent and roommates in 192 countries and 18 languages.",
            icon: <FaHome className="w-8 h-8 text-gray-600" />,
        },
        {
            title: "Discover amazing people",
            description:
                "UrbanNest is the most popular and most downloaded roommate finder app with 10M+ Downloads and 20M+ accounts.",
            icon: <FaUserFriends className="w-8 h-8 text-gray-600" />,
        },
        {
            title: "Pets",
            description:
                "UrbanNest is a very pet-friendly roommate finder. Search rooms for rent that will make your pet happy.",
            icon: <FaDog className="w-8 h-8 text-gray-600" />,
        },
    ];

    return (
        <div className="py-10 px-10">
            <h2 className="text-4xl font-thin  mb-10">
                UrbanNest brings places and people together
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 border rounded-lg shadow-sm mx-5 hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeFeature;
