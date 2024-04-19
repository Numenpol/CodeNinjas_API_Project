import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import { getAllUsers } from "./services/get";
import { getAllData } from './services/get'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import ProjectPage from "./pages/ProjectPage";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  
  const fetchUserData = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      console.log(data);
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
  }

  useEffect(() => {
    fetchUserData();
    fetchData()
  }, [])

  return (
    <>
      <Header users={users}/>    
      <Routes>
        <Route index element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/projects" element={<ProjectPage projects={projects} error={error}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
