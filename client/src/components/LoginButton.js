// frontend/src/components/LoginButton.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect({
            authorizationParams: {
                scope: 'openid profile email https://www.googleapis.com/auth/drive.file',
                connection: 'google-oauth2',
                redirect_uri: window.location.origin,
            },
        });
    };

    return !isAuthenticated ? (
        <button className="login-btn" onClick={handleLogin}>
            Login with Google
        </button>
    ) : null;
};

export default LoginButton;