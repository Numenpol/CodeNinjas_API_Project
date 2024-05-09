import styles from "../styles/StatusDropdown.module.css";
import { useContext, useEffect } from "react";
import { StateContext } from "../utils/StateContext";

function TaskListTableStatus({ selectedStatus, isOpen, setIsOpen, task, updateDataTask }) {
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

  const handleStatusClick = (id) => {
    setIsOpen((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });
      newState[id] = true;
      return newState;
    });
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(`.${statusBtn}`)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="task-status">
      <button
        type="button"
        onClick={() => handleStatusClick(task._id)}
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
            onClick={() => handleStatusUpdate(task._id, "To do")}
          >
            To do
          </p>
          <p
            className={statusProgress}
            onClick={() => handleStatusUpdate(task._id, "In progress")}
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
  );
}

export default TaskListTableStatus;