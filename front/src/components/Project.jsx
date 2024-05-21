import { useState, useEffect, useContext } from "react";
import styles from "../styles/Project.module.css";
import { StateContext } from "../utils/StateContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";
import { getAllTaskById } from "../services/get";

function Project({ project }) {
  const [statusCheck, setStatusCheck] = useState("");
  const [countDone, setCountDone] = useState(0);

  const { setprojectId, setShowMenu } = useContext(StateContext);

  const { projectName, icon, description, status, tasks, _id } = project;

  const { theme } = useTheme();


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

  const {
    projectListProject,
    projectIcon,
    projectListIcon,
    projectListName,
    projectListStatus,
    projectDone,
    projectOnHold,
    projectInProgress,
    projectOverall,
    overallBox,
    projectListNameDark,
    projectDoneDark,
    projectOnHoldDark,
    projectInProgressDark,
    overallBoxDark,
  } = styles;

  const navigate = useNavigate();

  const projectClickHandler = (project) => {
    sessionStorage.setItem("projectid", project._id);
    setprojectId(project._id);
    setShowMenu(false);
    navigate("/tasklist");
  };

  const getStatusClass = () => {
    if (statusCheck === "done") {
      return theme === "light" ? projectDone : projectDoneDark;
    } else if (statusCheck === "on hold") {
      return theme === "light" ? projectOnHold : projectOnHoldDark;
    } else if (statusCheck === "in progress") {
      return theme === "light" ? projectInProgress : projectInProgressDark;
    }
    return "";
  };

  return (
    <tr
      className={projectListProject}
      data-gloss={description}
      onClick={() => {
        projectClickHandler(project);
      }}
    >
      <th className={projectIcon}>
        <img className={projectListIcon} src={icon} alt="icon" />
      </th>
      <td className={theme === "light" ? projectListName : projectListNameDark}>
        {projectName}
      </td>
      <td className={projectListStatus}>
        <p className={getStatusClass()}>{status}</p>
      </td>
      <td className={projectOverall}>
        <p className={theme === "light" ? overallBox : overallBoxDark}>{countDone}/{tasks.length}</p>
      </td>
    </tr>
  );
}

export default Project;
