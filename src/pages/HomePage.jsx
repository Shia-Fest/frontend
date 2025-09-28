import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <section 
            className="min-h-screen bg-cover bg-center grid grid-cols-1 md:grid-cols-1 " 
            style={{ backgroundImage: "url('/src/assets/images/bg.jpg')" }}
        >
            <div className='min-h-screen grid place-items-center p-4 '>
            <div className="flex flex-col items-center text-center">
                
                <img 
                    src="/src/assets/images/logo.png" // This path points to your 'public' folder
                    alt="College Logo" 
                    className="w-62 mb-6 md:shadow-2xl" 
                />
                
                <p className="text-3xl md:text-5xl text-white font-extrabold font-[poppins] tracking-wider">
                    USTAVERSE'25 
                </p>
                
                <p className="mt-2 text-3xl md:text-4xl font-extrabold font-[poppins] tracking-tight text-white">
                    Moyilarity and modernity
                </p>

                {/* Optional: A Call-to-Action Button */}
                <div className="mt-10">
                    <Link
                        to="/leaderboards"
                        className="px-8 py-3 font-semibold text-yellow-600 bg-white rounded-md hover:bg-gray-200 transition-transform transform hover:scale-105"
                    >
                        #ExploreTheFestival
                    </Link>
                </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;

