import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URLS = import.meta.env.VITE_API_URLS;
const API_URLT = import.meta.env.VITE_API_URLT;

export const getAllData = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await axios.get(API_URLS);
    return response.data;
}

export const getOne = async (_id)=>{
    const response = await axios.get(`${API_URL}${_id}`);
    return response.data;
};

// Tasks

export const getAllTasks = async () => {
    const response = await axios.get(API_URLT);
    return response.data;
}

