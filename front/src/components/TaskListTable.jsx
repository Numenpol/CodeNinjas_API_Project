import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import "../styles/taskListTable.css";
// import TaskListStatusModal from "./TaskListStatusModal";
import { useForm } from "react-hook-form";
import { updateDataTask } from "../services/update";
import { postDataTask } from "../services/post";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../utils/StateContext";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { PersonCircle, CircleFill } from "react-bootstrap-icons";
import TaskListTableForm from "./TaskListTableForm";
import TaskListTableOwner from "./TaskListTableOwner";
import TaskListTableStatus from "./TaskListTableStatus";
import TaskListTablePriority from "./TaskListTablePriority";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteDataTask } from "../services/delete";

function TaskListTable() {
  const { tasks, setUpdate, showTask } = useContext(StateContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  //Priority

  const [isOpens, setIsOpens] = useState({});
  const [selectedPriority, setSelectedPriority] = useState("");

  // Owner
  const [selectedOwner, setSelectedOwner] = useState("");

  // Delete Task

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // const handleOwnerUpdate = async (id, newOwner) => {
  //   try {
  //     const data = { owner: newOwner };
  //     await updateDataTask(id, data);
  //     setUpdate((update) => update + 1);
  //     setIsOpenos(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);



  // const handlePriorityClick = (prioritys) => {
  //   setSelectedPriority(prioritys);
  //   setIsOpens(false);
  //   setOpens(false);
  // };

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
      await postDataTask({
        ...data,
        status: statusBtn,
        priority: selectedPriority,
        owner: selectedOwner,
      });
      setUpdate((update) => update + 1);
      reset();
      setSelectedStatus("");
      setSelectedPriority("");
      setSelectedOwner("");
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

  const handleDeleteTask = async (id) => {
    try {
      await deleteDataTask(id);
      setUpdate((update) => update + 1);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }


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
                  <td className="tasklist-task-field">
                    <input
                      id={`task-${index}`}
                      name={`task-${index}`}
                      type="text"
                      defaultValue={task.task}
                      {...register(`task-${index}`)}
                      onChange={(e) => handleUpdate(task._id, e.target.value)}
                    />
                    <span>
                      <PencilSquare />
                    </span>
                    <span onClick={() => setShow(true)}>
                      <Trash />
                    </span>
                  </td>
                  <td>
                    <TaskListTableOwner task={task} />
                  </td>
                  <td>
                    <TaskListTableStatus selectedStatus={selectedStatus} isOpen={isOpen} setIsOpen={setIsOpen} task={task} updateDataTask={updateDataTask} />
                  </td>
                  <td>
                    <TaskListTablePriority isOpens={isOpens} setIsOpens={setIsOpens} task={task} updateDataTask={updateDataTask} />
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
                  <Modal
                    className="myDeleteModal"
                    show={show}
                  >
                    <Modal.Body>
                      Are You sure You want to delete this task?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="cancelBtn" onClick={handleClose}>
                        <div className="cancelBtnContent">Cancel</div>
                      </Button>
                      <Button className="createBtn" onClick={() => handleDeleteTask(task._id)}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </tr>

              ))}
            </tbody>
          </Table>
          <input style={{ display: "none" }} type="submit" />
        </form>
        <div className={showTask == true ? "" : "hidden"}>
          <TaskListTableForm />
        </div>
      </div>
      {/* <Button onClick={handleShow}>Mark</Button>
                <TaskListStatusModal show={show} handleClose={handleClose} /> */}
    </>
  );
}

export default TaskListTable;
