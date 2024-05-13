import styles from "../styles/StatusDropdown.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../utils/StateContext";
import { createPopper } from '@popperjs/core';


function TaskListTableStatus({ selectedStatus,  task, updateDataTask }) {
  const [isOpen, setIsOpen] = useState(false);
  const { setUpdate } = useContext(StateContext);
  const buttonRef = useRef(null);

  const {
    statusBtn,
    statusMenu,
    statusDo,
    statusProgress,
    statusDone,
    selected,
    // statusInProgress,
    // statusDoneSelected,
  } = styles;
  useEffect(() => {
    let popperInstance;

    if (isOpen) {
      popperInstance = createPopper(buttonRef.current, document.querySelector('.statusMenu'), {
        placement: 'bottom',
      });
    } else {
      if (popperInstance) {
        popperInstance.destroy();
      }
    }

    return () => {
      if (popperInstance) {
        popperInstance.destroy();
      }
    };
  }, [isOpen]);

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
    if (isOpen[id]) {
      setIsOpen(false);
    } else {
      setIsOpen({ [id]: true });
    }
  };
  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
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
        ref={buttonRef}
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
      {isOpen && (
        <div className={`${statusMenu} statusMenu`}>
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