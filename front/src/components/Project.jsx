// import "../styles/Project.css";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/Project.module.css";
import { StateContext } from "../utils/StateContext";
import { useNavigate } from "react-router-dom";
import { getAllTaskById } from "../services/get";

function Project({ project }) {
  const [statusCheck, setStatusCheck] = useState("");
  const [countDone, setCountDone] = useState(0);

  const { setprojectId, setShowMenu} = useContext(StateContext)

  const { projectName, icon, description, status, tasks, _id } = project;


  const calculateCounts = async () => {
    const { data: { tasks } } = await getAllTaskById(_id);
    let doneCount = 0;
    tasks.map((task) => {
    if (task.status == "Done") {
    doneCount++;
    };
    })
    setCountDone(doneCount);
  };

  useEffect(() => {
    setStatusCheck(status);
    calculateCounts();
  }, []);

  const {projectListProject, projectIcon, projectListIcon, projectListName, projectListStatus, projectDone, projectOnHold,projectInProgress, projectOverall, overallBox} = styles;

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
        <p className={overallBox}>{countDone}/{tasks.length}</p>
      </td>
    </tr>
  );
}

export default Project;
