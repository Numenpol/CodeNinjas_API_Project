import { useState, useEffect, useContext, useCallback } from "react";
import styles from "../styles/Project.module.css";
import { StateContext } from "../utils/StateContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";
import { getAllTaskById } from "../services/get";
import { updateData } from "../services/update";

function Project({ project }) {
  const { setprojectId, setShowMenu, setUpdate } = useContext(StateContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { projectName, icon, description, status, tasks, _id } = project;

  const [countDone, setCountDone] = useState(() => {
    return tasks.filter(task => task.status === "Done").length;
  });

  const calculateCounts = useCallback(async () => {
    const { data: { tasks } } = await getAllTaskById(_id);
    let doneCount = 0;
    let inProgressCount = 0;
    tasks.forEach((task) => {
      if (task.status === "Done") doneCount++;
      if (task.status === "In progress") inProgressCount++;
    });
    return { doneCount, inProgressCount };
  }, [_id]);

  const projectStatusCheck = useCallback(async ({ doneCount, inProgressCount }) => {
    let newStatus = "";

    if (tasks.length === 0 || (inProgressCount === 0 && doneCount < tasks.length)) {
      newStatus = "On hold";
    } else if (inProgressCount > 0) {
      newStatus = "In progress";
    } else if (doneCount === tasks.length && tasks.length > 0) {
      newStatus = "Done";
    }

    if (newStatus && newStatus !== status) {
      await updateData(_id, { status: newStatus });
      setUpdate((update) => update + 1);
    }

    setCountDone(doneCount);
  }, [status, tasks.length, _id, setUpdate]);

  useEffect(() => {
    const updateProjectStatus = async () => {
      const counts = await calculateCounts();
      projectStatusCheck(counts);
    };

    updateProjectStatus();
  }, [calculateCounts, projectStatusCheck]);

  const projectClickHandler = () => {
    sessionStorage.setItem("projectid", _id);
    setprojectId(_id);
    setShowMenu(false);
    navigate("/tasklist");
  };

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

  const getStatusClass = () => {
    if (status === "Done") {
      return theme === "light" ? projectDone : projectDoneDark;
    } else if (status === "On hold") {
      return theme === "light" ? projectOnHold : projectOnHoldDark;
    } else if (status === "In progress") {
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
