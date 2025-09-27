import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// This is the standalone Navbar component
const Navbar = () => (
    <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
                Shia Fest 2025
            </Link>
            <div className="flex space-x-4">
                <NavLink 
                    to="/" 
                    className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    Leaderboards
                </NavLink>
                <NavLink 
                    to="/programmes" 
                    className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    Programmes
                </NavLink>
                <NavLink 
                    to="/search" 
                    className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    Search
                </NavLink>
            </div>
        </nav>
    </header>
);

export default Navbar;
