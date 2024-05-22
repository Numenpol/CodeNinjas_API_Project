import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URLT = import.meta.env.VITE_API_URLT;
const API_URLM = import.meta.env.VITE_API_URLM;


export const updateData = async (id, data) => {
  let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.patch(`${API_URL}/${id}`, data, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
    return response.data;
  };

  // TASKS

  export const updateDataTask = async (id, data) => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.patch(`${API_URLT}/${id}`, data, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
    return response.data;
  }

  // Projects Members

  export const addMembersToProject = async ({ id, emails }) => {
    // Use destructured parameters
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.patch(`${API_URLM}/${id}`, emails, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
    console.log(response.data);
    return response.data;
  };

  // export const addMembersToProject = async ({ id, members }) => {
  //   const response = await axios.patch(`${API_URLM}/${id}`, { members });
  //   console.log(response.data);
  //   return response.data;
  // };