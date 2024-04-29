import { useState } from "react";
import checkmarkicon from "../assets/CheckmarkIcon.png";
import penandpapericon from "../assets/PenandpaperIcon.png";
import calendaricon from "../assets/CalendarIcon.png";
import statisticicon from "../assets/StatisticIcon.png";
import styles from "../styles/Dashboard.module.css";

function Dashboard() {
  const [done, setDone] = useState(0);
  const [inprogress, setInProgress] = useState(0);
  const [onhold, setOnHold] = useState(0);
  const [overall, setOverall] = useState(0);

  const {dashboard, dashboardTopBoxes, dashboardBox, checkmarkIcon, dashboardDone, dashboardNumber, penandpaperIcon, dashboardInProgress, dashboardBottomBoxes, calendarIcon, dashboardOnHold, statisticIcon, dashboardOverall} = styles;

  return (
    <>
      <div className={dashboard}>
        <div className={dashboardTopBoxes}>
          <div className={dashboardBox}>
            <img
              src={checkmarkicon}
              alt="Checkmark icon"
              className={checkmarkIcon}
            />
            <p className={dashboardDone}>Done</p>
            <div className={dashboardNumber}>{done}</div>
          </div>
          <div className={dashboardBox}>
            <img
              src={penandpapericon}
              alt="Pen and paper icon"
              className={penandpaperIcon}
            />
            <p className={dashboardInProgress}>In Progress</p>
            <div className={dashboardNumber}>{inprogress}</div>
          </div>
        </div>
        <div className={dashboardBottomBoxes}>
          <div className={dashboardBox}>
            <img
              src={calendaricon}
              alt="Calendar icon"
              className={calendarIcon}
            />

            <p className={dashboardOnHold}>On Hold</p>
            <div className={dashboardNumber}>{onhold}</div>
          </div>
          <div className={dashboardBox}>
            <img
              src={statisticicon}
              alt="Statistic icon"
              className={statisticIcon}
            />
            <p className={dashboardOverall}>Overall</p>
            <div className={dashboardNumber}>{overall}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
