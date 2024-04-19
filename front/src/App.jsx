import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterForm from "./components/RegisterForm";
import ProjectList from "./components/ProjectList";
import ProjectListPopUp from "./Popup/ProjectListPopUp";
import CreateProjectFormMob from "./components/CreateProjectsForm";
import "./index.css";
import Header from "./components/Header";
import { getAllUsers } from "./services/get";
import LoginPage from "./pages/LoginPage";
import { getAllData } from './services/get'

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
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/Projects" element={<ProjectList />}></Route>
        <Route path="/Popup" element={<ProjectListPopUp />}></Route>
        {/* menu pop up */}
        <Route path="/Popup1" element={<CreateProjectFormMob />}></Route>
        {/* Create project popup */}
      </Routes>
    <ProjectLists projects={projects} error={error}/>
    </>
  );
}

export default App;
