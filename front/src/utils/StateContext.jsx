import { createContext, useState, useEffect } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ child }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [projects, setProjects] = useState([]);
    
    const fetchUserData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    const fetchData = async () => {
      try {
        const { data: {projects}} = await getAllData();
        setProjects(projects);
      } catch (error) {
        setError(error.message);
      }
    };
  
    useEffect(() => {
      fetchUserData();
      fetchData()
    }, []);

    return (
        <StateContext.Provider value={{users, error, projects}}>{child}</StateContext.Provider>
    );
};