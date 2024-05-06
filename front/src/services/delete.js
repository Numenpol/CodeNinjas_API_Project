import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const VITE_API_URLT = import.meta.env.VITE_API_URLT;
import { getLogedInUser } from "../utils/auth/authenticate";


export const deleteData = async (id) => {
    const logedInUser = getLogedInUser();
    const token = logedInUser ? logedInUser.token : null;
  
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  export const deleteDataTask = async (id) => {
    const logedInUser = getLogedInUser();
    const token = logedInUser ? logedInUser.token : null;
  
    const response = await axios.delete(`${VITE_API_URLT}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }