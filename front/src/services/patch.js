import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export const addProjectTask = async (id, task) => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.patch(`${API_URL}/${id}`, {tasks: task}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

