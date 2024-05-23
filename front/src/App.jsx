import { Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectPage from "./pages/ProjectPage";
import NotFoundPage from "./pages/NotFoundPage";
import TaskListPage from "./pages/TaskListPage";
import { ThemeProvider } from "./utils/ThemeContext";
import { StateProvider } from "./utils/StateContext";

function App() {
  return (
    <>     
    <StateProvider>
      <ThemeProvider>
        <Routes>
          <Route index element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/projects" element={<ProjectPage />}></Route>
          {/* <Route path="/projects/:name" element={<TaskListPage />}></Route> */}
          <Route path="/tasklist" element={<TaskListPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </ThemeProvider>
    </StateProvider> 
    </>
  );
}

export default App;
