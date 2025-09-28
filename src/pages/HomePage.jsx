import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        // The main section is a full-screen grid that centers its content.
        <section className="min-h-screen bg-yellow-400 grid place-items-center p-4">

            {/*
              THE FIX: All content is now inside this single div.
              This single div is what the parent grid will center.
              'flex flex-col items-center' stacks the items vertically inside.
            */}
            <div className="flex flex-col items-center text-center">
                
                {/* Row 1: The Logo */}
                {/* FIX: 'w-75' is not a standard Tailwind class. 'w-64' is a good size. */}
                <img 
                    src="/Group 1111.png" // This path points to your 'public' folder
                    alt="College Logo" 
                    className="w-64 mb-6" 
                />
                
                {/* Row 2: The Motto */}
                <p className="text-3xl md:text-5xl text-white font-bold tracking-wider">
                    Moularity And Modernity
                </p>
                
                {/* Row 3: The College Name */}
                <p className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    Huda Festival 2025
                </p>

                {/* Optional: A Call-to-Action Button */}
                <div className="mt-10">
                    <Link
                        to="/leaderboards"
                        className="px-8 py-3 font-semibold text-yellow-800 bg-white rounded-md hover:bg-gray-200 transition-transform transform hover:scale-105"
                    >
                        #ExploreTheFestival
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomePage;

