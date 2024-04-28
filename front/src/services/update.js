import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URLT = import.meta.env.VITE_API_URLT;


export const updateData = async (id, data) => {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
  };

  // TASKS

  export const updateDataTask = async (id, data) => {
    const response = await axios.patch(`${API_URLT}/${id}`, data);
    return response.data;
  }

  console.log(updateDataTask);