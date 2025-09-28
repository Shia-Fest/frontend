import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="py-4">
            <nav className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 items-center justify-items-center md:justify-items-stretch">
                


                {/* THE FIX IS ON THIS LINE: Changed p-2 to py-2 px-4 */}
                <ul className="bg-white/70 backdrop-blur-md py-2 px-4 rounded-full shadow-md flex items-center space-x-1 sm:space-x-2">
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
                            <i class="fa fa-search"></i>
                        </NavLink>
                    </li>
                </ul>

                <div className="hidden md:block md:justify-self-end">
                    {/* Intentionally empty for balance */}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

