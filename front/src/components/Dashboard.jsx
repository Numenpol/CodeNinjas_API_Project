import { useState, useContext, useEffect } from "react";
import checkmarkicon from "../assets/CheckmarkIcon.png";
import penandpapericon from "../assets/PenandpaperIcon.png";
import calendaricon from "../assets/CalendarIcon.png";
import statisticicon from "../assets/StatisticIcon.png";
import styles from "../styles/Dashboard.module.css";
import { StateContext } from "../utils/StateContext";
import { useTheme } from "../utils/ThemeContext";

function Dashboard() {
  const { projects } = useContext(StateContext)
  const { theme } = useTheme();

  const doneCount = projects.filter(project => project.status === 'Done').length;
  const inProgressCount = projects.filter(project => project.status === 'In progress').length;
  const onHoldCount = projects.filter(project => project.status === 'On hold').length;
  const totalProjects = projects.length;

  const { dashboard, dashboardTopBoxes, dashboardBox, checkmarkIcon, dashboardDone, dashboardNumber, penandpaperIcon, dashboardInProgress, dashboardBottomBoxes, calendarIcon, dashboardOnHold, statisticIcon, dashboardOverall , dashboardBoxDark, dashboardNumberDark} = styles;





  return (
    <>
      <div className={dashboard}>
        <div className={dashboardTopBoxes}>
          <div className={theme == "light" ? dashboardBox : dashboardBoxDark}>
            <img
              src={checkmarkicon}
              alt="Checkmark icon"
              className={checkmarkIcon}
            />
            <p className={dashboardDone}>Done</p>
            <div className={theme == "light" ? dashboardNumber : dashboardNumberDark}>{doneCount}</div>
          </div>
          <div className={theme == "light" ? dashboardBox : dashboardBoxDark}>
            <img
              src={penandpapericon}
              alt="Pen and paper icon"
              className={penandpaperIcon}
            />
            <p className={dashboardInProgress}>In Progress</p>
            <div className={theme == "light" ? dashboardNumber : dashboardNumberDark}>{inProgressCount}</div>
          </div>
        </div>
        <div className={dashboardBottomBoxes}>
          <div className={theme == "light" ? dashboardBox : dashboardBoxDark}>
            <img
              src={calendaricon}
              alt="Calendar icon"
              className={calendarIcon}
            />

            <p className={dashboardOnHold}>On Hold</p>
            <div className={theme == "light" ? dashboardNumber : dashboardNumberDark}>{onHoldCount}</div>
          </div>
          <div className={theme == "light" ? dashboardBox : dashboardBoxDark}>
            <img
              src={statisticicon}
              alt="Statistic icon"
              className={statisticIcon}
            />
            <p className={dashboardOverall}>Overall</p>
            <div className={theme == "light" ? dashboardNumber : dashboardNumberDark}>{totalProjects}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
