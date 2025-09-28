import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="py-4">
            {/*
              THE FIX: A Simple, Centered Grid
              - grid: Establishes this as a grid container.
              - justify-items-center: A powerful class that centers all items inside the grid horizontally.
            */}
            <nav className="container mx-auto px-4 grid justify-items-center">
                
                {/* The navigation pill is the only item in the grid, so it will now be perfectly centered. */}
                <ul className="bg-white/70 backdrop-blur-md p-2 rounded-full shadow-md flex items-center space-x-1 sm:space-x-2">
                    <li>
                        <NavLink 
                            to="/" 
                            end
                            className={({ isActive }) => 
                                `block px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                    isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-600 hover:bg-blue-100'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/leaderboards" 
                            className={({ isActive }) => 
                                `block px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                    isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-600 hover:bg-blue-100'
                                }`
                            }
                        >
                            Leaderboards
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/programmes" 
                            className={({ isActive }) => 
                                `block px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                    isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-600 hover:bg-blue-100'
                                }`
                            }
                        >
                            Programmes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/search" 
                            className={({ isActive }) => 
                                `block px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                    isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-600 hover:bg-blue-100'
                                }`
                            }
                        >
                            <i className="fa fa-search"></i> {/* Assuming you have Font Awesome for the icon */}
                        </NavLink>
                    </li>
                </ul>

            </nav>
        </header>
    );
};

export default Navbar;