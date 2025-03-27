import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/letters`;

const handleApiError = (err, operation) => {
    console.error(`API Error during ${operation}:`, err);

    if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        throw new Error(`Failed to ${operation}: ${err.response.data?.error || err.response.statusText}`);
    } else if (err.request) {
        console.error('No response received:', err.request);
        throw new Error(`Failed to ${operation}: Unable to reach the server at ${API_URL}`);
    } else {
        console.error('Error setting up request:', err.message);
        throw new Error(`Failed to ${operation}: ${err.message}`);
    }
};

export const getLetters = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000, // 10 seconds timeout
        });
        return response.data;
    } catch (err) {
        handleApiError(err, 'fetch letters');
    }
};

export const createLetter = async (letterData, token) => {
    try {
        const response = await axios.post(API_URL, letterData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
        });
        return response.data;
    } catch (err) {
        handleApiError(err, 'create letter');
    }
};

export const updateLetter = async (id, letterData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, letterData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
        });
        return response.data;
    } catch (err) {
        handleApiError(err, 'update letter');
    }
};

export const deleteLetter = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
        });
        return response.data;
    } catch (err) {
        handleApiError(err, 'delete letter');
    }
};