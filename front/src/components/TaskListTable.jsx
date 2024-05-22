import Table from "react-bootstrap/Table";
import "../styles/taskListTable.css";
import { useForm } from "react-hook-form";
import { updateDataTask } from "../services/update";
import { postDataTask } from "../services/post";
import { useContext, useState } from "react";
import { StateContext } from "../utils/StateContext";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { deleteDataTask } from "../services/delete";
import TaskListTableForm from "./TaskListTableForm";
import TaskListTableOwner from "./TaskListTableOwner";
import TaskListTableStatus from "./TaskListTableStatus";
import TaskListTablePriority from "./TaskListTablePriority";
import TaskListTableTimeLine from "./TaskListTableTimeLine";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import xIcon from "../assets/xIcon.svg";
import styles from "../styles/TaskListTable.module.css";

function TaskListTable() {
  const { setUpdate, showTask, tasksById, projectId } = useContext(StateContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [isOpens, setIsOpens] = useState({});
  const [selectedPriority, setSelectedPriority] = useState("");

  const [selectedOwner, setSelectedOwner] = useState("");
  const [ownerColor, setOwnerColor] = useState("");
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const [selectedTimeLine, setSelectedTimeLine] = useState();
  const [selectedCreationDay, setSelectedCreationDay] = useState();

  const [timeLineTaskId, setTimeLineTaskId] = useState("");
  const [clickX, setClickX] = useState(null);
  const [clickY, setClickY] = useState(null);

  const { register, handleSubmit, reset } = useForm({
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
      await postDataTask({
        ...data,
        status: selectedStatus,
        priority: selectedPriority,
        owner: [selectedOwner, ownerColor],
        timeline: selectedTimeLine,
        creationdate: selectedCreationDay,
        completiondate: "",
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

  const handlePencilClick = (taskId) => {
    document.getElementById(`task-${taskId}`).focus();
  };

  const handleKeyPress = async (event, taskId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleUpdate(taskId, event.target.value);
      event.target.blur();
    }
  };

  const handleDeleteButtonClick = (event, taskId) => {
    setTaskIdToDelete(taskId);
    setDeleteModalShow(true);
    setClickX(event.clientX);
    setClickY(event.clientY);
  };

  const handleDeleteTask = async () => {
    try {
      await deleteDataTask(taskIdToDelete);
      setUpdate((update) => update + 1);
      handleCloseDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTimeLineClick = (taskId) => {
    setTimeLineTaskId(taskId);
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalShow(false);
    setTaskIdToDelete(null);
  };

  const fitleredTasks = tasksById.filter((task) => task.status === "To do" || task.status === "");

  const { allTaskList, tableHeader, tableHeaderOwnerTh, tableHeaderStatusTh, tableHeaderPriorityTh, tableHeaderCreationDate, tableHeaderCompletionDate, tableBody, tableHeaderKey, keyName, tasklistTaskField, taskName, pencilTrashIcon, tableHeaderOwner, tableHeaderStatus, tableHeaderPriority, tableTimeline, taskCreationDate, taskCompletionDate, DeleteModalCloseBtn, cancelBtn, createBtn, tableForm } = styles;

  return (
    <>
      {fitleredTasks.length > 0 && (
        <div>
          <div className={allTaskList}>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <Table bordered>
                <thead>
                  <tr className={tableHeader}>
                    <th>Key</th>
                    <th>Task</th>
                    <th className={tableHeaderOwnerTh}>Owner</th>
                    <th className={tableHeaderStatusTh}>Status</th>
                    <th className={tableHeaderPriorityTh}>Priority</th>
                    <th>Timeline</th>
                    <th className={tableHeaderCreationDate}>Creation date</th>
                    <th className={tableHeaderCompletionDate}>Completion date</th>
                  </tr>
                </thead>
                <tbody className={tableBody}>
                  {fitleredTasks.map((task) => (
                    <tr key={task._id}>
                      {/* <td>{index+1}</td> */}
                      <td className={tableHeaderKey}>
                        <p
                          className={keyName}
                          id={`key-${task._id}`}
                          name={`key-${task._id}`}
                          type="text"
                          defaultValue={task.key}
                          {...register(`key-${task._id},{maxLength: {value:50}}`)}
                        >{task.key}</p>
                      </td>
                      <td className={tasklistTaskField}>
                        <input
                          className={taskName}
                          id={`task-${task._id}`}
                          name={`task-${task._id}`}
                          type="text"
                          defaultValue={task.task}
                          {...register(`task-${task._id}`)}
                          onKeyDown={(e) => handleKeyPress(e, task._id)}
                        />
                        <span>
                          <PencilSquare className={pencilTrashIcon}
                            onClick={() => handlePencilClick(task._id)}
                          />
                        </span>
                        <span className={pencilTrashIcon} onClick={() => handleDeleteButtonClick(event, task._id)}>
                          <Trash />
                        </span>
                      </td>
                      <td className={tableHeaderOwner}>
                        <TaskListTableOwner
                          task={task}
                          setOwnerColor={setOwnerColor}
                          updateDataTask={updateDataTask} />
                      </td>
                      <td className={tableHeaderStatus}>
                        <TaskListTableStatus
                          selectedStatus={selectedStatus}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          task={task}
                          updateDataTask={updateDataTask}
                        />
                      </td>
                      <td className={tableHeaderPriority}>
                        <TaskListTablePriority
                          isOpens={isOpens}
                          setIsOpens={setIsOpens}
                          task={task}
                          updateDataTask={updateDataTask}
                        />
                      </td>
                      <td className={tableTimeline} onClick={() => handleTimeLineClick(task._id)}>
                        <TaskListTableTimeLine setSelectedTimeLine={setSelectedTimeLine} task={task.timeline} selectedTimeLine={selectedTimeLine} id={timeLineTaskId} />
                      </td>
                      <td className={tableHeaderCreationDate}>
                        <p
                          className={taskCreationDate}
                          style={{ border: "none" }}
                          id={`creationdate-${task._id}`}
                          name={`creationdate-${task._id}`}
                          type="text"
                          defaultValue={task.creationdate}
                          {...register(`creationdate-${task._id}`)}
                        >{task.creationdate}</p>
                      </td>
                      <td className={tableHeaderCompletionDate}>
                        <p
                          className={taskCompletionDate}
                          id={`completiondate-${task._id}`}
                          name={`completiondate-${task._id}`}
                          type="text"
                          defaultValue={task.completiondate}
                          {...register(`completiondate-${task._id}`)}
                        >{task.completiondate}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <input style={{ display: "none" }} type="submit" />
            </form>
          </div>
          <Modal
            className="myTaskDeleteModal"
            show={deleteModalShow}
            onHide={handleCloseDeleteModal}
            style={{ top: `${clickY + 290}px`, left: `${clickX - 600}px` }}
          >
            <Modal.Body>
              <div>Are you sure you want to delete this task?</div>
              <button
                className={DeleteModalCloseBtn}
                onClick={handleCloseDeleteModal}
              >
                <img src={xIcon} alt="xIcon" />
              </button>
              <div></div>
              <Button className={cancelBtn} onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button className={createBtn} onClick={handleDeleteTask}>
                Delete
              </Button>
            </Modal.Body>
          </Modal>
        </div>
      )}
      <div className={tableForm}>
        <div className={showTask === true ? "" : "hidden"}>
          <TaskListTableForm selectedTimeLine={selectedTimeLine} setSelectedTimeLine={setSelectedTimeLine} selectedCreationDay={selectedCreationDay}
          setSelectedCreationDay={setSelectedCreationDay}/>
        </div>
      </div>
    </>
  );
}
export default TaskListTable;