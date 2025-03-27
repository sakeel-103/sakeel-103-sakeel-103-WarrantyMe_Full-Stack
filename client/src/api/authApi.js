import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getUser = async (token) => {
    const response = await api.get('/auth/user', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};