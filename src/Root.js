// Root.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const Root = () => {
    return (
        <div>
            <NavBar/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;
