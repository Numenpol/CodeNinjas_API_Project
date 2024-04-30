// import "../styles/Project.css";
import { useState, useEffect } from "react";
import styles from "../styles/Project.module.css";

function Project({ project }) {
  const [statusCheck, setStatusCheck] = useState("");

  const { projectName, icon, description, status, overall } = project;

  useEffect(() => {
    setStatusCheck(status);
  }, []);

  const {projectListProject, projectIcon, projectListIcon, projectListName, projectListStatus, projectDone, projectOnHold,projectInProgress, projectOverall, overallBox} = styles;

  return (
    <tr className={projectListProject} title={description}>
      <th className={projectIcon}>
        <img className={projectListIcon} src={icon} alt="icon" />
      </th>
        <td className={projectListName}> {projectName}</td>
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
        <p className={overallBox}>{overall}</p>
      </td>
    </tr>
  );
}

export default Project;
