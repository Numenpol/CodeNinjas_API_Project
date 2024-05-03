import styles from "../styles/StatusDropdown.module.css";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";


function TaskListTableStatus({selectedStatus, isOpen, setIsOpen, task, updateDataTask}) {

    const { setUpdate } = useContext(StateContext);

    const {
        statusBtn,
        statusMenu,
        statusDo,
        statusProgress,
        statusDone,
        selected,
        statusInProgress,
        statusDoneSelected,
      } = styles;

      
      const handleStatusUpdate = async (id, newStatus) => {
        try {
          const data = { status: newStatus };
          await updateDataTask(id, data);
          setUpdate((update) => update + 1);
          setIsOpen(false);
        } catch (error) {
          console.log(error);
        }
      };

    return(
    <div>
    <button
      type="button"
      onClick={() =>
        setIsOpen((prevState) => ({
          ...prevState,
          [task._id]: !prevState[task._id],
        }))
      }
      className={`${statusBtn} ${selectedStatus && selected}`}
      style={{
        backgroundColor:
          task.status === "To do"
            ? "#3372b2"
            : task.status === "In progress"
            ? "#7f5db6"
            : task.status === "Done"
            ? "#00a167"
            : "",
        color:
          task.status === "To do"
            ? "white"
            : task.status === "In progress"
            ? "white"
            : task.status === "Done"
            ? "white"
            : "black",
      }}
      
    >
      {task.status || String.fromCharCode(9662)}
    </button>
    {isOpen[task._id] && (
      <div className={statusMenu}>
        <p
          className={statusDo}
          onClick={() =>
            handleStatusUpdate(task._id, "To do")
          }
        >
          To do
        </p>
        <p
          className={statusProgress}
          onClick={() =>
            handleStatusUpdate(task._id, "In progress")
          }
        >
          In progress
        </p>
        <p
          className={statusDone}
          onClick={() => handleStatusUpdate(task._id, "Done")}
        >
          Done
        </p>
      </div>
    )}
  </div>
  )
}

export default TaskListTableStatus;