import React, { useState } from 'react';
import styles from '../styles/PriorityDropdown.module.css';

function PriorityDropdown() {
  const [isOpens, setIsOpens] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority);
    setIsOpens(false);
  };
  const { priorityBtn, priorityMenu, priorityLow, priorityMedium, priorityHigh, selectedPrioLow, selectedPrioMed, selectedPrioHi } = styles;

  return (
    <div>
      <button type="button" onClick={() => setIsOpens(!isOpens)} className={priorityBtn + (selectedPriority ? ' ' + selectedPrioLow : '')} style={{ backgroundColor: selectedPriority === "Low" ? '#40ADBE' : selectedPriority === "Medium" ? '#FDAB3D' : selectedPriority === "High" ? '#C0417F' : '' }}>
        {selectedPriority || String.fromCharCode(9662)}
      </button>
      {isOpens && (
        <div className={priorityMenu}>
          <p className={priorityLow} onClick={() => handlePriorityClick("Low")}>Low</p>
          <p className={priorityMedium} onClick={() => handlePriorityClick("Medium")}>Medium</p>
          <p className={priorityHigh} onClick={() => handlePriorityClick("High")}>High</p>
        </div>
      )}
    </div>
  );
}

export default PriorityDropdown;