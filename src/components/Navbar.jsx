import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// This is the standalone Navbar component
const Navbar = () => (
    <header className='p-4'>
        <nav className="container max-auto px-4 grid grid-cols-1 items-center">
            <ul className="bg-white/70 backdrop-blur-md p-2 rounded-full shadow-md justify-self-center flex items-center">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => `block px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-blue-600 hover:bg-blue-100 '}`} 
                    >
                        Leaderboards
                    </NavLink>
                </li>
                
                <li>
                    <NavLink
                        to='/programmes'
                        className={({ isActive })=> `block px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-blue-600 hover:bg-blue-100'}`} 
                    >
                        Programmes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/search'
                        className={({ isActive }) => `block px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-blue-600 hover:bg-blue-100'}`} 
                    >
                        Search
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default Navbar;
