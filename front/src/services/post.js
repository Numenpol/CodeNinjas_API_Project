import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URLT = import.meta.env.VITE_API_URLT;

export const postData = async (data) => {
    let  response = await axios.post(API_URL, data);
    return response.data;
}
// task
export const postDataTask = async (data) => {
    let  response = await axios.post(API_URLT, data);
    return response.data;
}