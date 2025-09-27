import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container mx-auto p-4 md:p-8 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
                    Welcome to Shia Fest 2025
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    The official portal for all events, results, and leaderboards. Explore the festival and celebrate the incredible talents of our participants.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link 
                        to="/leaderboard" 
                        className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                    >
                        View Leaderboards
                    </Link>
                    <Link 
                        to="/programmes" 
                        className="w-full sm:w-auto px-8 py-3 font-semibold text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition"
                    >
                        See All Programmes
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
