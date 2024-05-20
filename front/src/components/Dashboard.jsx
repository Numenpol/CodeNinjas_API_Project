import { useState, useContext, useEffect } from "react";
import checkmarkicon from "../assets/CheckmarkIcon.png";
import penandpapericon from "../assets/PenandpaperIcon.png";
import calendaricon from "../assets/CalendarIcon.png";
import statisticicon from "../assets/StatisticIcon.png";
import styles from "../styles/Dashboard.module.css";
import { StateContext } from "../utils/StateContext";
import { getAllTaskById } from "../services/get";

function Dashboard() {
  const [done, setDone] = useState(0);
  const [inprogress, setInProgress] = useState(0);
  const [onhold, setOnHold] = useState(0);
  const [overall, setOverall] = useState(0);
  const { projects } = useContext(StateContext)

  useEffect(() => {
    let doneCount = 0;
    let inProgressCount = 0;
    let onHoldCount = 0;
    let totalTasks = 0;

    const calculateCounts = async () => {
      for (let project of projects) {
        totalTasks += project.tasks.length;
        const { data: { tasks } } = await getAllTaskById(project._id);
        tasks.forEach((task) => {
          if (task.status === 'Done') {
            doneCount += 1;
          } else if (task.status === 'In progress') {
            inProgressCount += 1;
          } else if (task.status === 'To do') {
            onHoldCount += 1;
          }
        });
      }
      setDone(doneCount);
      setInProgress(inProgressCount);
      setOnHold(onHoldCount);
      setOverall(totalTasks);
    };

    calculateCounts();
  }, [projects]);


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
