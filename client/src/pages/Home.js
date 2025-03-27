// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/app.css';

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div className="home-container">Loading...</div>;
    }

    return (
        <div className="home-container">
            <div className="home-hero">
                <h1 className="home-title">Welcome to the Letter Editor</h1>
                {isAuthenticated ? (
                    <div className="home-cta">
                        <p className="home-message">
                            Hello, {user.name}! Ready to start writing?
                        </p>
                        <Link to="/editor" className="home-btn home-btn-primary">
                            Go to Editor
                        </Link>
                    </div>
                ) : (
                    <div className="home-cta">
                        <p className="home-message">
                            Please log in to start writing letters.
                        </p>
                        <Link to="/login" className="home-btn home-btn-primary">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;