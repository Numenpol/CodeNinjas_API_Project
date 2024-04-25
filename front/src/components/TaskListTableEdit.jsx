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
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
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
      await postDataTask({ ...data });
      reset();
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
          <tr onSubmit={handleSubmit(formSubmitHandler)}>
            <td {...register("key")}>1</td>
            <td {...register("task")}>2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <button type="submit">New task</button>
    </>
  );
}

export default TaskListTable;
