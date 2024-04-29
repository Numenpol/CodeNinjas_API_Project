import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import "../styles/taskListTable.css";
// import TaskListStatusModal from "./TaskListStatusModal";
import { useForm } from "react-hook-form";
import { updateDataTask } from "../services/update";
import { postDataTask } from "../services/post";
import { useContext, useState } from "react";
import { StateContext } from "../utils/StateContext";
import { PencilSquare } from "react-bootstrap-icons";
import styles from "../styles/StatusDropdown.module.css";
function TaskListTable() {
  const { tasks, setUpdate } = useContext(StateContext);
  const [isOpen, setIsOpen] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [open, setOpen] = useState(false);

  const {
    statusBtn,
    statusMenu,
    statusDo,
    statusProgress,
    statusDone,
    selected,
    statusInProgress,
    statusDoneSelected,
  } = styles;
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleStatusClick = (statuss) => {
    setSelectedStatus(statuss);
    setIsOpen(false);
    setOpen(false);
  };

  const { register, handleSubmit, reset } = useForm({
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
      await postDataTask({ ...data, status: selectedStatus });
      setUpdate((update) => update + 1);
      reset();
      setSelectedStatus("");
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
                  <input id="key" name="key" type="text" {...register("key")} />
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
                  {/* <input
                  id="status"
                  name="status"
                  type="text"
                  {...register("status")}
                /> */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpen(!open)}
                      className={`${statusBtn} ${selectedStatus && selected}`}
                      style={{
                        backgroundColor:
                          selectedStatus === "To do"
                            ? "#3372b2"
                            : selectedStatus === "In progress"
                            ? "#7f5db6"
                            : selectedStatus === "Done"
                            ? "#00a167"
                            : "",
                      }}
                    >
                      {selectedStatus || String.fromCharCode(9662)}
                    </button>
                    {open && (
                      <div className={statusMenu}>
                        <p
                          className={statusDo}
                          onClick={() => handleStatusClick("To do")}
                        >
                          To do
                        </p>
                        <p
                          className={statusProgress}
                          onClick={() => handleStatusClick("In progress")}
                        >
                          In progress
                        </p>
                        <p
                          className={statusDone}
                          onClick={() => handleStatusClick("Done")}
                        >
                          Done
                        </p>
                      </div>
                    )}
                  </div>
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
                    style={{ border: "none" }}
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
                      {...register(`key-${index}`)}
                    />
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
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setIsOpen((prevState) => ({
                            ...prevState,
                            [task._id]: !prevState[task._id],
                          }))
                        }
                        className={`${statusBtn} ${selectedStatus && selected}`}
                        style={{
                          backgroundColor:
                            task.status === "To do"
                              ? "#3372b2"
                              : task.status === "In progress"
                              ? "#7f5db6"
                              : task.status === "Done"
                              ? "#00a167"
                              : "",
                        }}
                      >
                        {task.status || String.fromCharCode(9662)}
                      </button>
                      {isOpen[task._id] && (
                        <div className={statusMenu}>
                          <p
                            className={statusDo}
                            onClick={() => handleStatusClick("To do")}
                          >
                            To do
                          </p>
                          <p
                            className={statusProgress}
                            onClick={() => handleStatusClick("In progress")}
                          >
                            In progress
                          </p>
                          <p
                            className={statusDone}
                            onClick={() => handleStatusClick("Done")}
                          >
                            Done
                          </p>
                        </div>
                      )}
                    </div>
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
          <input type="submit" />
          {/* <button type="submit">Add task</button> */}
        </form>
      </div>
      {/* <Button onClick={handleShow}>Mark</Button>
                <TaskListStatusModal show={show} handleClose={handleClose} /> */}
    </>
  );
}

export default TaskListTable;
