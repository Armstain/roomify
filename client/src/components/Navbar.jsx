import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider.jsx';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const Links = (
        <>
            <li><NavLink className={({ isActive }) => isActive ? 'font-bold' : ''} to="/rooms">Rooms</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'font-bold' : ''} to="/myBookings">My Bookings</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'font-bold' : ''} to="/about">About</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'font-bold' : ''} to="/contact">Contact</NavLink></li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div to="/" className="navbar-start">
                    <div className="dropdown">
                        <Link to="/" tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </Link>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
                            {Links}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">Roomify</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {Links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='mx-2'>
                        <label className="cursor-pointer grid place-items-center">

                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>
                    </div>

                    {user && user.email ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-left z-30" data-tip={user.displayName || 'User Profile'}>
                                <div className=" rounded-full">
                                    <img referrerPolicy="no-referrer" alt="User Avatar" src={user?.photoURL || 'https://api.lorem.space/image/face?hash=33791'} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a onClick={logOut} >Logout</a></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn mx-4">Login</Link>

                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;