import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export const addProjectTask = async (id, task) => {
    const response = await axios.patch(`${API_URL}/${id}`, {tasks: task})
    return response.data;
}