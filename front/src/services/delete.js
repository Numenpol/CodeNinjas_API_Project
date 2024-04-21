import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
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