import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from "react-date-range";
import { useState, useEffect, useContext } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../styles/taskListTable.css"
import "../styles/TaskListTableTimeLine.css"
import styles from "../styles/TaskListTableTimeLine.module.css"
import { updateDataTask } from '../services/update';
import { StateContext } from "../utils/StateContext";


function TaskListTableTimeLine({ setSelectedTimeLine, setSelectedCreationDay, setSelectedCompletionDay, task, selectedTimeLine, 
  selectedCreationDay, selectedCompletionDay, id}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDateDay, setStartDateDay] = useState(0);
  const [endDateDay, setEndDateDay] = useState(0);
  const [calendarDay, setCalendarDay] = useState();
  const [dateSelection, setDateSelection] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const { setUpdate } = useContext(StateContext);


  const { taskListProgressBar, taskListProgressBarRange, taskListTimeLineButton} = styles;

  const handleShowCalendar = () => {
    setShowCalendar(showCalendar => !showCalendar);
  }

  const getStartFixedDate = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return formattedDate;
  }

  const getNumberFixedDate = (date) => {
    const dateNumber = date.toLocaleDateString("en-US", { day: 'numeric' });
    return dateNumber;
  }

  const calculateDaysLeftPercentage = () => {
    if (!endDateDay) {
      return 100;
    }
      const totalDays = endDateDay - startDateDay + 1;
      const daysLeftPercentage = (1 / totalDays) * 100;
    return daysLeftPercentage;
  }

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(`.${taskListProgressBar}`) &&
      !event.target.closest(`.${showCalendarElementClass}`)
    ) {
      setShowCalendar(false);
    }
  }; 
   
  const showCalendarElementClass = "taskListTimeLineCalendar";


  const handleStatusUpdate = async (id, updateTimeLine, updateCreationDay, updateCompletionDay) => {
    try {
      const data = { 
        timeline: updateTimeLine,
        creationdate: updateCreationDay,
        completiondate: updateCompletionDay,
       };
      await updateDataTask(id, data);
      setUpdate((update) => update + 1);
      // setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    dateSelection.map((stat) => {
      if (task == null || stat.endDate) {
        let startDate = getStartFixedDate(stat.startDate);
        let startDateDay = getNumberFixedDate(stat.startDate);
        if (stat.endDate == null) {
          setCalendarDay(startDate);
        } else {
          const endDate = getStartFixedDate(stat.endDate);
          const endDateDay = getNumberFixedDate(stat.endDate);
          setStartDateDay(startDateDay);
          setEndDateDay(endDateDay);
          setCalendarDay(`${startDate}-${endDate}`);
          setSelectedTimeLine(calendarDay);
          setSelectedCreationDay(startDate);
          setSelectedCompletionDay(endDate);
          if (task) {
          handleStatusUpdate(id, selectedTimeLine, selectedCreationDay, selectedCompletionDay);            
          }
        } 
      } else {
        const dateNumbers = task.match(/\d+/g);
        const startDateDay = dateNumbers[0];
        const endDateDay = dateNumbers[1];
        setStartDateDay(startDateDay);
        setEndDateDay(endDateDay);
        setCalendarDay(task);
      }
      document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    })
      , []
  });

  return (
    <>
      <button className={taskListTimeLineButton} type='button'>
        <ProgressBar now={calculateDaysLeftPercentage()}
        label={calendarDay}
        onClick={handleShowCalendar}
        className={taskListProgressBar} />
      </button>
      <div className={showCalendar ? showCalendarElementClass : "hidden"}>
        <DateRange
          editableDateInputs={true}
          onChange={item => setDateSelection([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateSelection}
          className={taskListProgressBarRange}
        />
      </div>

    </>
  )
}

export default TaskListTableTimeLine;