import { createContext, useState, useEffect } from 'react';
import { getAllData } from '../services/get';
import { getAllUsers } from '../services/get';
import { getAllTasks } from '../services/get';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [icon, setIcon] = useState("")
    const [update, setUpdate] = useState(0);
    const [show, setShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [projectId, setprojectId] = useState("");
    const [showEdit, setShowEdit] = useState(false);


    const handleShow = () => setShow(true);

    const fetchUserData = async () => {
      try {
        const {data: {users}} = await getAllUsers();
        setUsers(users);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchTasks = async () => {
      try {
        const {data: {tasks}} = await getAllTasks();
        setTasks(tasks);
      } catch (error) {
        setError(error.message);
      }
    }

    const fetchData = async () => {
      try {
        const { data: {projects}} = await getAllData();
        setProjects(projects);
      } catch (error) {
        setError(error.message);
      }
    };

  const handleResize = () => {
      if (window.innerWidth > 1440) {
          setShowMenu(false);
      }
  };

    useEffect(() => {
      fetchUserData();
      fetchData();
      fetchTasks();
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
    }, [update]);

    return (
        <StateContext.Provider value={{users, error, projects,tasks, setUpdate, setIcon, icon, show, setShow, 
          showMenu, setShowMenu, handleShow, setShowTask, showTask, setprojectId, projectId, setShowEdit, showEdit, update}}>
            {children}
            </StateContext.Provider>
    );
};