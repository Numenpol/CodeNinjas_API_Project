import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URLS = import.meta.env.VITE_API_URLS;
const API_URLT = import.meta.env.VITE_API_URLT;
const VITE_URLO = import.meta.env.VITE_API_URLO;

export const getAllData = async () => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getAllUsers = async () => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.get(API_URLS, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


// get project by ID
export const getOne = async (_id)=>{
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.get(`${API_URL}/${_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Tasks

export const getAllTasks = async () => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.get(API_URLT, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getAllTaskById = async (id) => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.get(`${VITE_URLO}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

// get Search by Projectname

export const getSearchByProjectName = async (value) => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.get(`${API_URL}?projectName=${value}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
}

// get Search by Task name
// export const getSearchByTaskName = async (value) => {
//     let token = JSON.parse(localStorage.getItem("user")).token;
//     const response = await axios.get(`${API_URLT}?taskName=${value}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//     return response.data;
// }

export const getSearchByTaskName = async (id, value) => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.get(`${VITE_URLO}/${id}?task=${value}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

