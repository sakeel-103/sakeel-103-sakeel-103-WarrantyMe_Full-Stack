// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import '../styles/app.css';

const Navbar = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="navbar-logo">Letter Editor</span>
                </div>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link navbar-link-active">Home</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/editor" className="navbar-link">Editor</Link>
                            <span className="navbar-user">Welcome, {user.name}</span>
                            <LogoutButton />
                        </>
                    ) : (
                        <LoginButton />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;