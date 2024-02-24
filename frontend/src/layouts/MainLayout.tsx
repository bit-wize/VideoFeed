import React from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <div className="flex flex-col justify-center">
                {children}
            </div>
        </div>
    );
}

export default MainLayout;
