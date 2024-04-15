import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";

import RegisterForm from "./components/RegisterForm";
import ProjectList from "./components/ProjectList";
import ProjectListPopUp from "./Popup/ProjectListPopUp";
import CreateProjectFormMob from "./components/CreateProjectsForm";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/Projects" element={<ProjectList />}></Route>
        <Route path="/Popup" element={<ProjectListPopUp />}></Route>
        {/* menu pop up */}
        <Route path="/Popup1" element={<CreateProjectFormMob />}></Route>
        {/* Create project popup */}
      </Routes>
    </>
  );
}

export default App;
