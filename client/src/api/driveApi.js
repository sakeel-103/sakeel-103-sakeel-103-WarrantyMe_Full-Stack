import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/drive`;

export const saveToDrive = async (letterId, token, googleToken) => {
    try {
        const response = await axios.post(
            `${API_URL}/save/${letterId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-Google-Token': googleToken,
                },
                timeout: 10000,
            }
        );
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(`Failed to save to Google Drive: ${err.response.data?.error || err.response.statusText}`);
        } else if (err.request) {
            throw new Error(`Failed to save to Google Drive: Unable to reach the server at ${API_URL}`);
        } else {
            throw new Error(`Failed to save to Google Drive: ${err.message}`);
        }
    }
};