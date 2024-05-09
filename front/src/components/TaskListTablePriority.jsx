import styles2 from "../styles/PriorityDropdown.module.css";
import { useContext, useEffect } from "react";
import { StateContext } from "../utils/StateContext";


function TaskListTablePriority({ isOpens, setIsOpens, task, updateDataTask }) {
  const { setUpdate } = useContext(StateContext);

  const {
    priorityBtn,
    priorityMenu,
    priorityLow,
    priorityMedium,
    priorityHigh,
    selectedPrioLow,
    selectedPrioMed,
    selectedPrioHi,
  } = styles2;

  const handlePriorityUpdate = async (id, newPriority) => {
    try {
      const data = { priority: newPriority };
      await updateDataTask(id, data);
      setUpdate((update) => update + 1);
      setIsOpens(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriorityClick = (id) => {
    setIsOpens((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });
      newState[id] = true;
      return newState;
    });
  };

  const handleClickOutside = (event) => {
    if (event.target.closest(`.${priorityBtn}`) === null) {
      setIsOpens(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="task-priority">
      <button
        type="button"
        onClick={() => handlePriorityClick(task._id)}
        className={`${priorityBtn} ${isOpens[task._id] ? selectedPrioLow : ""}`}
        style={{
          backgroundColor:
            task.priority === "Low"
              ? "#40ADBE"
              : task.priority === "Medium"
              ? "#FDAB3D"
              : task.priority === "High"
              ? "#C0417F"
              : "",
          color:
            task.priority === "Low"
              ? "white"
              : task.priority === "Medium"
              ? "white"
              : task.priority === "High"
              ? "white"
              : "black",
        }}
      >
        {task.priority || String.fromCharCode(9662)}
      </button>
      {isOpens[task._id] && (
        <div className={priorityMenu}>
          <p
            className={priorityLow}
            onClick={() => handlePriorityUpdate(task._id, "Low")}
          >
            Low
          </p>
          <p
            className={priorityMedium}
            onClick={() => handlePriorityUpdate(task._id, "Medium")}
          >
            Medium
          </p>
          <p
            className={priorityHigh}
            onClick={() => handlePriorityUpdate(task._id, "High")}
          >
            High
          </p>
        </div>
      )}
    </div>
  );
}

export default TaskListTablePriority;