import Table from "react-bootstrap/Table";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/taskListTable.css";
import TaskListStatusModal from "./TaskListStatusModal";
import { useForm } from "react-hook-form";
import { postDataTask } from "../services/post";

function TaskListTable() {
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      key: "",
      task: "",
      owner: "",
      status: "",
      priority: "",
      timeline: "",
      creationdate: "",
      completiondate: "",
    },
  });

  const formSubmitHandler = async (data) => {
    try {
      await postDataTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <tr>
              <td><input id="key" name="key" type="text" {...register("key")} /></td>
              <td><input id="task" name="task" type="text" {...register("task")} /></td>
              <td><input id="owner" name="owner" type="text" {...register("owner")} /></td>
              <td><input id="status" name="status" type="text" {...register("status")} /></td>
              <td><input id="priority" name="priority" type="text" {...register("priority")} /></td>
              <td><input id="timeline" name="timeline" type="text" {...register("timeline")} /></td>
              <td><input id="creationdate" name="creationdate" type="text" {...register("creationdate")} /></td>
              <td><input id="completiondate" name="completiondate" type="text" {...register("completiondate")} /></td>
            </tr>
          </form>
        </tbody>
      </Table>
      <button type="submit">New task</button>
    </>
  );
}

export default TaskListTable;
