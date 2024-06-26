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

export const updateTruck = async (truck) => {
    try {
        console.log('con Updating truck:', `${baseURL}/${truck.id}`);
        const response = await axios.put(`${baseURL}/${truck.id}`, truck);
        return response.data;
    } catch (error) {
        throw new Error('Error occurred during PUT request');
    }
};

export const createTruck = async (newTruckData) => {
    const response = await axios.post(`${baseURL}/`, newTruckData);
    return response.data;
};

export const deleteTruck = async (truckId) => {
    try {
        const response = await axios.delete(`${baseURL}/${truckId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error occurred during DELETE request');
    }
};