import Table from "react-bootstrap/Table";
// import { useState } from "react";
// import Button from "react-bootstrap/Button";
import "../styles/taskListTable.css";
// import TaskListStatusModal from "./TaskListStatusModal";
import { useForm } from "react-hook-form";
import { updateDataTask } from "../services/update";
import { postDataTask } from "../services/post";
import { useContext, useEffect,  } from "react";
import { StateContext } from "../utils/StateContext";
// import { useEffect } from "react";
import { PencilSquare } from "react-bootstrap-icons";
function TaskListTable() {
  const { tasks, setUpdate } = useContext(StateContext);
  // const [tasks, setTasks] = useState([]);
  
  
  // const [error, setError] = useState(null);

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      key: "",
      task: "",
      owner: "",
      status: "",
      priority: "",
      timeline: new Date(),
      creationdate: new Date(),
      completiondate: new Date()
    },
  });

 

  const formSubmitHandler = async (data) => {
    try {
      await postDataTask(data);
      setUpdate((update) => update + 1);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, newTask) => {
    try {
      const data = { task: newTask }; 
      await updateDataTask(id, data);
      setUpdate((update) => update + 1); 
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
    <div className="allTaskList">
      <form
      onSubmit={handleSubmit(formSubmitHandler)}
      >
        <Table bordered hover bsPrefix="table">
          <thead>
            <tr className="table-header">
              <th className="tasks-key">Key</th>
              <th className="task">Task</th>
              <th className="owner">Owner</th>
              <th className="tasks-status">Status</th>
              <th className="priority">Priority</th>
              <th className="timeline">Timeline</th>
              <th className="creation-date">Creation date</th>
              <th className="completion-date">Completion date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input 
                id="key" 
                name="key" 
                type="text"
                {...register("key")} />
              </td>
              <td>
                <input
                  id="task"
                  name="task"
                  type="text"
                  {...register("task")}
                />
              </td>
              <td>
                <input
                  id="owner"
                  name="owner"
                  type="text"
                  {...register("owner")}
                />
              </td>
              <td>
                <input
                  id="status"
                  name="status"
                  type="text"
                  {...register("status")}
                />
              </td>
              <td>
                <input
                  id="priority"
                  name="priority"
                  type="text"
                  {...register("priority")}
                />
              </td>
              <td>
                <input
                  id="timeline"
                  name="timeline"
                  type="text"
                  {...register("timeline")}
                />
                {}
              </td>
              <td>
                <input
                style={{border: "none"}}
                  id="creationdate"
                  name="creationdate"
                  type="text"
                  {...register("creationdate")}
                />
              </td>
              <td>
                <input
                  id="completiondate"
                  name="completiondate"
                  type="text"
                  {...register("completiondate")}
                />
              </td>
            </tr>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>
                  <input 
                    id={`key-${index}`} 
                    name={`key-${index}`} 
                    type="text"
                    defaultValue={task.key}
                    {...register(`key-${index}`)} />
                </td>
                <td>
                  <input
                    id={`task-${index}`}
                    name={`task-${index}`}
                    type="text"
                    defaultValue={task.task}
                    {...register(`task-${index}`)}
                    onChange={(e) => handleUpdate(task._id, e.target.value)}
                  />
                  <PencilSquare />
                </td>
                <td>
                  <input
                    id={`owner-${index}`}
                    name={`owner-${index}`}
                    type="text"
                    defaultValue={task.owner}
                    {...register(`owner-${index}`)}
                  />
                </td>
                <td>
                  <input
                    id={`status-${index}`}
                    name={`status-${index}`}
                    type="text"
                    defaultValue={task.status}
                    {...register(`status-${index}`)}
                  />
                </td>
                <td>
                  <input
                    id={`priority-${index}`}
                    name={`priority-${index}`}
                    type="text"
                    defaultValue={task.priority}
                    {...register(`priority-${index}`)}
                  />
                </td>
                <td>
                  <input
                    id={`timeline-${index}`}
                    name={`timeline-${index}`}
                    type="text"
                    defaultValue={task.timeline}
                    {...register(`timeline-${index}`)}
                  />
                </td>
                <td>
                  <input
                    style={{border: "none"}}
                    id={`creationdate-${index}`}
                    name={`creationdate-${index}`}
                    type="text"
                    defaultValue={task.creationdate}
                    {...register(`creationdate-${index}`)}
                  />
                </td>
                <td>
                  <input
                    id={`completiondate-${index}`}
                    name={`completiondate-${index}`}
                    type="text"
                    defaultValue={task.completiondate}
                    {...register(`completiondate-${index}`)}
                  />
                </td>
              </tr>
              ))}
          </tbody>
        </Table>
        <input type="submit"/>
        {/* <button type="submit">Add task</button> */}
      </form>
      </div>
      {/* <Button onClick={handleShow}>Mark</Button>
                <TaskListStatusModal show={show} handleClose={handleClose} /> */}
    </>
  );
}

export default TaskListTable;
