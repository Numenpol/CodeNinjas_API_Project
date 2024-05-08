import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from "react-date-range";
import { useState, useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../styles/taskListTable.css"
import "../styles/TaskListTableTimeLine.css"

function TaskListTableTimeLine({ setSelectedTimeLine, setSelectedCreationDay, setSelectedCompletionDay, task }) {
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
    if (endDateDay == null) {
      return 100;
    } else {
      const daysLeftPercentage = (startDateDay / endDateDay) * 100;
      return daysLeftPercentage;
    }
  }
  useEffect(() => {
    dateSelection.map((stat) => {
      if (task == null) {
        const startDate = getStartFixedDate(stat.startDate);
        const startDateDay = getNumberFixedDate(stat.startDate);
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
        }
      } else {
        const dateNumbers = task.match(/\d+/g);
        const startDateDay = dateNumbers[0];
        const endDateDay = dateNumbers[1];
        setStartDateDay(startDateDay);
        setEndDateDay(endDateDay);
        setCalendarDay(task);
      }
    })
      , []
  });

  return (
    <>
      <button className='taskListTimeLineButton' type='button'>
      <ProgressBar now={calculateDaysLeftPercentage()} label={calendarDay} onClick={handleShowCalendar} className='taskListProgressBar' />
      </button>
      <div className={showCalendar == true ? "" : "hidden"}>
        <DateRange
          editableDateInputs={true}
          onChange={item => setDateSelection([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateSelection}
          className='range'
        />
      </div>

    </>
  )
}

export default TaskListTableTimeLine;