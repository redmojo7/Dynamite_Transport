import axios from 'axios';

const baseURL = 'http://localhost:8080/api/trucks/departed';

export const getDepartedTrucks = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        throw new Error('Error occurred during GET request');
    }
};

export const deleteDepartedTrucks = async (truckId) => {
    try {
        const response = await axios.delete(`${baseURL}/${truckId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error occurred during DELETE request');
    }
}