import "../styles/dashboard.css"
import { useState } from "react"
import calendaricon from "../assets/CalendarIcon.png"
import checkmarkicon from "../assets/CheckmarkIcon.png"
import penandpapericon from "../assets/PenandpaperIcon.png"
import statisticicon from "../assets/StatisticIcon.png"

function Dashboard() {

    const [done, setDone] = useState(0)
    const [inprogress, setInProgress] = useState(0)
    const [onhold, setOnHold] = useState(0)
    const [overall, setOverall] = useState(0)

    return (
        <>
        <div className="Dashboard">
        <div className="DashboardBox">
            <img src={checkmarkicon} alt="Checkmark icon" className="CheckmarkIcon"/>
            <p className="DashboardDone">Done</p>
            <div className="DashboardNumber">{done}</div>
        </div>
        <div className="DashboardBox">
            <img src={penandpapericon} alt="Pen and paper icon" className="PenandpaperIcon"/> 
            <p className="DashboardInProgress">In Progress</p>
            <div className="DashboardNumber">{inprogress}</div>
        </div>
        <div className="DashboardBox">            
            <img src={calendaricon} alt="Calendar icon" className="CalendarIcon"/>
   
            <p className="DashboardOnHold">On Hold</p>
            <div className="DashboardNumber">{onhold}</div>
        </div>
        <div className="DashboardBox">
            <img src={statisticicon} alt="Statistic icon" className="StatisticIcon"/>
            <p className="DashboardOverall">Overall</p>
            <div className="DashboardNumber">{overall}</div>
        </div>
        </div>
        </>
        )
}

export default Dashboard