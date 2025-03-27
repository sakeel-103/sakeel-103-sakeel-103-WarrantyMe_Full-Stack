import React from 'react';

const LetterList = ({ letters, onSelect, onDelete, onSaveToDrive }) => {
    const handleSaveToDrive = async (letterId) => {
        try {
            await onSaveToDrive(letterId);
        } catch (err) {
            alert('Failed to save to Google Drive. Please try again.');
        }
    };

    return (
        <div className="letter-list">
            <h2>Your Letters</h2>
            {letters.length === 0 ? (
                <p>No letters found. Create a new letter to get started!</p>
            ) : (
                <ul>
                    {letters.map((letter) => (
                        <li key={letter._id}>
                            <span onClick={() => onSelect(letter)}>
                                {letter.title}
                            </span>
                            <div className="letter-actions">
                                <button onClick={() => handleSaveToDrive(letter._id)}>
                                    Save to Drive
                                </button>
                                <button
                                    onClick={() => onDelete(letter._id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LetterList;