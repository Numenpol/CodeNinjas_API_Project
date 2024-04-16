import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useState, useEffect } from "react"
import RegisterForm from './components/RegisterForm'
import ProjectList from "./components/ProjectList"
import { getAllData } from './services/get'

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const { data: {projects}} = await getAllData();
      setProjects(projects);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
    <ProjectList projects={projects} error={error}/>
     {/* <Routes>
      <Route index element={<LoginForm />}></Route>
     <Route path='/register' element={<RegisterForm />}></Route>
     </Routes> */}
    </>
  )
}

export default App
