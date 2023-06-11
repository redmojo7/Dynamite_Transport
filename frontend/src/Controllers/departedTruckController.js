import axios from 'axios';

const baseURL = 'http://localhost:8080/api/trucks/departed';

export const getTruckHistories = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        throw new Error('Error occurred during GET request');
    }
};