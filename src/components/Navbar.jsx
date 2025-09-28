import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        // THE FIX: These classes make the navbar float
        // - 'absolute': Takes the navbar out of the normal page flow.
        // - 'top-0 left-0 w-full': Pins it to the top and makes it full-width.
        // - 'z-10': Ensures it sits on a higher layer than the page content.
        <header className="absolute top-0 left-0 w-full py-4 z-10">
            <nav className="container mx-auto px-4 grid justify-items-center">
                
                {/* This is the only item in the grid, so it will be perfectly centered. */}
                <ul className="bg-white/70 backdrop-blur-md p-2 rounded-full shadow-md flex items-center space-x-1 sm:space-x-2">
                    <li>
                        <NavLink 
                            to="/" 
                            end
                            className={({ isActive }) => 
                                `block px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                    isActive ? 'bg-yellow-400 text-white shadow-sm' : 'text-yellow-400 hover:bg-yellow-100'
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
                                    isActive ? 'bg-yellow-400 text-white shadow-sm' : 'text-yellow-400 hover:bg-yellow-100'
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
                                    isActive ? 'bg-yellow-400 text-white shadow-sm' : 'text-yellow-400 hover:bg-yellow-100'
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
                                    isActive ? 'bg-yellow-400 text-white shadow-sm' : 'text-yellow-400 hover:bg-yellow-100'
                                }`
                            }
                        >
                             <i className="fa fa-search"></i>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;

