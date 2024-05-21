import { useState, useContext, useEffect } from "react";
import checkmarkicon from "../assets/CheckmarkIcon.png";
import penandpapericon from "../assets/PenandpaperIcon.png";
import calendaricon from "../assets/CalendarIcon.png";
import statisticicon from "../assets/StatisticIcon.png";
import styles from "../styles/Dashboard.module.css";
import { StateContext } from "../utils/StateContext";

function Dashboard() {
  const { projects } = useContext(StateContext)

  const doneCount = projects.filter(project => project.status === 'Done').length;
  const inProgressCount = projects.filter(project => project.status === 'In progress').length;
  const onHoldCount = projects.filter(project => project.status === 'On hold').length;
  const totalProjects = projects.length;

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
            <div className={dashboardNumber}>{doneCount}</div>
          </div>
          <div className={dashboardBox}>
            <img
              src={penandpapericon}
              alt="Pen and paper icon"
              className={penandpaperIcon}
            />
            <p className={dashboardInProgress}>In Progress</p>
            <div className={dashboardNumber}>{inProgressCount}</div>
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
            <div className={dashboardNumber}>{onHoldCount}</div>
          </div>
          <div className={dashboardBox}>
            <img
              src={statisticicon}
              alt="Statistic icon"
              className={statisticIcon}
            />
            <p className={dashboardOverall}>Overall</p>
            <div className={dashboardNumber}>{totalProjects}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
