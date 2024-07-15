import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const Main = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar></Navbar>
            {/* Outlet */}
            <div className='container mx-auto min-h-[calc(100vh-306px)]'>
                <Outlet></Outlet>
            </div>
            {/* Footer */}
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;