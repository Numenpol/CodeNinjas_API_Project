import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from "react-date-range";
import { useState, useEffect, useContext } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../styles/TaskListTableTimeLine.css"
import styles from "../styles/TaskListTableTimeLine.module.css"
import { updateDataTask } from '../services/update';
import { StateContext } from "../utils/StateContext";


function TaskListTableTimeLine({ setSelectedTimeLine, task, selectedTimeLine, id}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDateDay, setStartDateDay] = useState(0);
  const [endDateDay, setEndDateDay] = useState(0);
  const [calendarDay, setCalendarDay] = useState();
  const [dateSelection, setDateSelection] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: `selection`,
    }
  ]);
  const [monthNumberDate, setMonthNumberDate] = useState();

  const { setUpdate } = useContext(StateContext);


  const { taskListProgressBar, taskListProgressBarRange, taskListTimeLineButton} = styles;

  const handleShowCalendar = () => {
    setShowCalendar(showCalendar => !showCalendar);
  }

  const getStartFixedDate = (date) => {
    const todayDate = new Date();
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const dateNumber = date.toLocaleDateString("en-US", { day: 'numeric' });
    const dateMonth = date.toLocaleDateString("en-US", {month: 'short'});
    const todayFormattedDate = todayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const todayDateNumber = todayDate.toLocaleDateString("en-US", { day: 'numeric' });
    const todayDateMonth = todayDate.toLocaleDateString("en-US", {month: 'short'});
    if(parseInt(dateNumber)<parseInt(todayDateNumber) && dateMonth == todayDateMonth){
    return todayFormattedDate;    
    } else if (dateMonth != todayDateMonth) {
    return formattedDate;
    } else
    return formattedDate;
  }

  const getNumberFixedDate = (date) => {
    const todayDate = new Date();
    const dateNumber = date.toLocaleDateString("en-US", { day: 'numeric' });
    const dateMonth = date.toLocaleDateString("en-US", {month: 'short'});
    const todayDateNumber = todayDate.toLocaleDateString("en-US", { day: 'numeric' });
    const todayDateMonth = todayDate.toLocaleDateString("en-US", {month: 'short'});
    if(parseInt(dateNumber)<parseInt(todayDateNumber) && dateMonth == todayDateMonth){
    return todayDateNumber;    
    } else if (dateMonth != todayDateMonth) {
    return dateNumber;
    } else
    return dateNumber;
  }

  const getMonthFixedDate = (date) => {
    const dateMonth = date.toLocaleDateString("en-US", {month: 'short'});
    return dateMonth;
  }

  const getMonthNumberFixedDate = (date) => {
    const monthNumber = date.getMonth() + 1;
    return monthNumber;
  }

  const calculateDaysLeftPercentage = () => {
    if (!endDateDay) {
      return 100;
    } if(monthNumberDate) {
      const totalDays = monthNumberDate - startDateDay + 1;
      const daysLeftPercentage = (1 / totalDays) * 100;
      return daysLeftPercentage;    
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


  const handleStatusUpdate = async (id, updateTimeLine) => {
    try {
      const data = { 
        timeline: updateTimeLine,
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
        let startDateMonth = getMonthFixedDate(stat.startDate);
        let startDateMonthNumber = getMonthNumberFixedDate(stat.startDate);
        if (stat.endDate == null) {
          setCalendarDay(startDate);
        } else {
          let endDate = getStartFixedDate(stat.endDate);
          let endDateDay = getNumberFixedDate(stat.endDate);
          let endDateMonth = getMonthFixedDate(stat.endDate);
          let endDateMonthNumber = getMonthNumberFixedDate(stat.endDate);
          if (parseInt(endDateDay)<parseInt(startDateDay) && startDateMonth == endDateMonth) {
            endDate=startDate;
            endDateDay=startDateDay;
          }
          if(startDateMonth != endDateMonth){
            if(startDateMonthNumber<endDateMonthNumber){
            let MonthNumberCount = endDateMonthNumber - startDateMonthNumber;
            MonthNumberCount = MonthNumberCount * 30;
            setMonthNumberDate(MonthNumberCount);
            } else {
            let MonthNumberCount = startDateMonthNumber - endDateMonthNumber;
            MonthNumberCount = MonthNumberCount * 30;
            setMonthNumberDate(MonthNumberCount);
            }
          }
          setStartDateDay(startDateDay);
          setEndDateDay(endDateDay);
          setCalendarDay(`${startDate}-${endDate}`);
          setSelectedTimeLine(calendarDay);
        } 
      } else {
        const dateNumbers = task.match(/\d+/g);
        const dateMonths = task.match(/[A-Za-z]+/g);

        const startDateDay = dateNumbers[0];
        const endDateDay = dateNumbers[1];
        const startDateMonth = dateMonths[0];
        const endDateMonth = dateMonths[1];
        if(startDateMonth != endDateMonth){
          if (parseInt(endDateDay)>parseInt(startDateDay)) {
          let MonthNumberCount = endDateDay+startDateDay;            
          setMonthNumberDate(MonthNumberCount);   
          } else{
          let MonthNumberCount = endDateDay+30;           
          setMonthNumberDate(MonthNumberCount);   
          }
        }
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

  useEffect(() => {
    if (id) {
    handleStatusUpdate(id, selectedTimeLine);      
    }
  }, [id, selectedTimeLine])


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