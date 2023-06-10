import axios from 'axios';

const baseURL = 'http://localhost:8080/api/trucks';

export const getTrucks = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        throw new Error('Error occurred during GET request');
    }
};

export const updateTruck = async (truckId, updatedTruckData) => {
    try {
        const response = await axios.put(`${baseURL}/${truckId}`, updatedTruckData);
        return response.data;
    } catch (error) {
        throw new Error('Error occurred during PUT request');
    }
};

export const createTruck = async (newTruckData) => {
    try {
        const response = await axios.post(`${baseURL}/`, newTruckData);
        return response.data;
    } catch (error) {
        throw new Error('Error occurred during POST request');
    }
};

export const deleteTruck = async (truckId) => {
    try {
        const response = await axios.delete(`${baseURL}/${truckId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error occurred during DELETE request');
    }
};