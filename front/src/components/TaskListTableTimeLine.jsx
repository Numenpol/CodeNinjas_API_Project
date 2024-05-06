
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from "react-date-range";
import { useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../styles/taskListTable.css"

function TaskListTableTimeLine() {
    const [showCalendar, setShowCalendar] = useState(false);

    const [state, setState] = useState([
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
        const formattedDate = date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
        return formattedDate;
      }
      
      state.map((stat) => {
        const startDate = getStartFixedDate(stat.startDate);
        console.log(getStartFixedDate(stat.startDate));
      })

//     <input
//     id={`timeline-${index}`}
//     name={`timeline-${index}`}
//     type="text"
//     defaultValue={task.timeline}
//     {...register(`timeline-${index}`)}
//   />


    return(
        <>
        <button className='taskListTimeLineButton' type='button'><ProgressBar now={60} label={"startDate"} onClick={handleShowCalendar}/></button>
        <div className={showCalendar == true ? "" : "hidden"}>
        <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
        </div>

      </>
    )
}

export default TaskListTableTimeLine;