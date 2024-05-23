import styles2 from "../styles/PriorityDropdown.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../utils/StateContext";
import { createPopper } from '@popperjs/core';
import { useTheme } from "../utils/ThemeContext";

function TaskListTablePriority({ selectedPriority, task, updateDataTask }) {
  const [isOpens, setIsOpens] = useState(false);
  const { setUpdate } = useContext(StateContext);
  const buttonRef = useRef(null);
  const { theme } = useTheme();

  const {
    priorityBtn,
    priorityMenu,
    priorityLow,
    priorityMedium,
    priorityHigh,
    priorityBtnDark,
  } = styles2;

  useEffect(() => {
    let popperInstance;

    if (isOpens) {
      popperInstance = createPopper(buttonRef.current, document.querySelector('.priorityMenu'), {
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
  }, [isOpens]);

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
    if (isOpens[id]) {
      setIsOpens(false);
    } else {
      setIsOpens({ [id]: true });
    }
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
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
        className={`${theme == "light" ? priorityBtn : priorityBtnDark} ${selectedPriority && 'selected'}`}
        ref={buttonRef}
        style={{
          backgroundColor:
            task.priority === "Low" ? "#40ADBE" :
            task.priority === "Medium" ? "#FDAB3D" :
            task.priority === "High" ? "#C0417F" : "",
          color:
            task.priority === "Low" ? "white" :
            task.priority === "Medium" ? "white" :
            task.priority === "High" ? "white" : "",
        }}
      >
        {task.priority || String.fromCharCode(9662)}
      </button>
      {isOpens && (
        <div className={`${priorityMenu} priorityMenu`}>
          <p className={priorityLow} onClick={() => handlePriorityUpdate(task._id, "Low")}>Low</p>
          <p className={priorityMedium} onClick={() => handlePriorityUpdate(task._id, "Medium")}>Medium</p>
          <p className={priorityHigh} onClick={() => handlePriorityUpdate(task._id, "High")}>High</p>
        </div>
      )}
    </div>
  );
}

export default TaskListTablePriority;