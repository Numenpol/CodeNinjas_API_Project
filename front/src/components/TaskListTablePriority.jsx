import styles2 from "../styles/PriorityDropdown.module.css";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";

function TaskListTablePriority({isOpens, setIsOpens, task, updateDataTask}) {

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


    return(
    <div className="task-priority">
    <button
      type="button"
      onClick={() =>
        setIsOpens((prevState) => ({
          ...prevState,
          [task._id]: !prevState[task._id],
        }))
      }
      className={`${priorityBtn} ${
        isOpens[task._id] ? selectedPrioLow : ""
      }`}
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
          onClick={() =>
            handlePriorityUpdate(task._id, "Low")
          }
        >
          Low
        </p>
        <p
          className={priorityMedium}
          onClick={() =>
            handlePriorityUpdate(task._id, "Medium")
          }
        >
          Medium
        </p>
        <p
          className={priorityHigh}
          onClick={() =>
            handlePriorityUpdate(task._id, "High")
          }
        >
          High
        </p>
      </div>
    )}
  </div>
  )
}

export default TaskListTablePriority;