import React, { useState } from 'react';

const Editor = ({ onSave, letter }) => {
    const [title, setTitle] = useState(letter ? letter.title : '');
    const [content, setContent] = useState(letter ? letter.content : '');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            setError('Title and content are required.');
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            await onSave({ title, content });
            alert('Draft saved successfully!');
            if (!letter) {
                setTitle('');
                setContent('');
            }
        } catch (err) {
            setError(err.message || 'Failed to save draft. Please try again.');
            console.error('Save error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setTitle(letter ? letter.title : '');
        setContent(letter ? letter.content : '');
        setError(null);
    };

    return (
        <div className="editor">
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Letter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSaving}
            />
            <textarea
                placeholder="Write your letter here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSaving}
            />
            <div className="editor-actions">
                <button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Draft'}
                </button>
                {letter && (
                    <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="cancel-btn"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default Editor;