// import "../styles/Project.css";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/Project.module.css";
import { StateContext } from "../utils/StateContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";


function Project({ project }) {
  const [statusCheck, setStatusCheck] = useState("");

  const { setprojectId, setShowMenu } = useContext(StateContext)

  const { projectName, icon, description, status, tasks } = project;

  const { theme } = useTheme();

  useEffect(() => {
    setStatusCheck(status);
  }, []);

  const {projectListProject, projectIcon, projectListIcon, projectListName, projectListStatus, projectDone, projectOnHold,projectInProgress, projectOverall, overallBox,projectListNameDark} = styles;

  const navigate = useNavigate();

  const projectClickHandler = (project) => {
    sessionStorage.setItem("projectid", project._id);      
    setprojectId(project._id);
    setShowMenu(false);
    navigate("/tasklist");
}

  return (
    <tr className={projectListProject} data-gloss={description} onClick={() => {projectClickHandler(project)}}>
      <th className={projectIcon}>
        <img className={projectListIcon} src={icon} alt="icon" />
      </th>
        <td className={theme == "light" ? projectListName : projectListNameDark}> {projectName}</td>
      <td className={projectListStatus}>
        <p
          className={
            statusCheck == "done"
              ? projectDone
              : statusCheck == "on hold"
                ? projectOnHold
                : statusCheck == "in progress"
                  ? projectInProgress
                  : ""
          }
        >
          {status}
        </p>
      </td>
      <td className={projectOverall}>
        <p className={overallBox}>{tasks.length}</p>
      </td>
    </tr>
  );
}

export default Project;
