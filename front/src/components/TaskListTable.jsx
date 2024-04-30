import Table from "react-bootstrap/Table";
import "../styles/taskListTable.css";
// import TaskListStatusModal from "./TaskListStatusModal";
import { useForm } from "react-hook-form";
import { updateDataTask } from "../services/update";
import { postDataTask } from "../services/post";
import { useContext, useEffect } from "react";
import { StateContext } from "../utils/StateContext";
import { PencilSquare } from "react-bootstrap-icons";
import TaskListTableForm from "./TaskListTableForm";

function TaskListTable() {
  const { tasks, setUpdate, showTask } = useContext(StateContext);
  // const [tasks, setTasks] = useState([]);

  // const [error, setError] = useState(null);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      key: "",
      task: "",
      owner: "",
      status: "",
      priority: "",
      timeline: new Date(),
      creationdate: new Date(),
      completiondate: new Date(),
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
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Table bordered>
            <thead>
              <tr className="table-header">
                <th>Key</th>
                <th>Task</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Timeline</th>
                <th>Creation date</th>
                <th>Completion date</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {tasks.map((task, index) => (
                <tr key={index} className="table-body">
                  <td>
                    <input
                      className="key-name"
                      id={`key-${index}`}
                      name={`key-${index}`}
                      type="text"
                      defaultValue={task.key}
                      {...register(`key-${index}`)}
                    />
                  </td>
                  <td className="task-td">
                    <input
                      className="task-name"
                      id={`task-${index}`}
                      name={`task-${index}`}
                      type="text"
                      defaultValue={task.task}
                      {...register(`task-${index}`)}
                      onChange={(e) => handleUpdate(task._id, e.target.value)}
                    />
                    <PencilSquare className="pencil" />
                  </td>
                  <td>
                    <input
                      className="task-owner"
                      id={`owner-${index}`}
                      name={`owner-${index}`}
                      type="text"
                      defaultValue={task.owner}
                      {...register(`owner-${index}`)}
                    />
                  </td>
                  <td>
                    <input
                      className="task-status"
                      id={`status-${index}`}
                      name={`status-${index}`}
                      type="text"
                      defaultValue={task.status}
                      {...register(`status-${index}`)}
                    />
                  </td>
                  <td>
                    <input
                      className="task-priority"
                      id={`priority-${index}`}
                      name={`priority-${index}`}
                      type="text"
                      defaultValue={task.priority}
                      {...register(`priority-${index}`)}
                    />
                  </td>
                  <td>
                    <input
                      className="task-timeline"
                      id={`timeline-${index}`}
                      name={`timeline-${index}`}
                      type="text"
                      defaultValue={task.timeline}
                      {...register(`timeline-${index}`)}
                    />
                  </td>
                  <td>
                    <input
                      className="task-creationdate"
                      style={{ border: "none" }}
                      id={`creationdate-${index}`}
                      name={`creationdate-${index}`}
                      type="text"
                      defaultValue={task.creationdate}
                      {...register(`creationdate-${index}`)}
                    />
                  </td>
                  <td>
                    <input
                      className="task-completiondate"
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
          {/* <button type="submit">Add task</button> */}
        </form>
        <div className={showTask == true ? "" : "hidden"}>
          <TaskListTableForm />
        </div>
        <input type="submit" />
      </div>
      {/* <Button onClick={handleShow}>Mark</Button>
                <TaskListStatusModal show={show} handleClose={handleClose} /> */}
    </>
  );
}

export default TaskListTable;
