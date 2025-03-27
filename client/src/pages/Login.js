import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import '../styles/app.css';

const Login = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/editor');
        }
    }, [isAuthenticated, navigate]);

    if (isLoading) {
        return <div className="login-container">Loading...</div>;
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login to Letter Editor</h1>
                <p className="login-message">Sign in with your Google account to start writing letters.</p>
                <LoginButton />
            </div>
        </div>
    );
};

export default Login;