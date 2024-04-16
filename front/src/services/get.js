import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getAllData =async()=>{
    const response = await axios.get(`${API_URL}/api/v1/projects`);
    return response.data;
};

export const getOne = async (_id)=>{
    const response = await axios.get(`${API_URL}/api/v1/projects/${_id}`);
    return response.data;
};