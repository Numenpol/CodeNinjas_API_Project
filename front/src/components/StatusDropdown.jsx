import React, { useState } from 'react';
import styles from '../styles/StatusDropdown.module.css';
import { useTheme } from "../utils/ThemeContext";

function StatusDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  
  const { theme } = useTheme();

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };
  const { statusBtn, statusMenu, statusDo, statusMenuDark , statusProgress, statusDone, selected, statusInProgress, statusDoneSelected } = styles;

  return (
    <div>
     <button onClick={() => setIsOpen(!isOpen)} className={`${statusBtn} ${selectedStatus && selected}`} style={{ backgroundColor: selectedStatus === "To do" ? '#3372b2' : selectedStatus === "In progress" ? '#7f5db6' : selectedStatus === "Done" ? '#00a167' : '' }}>
  {selectedStatus || String.fromCharCode(9662)}
</button>
      {isOpen && (
        <div className={theme == "light" ? statusMenu : statusMenuDark}>
          <p className={statusDo} onClick={() => handleStatusClick("To do")}>To do</p>
          <p className={statusProgress} onClick={() => handleStatusClick("In progress")}>In progress</p>
          <p className={statusDone} onClick={() => handleStatusClick("Done")}>Done</p>
        </div>
      )}
    </div>
  );
}

export default StatusDropdown;