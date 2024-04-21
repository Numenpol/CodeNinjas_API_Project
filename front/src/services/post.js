import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postData = async (data) => {
    let  response = await axios.post(API_URL, data);
    console.log(response.data);
    return response.data;
}