import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Editor from '../components/Editor';
import LetterList from '../components/LetterList';
import { getLetters, createLetter, updateLetter, deleteLetter } from '../api/letterApi';
import { saveToDrive } from '../api/driveApi';
import '../styles/editor.css';

const EditorPage = () => {
    const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const [letters, setLetters] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLetters = async () => {
            if (!isAuthenticated) {
                setError('Please log in to access your letters');
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'http://localhost:5000',
                    },
                });

                const data = await getLetters(token);
                setLetters(data);
            } catch (err) {
                console.error('Detailed Error:', err);
                setError(
                    err.response?.data?.error ||
                    err.message ||
                    'Failed to load letters. Please check your connection or try again.'
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchLetters();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    const handleSave = async (letterData) => {
        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'http://localhost:5000',
                },
            });

            let newLetter;
            if (selectedLetter) {
                newLetter = await updateLetter(selectedLetter._id, letterData, token);
                setLetters(letters.map((l) => (l._id === newLetter._id ? newLetter : l)));
            } else {
                newLetter = await createLetter(letterData, token);
                setLetters([...letters, newLetter]);
            }
            setSelectedLetter(null);
        } catch (err) {
            console.error('Error saving letter:', err);
            alert(err.message || 'Failed to save letter. Please try again.');
        }
    };

    const handleDelete = async (letterId) => {
        if (!window.confirm('Are you sure you want to delete this letter?')) return;

        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'http://localhost:5000',
                },
            });
            await deleteLetter(letterId, token);
            setLetters(letters.filter((letter) => letter._id !== letterId));
            if (selectedLetter && selectedLetter._id === letterId) {
                setSelectedLetter(null);
            }
        } catch (err) {
            console.error('Error deleting letter:', err);
            alert(err.message || 'Failed to delete letter. Please try again.');
        }
    };

    const handleSaveToDrive = async (letterId) => {
        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'http://localhost:5000',
                },
            });
            const googleToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: 'https://www.googleapis.com/auth/drive.file',
                },
            });
            const data = await saveToDrive(letterId, token, googleToken);
            alert(`Letter saved to Google Drive with ID: ${data.fileId}`);
        } catch (err) {
            console.error('Error saving to Google Drive:', err);
            alert(err.message || 'Failed to save to Google Drive. Please try again.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="editor-page">
                <h1>Letter Editor</h1>
                <p>Please log in to access the editor.</p>
                <button onClick={() => loginWithRedirect()}>Log In</button>
            </div>
        );
    }

    return (
        <div className="editor-page">
            <h1>Letter Editor</h1>
            {error && <p className="error-message">{error}</p>}
            {isLoading ? (
                <p>Loading letters...</p>
            ) : (
                <>
                    <Editor onSave={handleSave} letter={selectedLetter} />
                    <LetterList
                        letters={letters}
                        onSelect={setSelectedLetter}
                        onDelete={handleDelete}
                        onSaveToDrive={handleSaveToDrive}
                    />
                </>
            )}
        </div>
    );
};

export default EditorPage;