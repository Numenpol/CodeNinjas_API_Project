import Table from "react-bootstrap/Table";
import "../styles/taskListTable.css";
import { useForm } from "react-hook-form";
import { updateDataTask } from "../services/update";
import { postDataTask } from "../services/post";
import { useContext, useState, useEffect } from "react";
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
import { useTheme } from "../utils/ThemeContext";
import OutsideClickHandler from "react-outside-click-handler";

function TaskListDoneTable() {
  const { setUpdate, showTask, tasksById } = useContext(StateContext);
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

  const { theme } = useTheme();

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

  const handleTimeLineClick = (taskId) => {
    setTimeLineTaskId(taskId);
  }

  const handleDeleteTask = async () => {
    try {
      await deleteDataTask(taskIdToDelete);
      setUpdate((update) => update + 1);
      handleCloseDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalShow(false);
    setTaskIdToDelete(null);
  };

  const fitleredTasks = tasksById.filter((task) => task.status === "Done");

  const { allTaskList, tableHeaderCreationDateDark, DeleteModalCloseBtnDark, DeleteModalTextDark, DeleteModalText, createBtnDark, cancelBtnDark, keyNameDark, taskrow, taskrowDark, taskNameDark, tasklistTaskFieldDark, tableHeaderOwnerThDark, taskCreationDateDark, tableHeaderDark, tableHeaderKeyDark, tableHeaderCompletionDateDark, tableHeader, tableHeaderOwnerTh, tableHeaderStatusTh, tableHeaderPriorityTh, tableHeaderCreationDate, tableHeaderCompletionDate, tableBody, tableHeaderKey, keyName, tasklistTaskField, taskName, pencilTrashIcon, tableHeaderOwner, tableHeaderStatus, tableHeaderPriority, tableTimeline, taskCreationDate, taskCompletionDate, DeleteModalCloseBtn, cancelBtn, createBtn } = styles;

  return (
    <>
      {fitleredTasks.length > 0 && (
        <div>
          <div className={allTaskList}>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <Table bordered>
                <thead>
                  <tr className={theme == "light" ? tableHeader : tableHeaderDark}>
                    {/* <th>Nr.</th> */}
                    <th>Key</th>
                    <th>Task</th>
                    <th className={theme == "light" ? tableHeaderOwnerTh : tableHeaderOwnerThDark}>Owner</th>
                    <th className={tableHeaderStatusTh}>Status</th>
                    <th className={tableHeaderPriorityTh}>Priority</th>
                    <th>Timeline</th>
                    <th className={theme == "light" ? tableHeaderCreationDate : tableHeaderCreationDateDark}>Creation date</th>
                    <th className={theme == "light" ? tableHeaderCompletionDate : tableHeaderCompletionDateDark}>
                      Completion date
                    </th>
                  </tr>
                </thead>
                <tbody className={tableBody}>
                  {fitleredTasks.map((task) => (
                    <tr key={task._id} className={theme == "light" ? taskrow : taskrowDark}>
                      {/* <td>{index+1}</td> */}
                      <td className={tableHeaderKey}>
                        <p
                          className={theme == "light" ? keyName : keyNameDark}
                          disabled
                          id={`key-${task._id}`}
                          name={`key-${task._id}`}
                          type="text"
                          defaultValue={task.key}
                          {...register(`key-${task._id}`)}
                        >{task.key}</p>
                      </td>
                      <td className={theme == "light" ? tasklistTaskField : tasklistTaskFieldDark}>
                        <input
                          className={theme == "light" ? taskName : taskNameDark}
                          id={`task-${task._id}`}
                          name={`task-${task._id}`}
                          type="text"
                          defaultValue={task.task}
                          {...register(`task-${task._id},{maxLength: {value:50}`)}
                          onKeyDown={(e) => handleKeyPress(e, task._id)}
                        />
                        <span>
                          <PencilSquare
                            className={pencilTrashIcon}
                            onClick={() => handlePencilClick(task._id)}
                          />
                        </span>
                        <OutsideClickHandler onOutsideClick={() => setDeleteModalShow(false)}>
                          <span
                            className={pencilTrashIcon}
                            onClick={(event) => handleDeleteButtonClick(event, task._id)}
                          >
                            <Trash />
                          </span>
                        </OutsideClickHandler>
                      </td>
                      <td className={tableHeaderOwner}>
                        <TaskListTableOwner
                          task={task}
                          setOwnerColor={setOwnerColor}
                          updateDataTask={updateDataTask}
                        />
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
                        <TaskListTableTimeLine
                          setSelectedTimeLine={setSelectedTimeLine}
                          setSelectedCreationDay={setSelectedCreationDay}
                          selectedTimeLine={selectedTimeLine}
                          selectedCreationDay={selectedCreationDay}
                          id={timeLineTaskId}
                          taskTimeline={task.timeline}
                          task={task}
                        />
                      </td>
                      <td className={theme == "light" ? tableHeaderCreationDate : tableHeaderCreationDateDark}>
                        <p
                          className={theme == "light" ? taskCreationDate : taskCreationDateDark}
                          style={{ border: "none" }}
                          id={`creationdate-${task._id}`}
                          name={`creationdate-${task._id}`}
                          type="text"
                          defaultValue={task.creationdate}
                          {...register(`creationdate-${task._id}`)}>{task.creationdate}</p>
                      </td>
                      <td className={theme == "light" ? tableHeaderCompletionDate : tableHeaderCompletionDateDark}>
                        <p
                          className={taskCompletionDate}
                          id={`completiondate-${task._id}`}
                          name={`completiondate-${task._id}`}
                          type="text"
                          defaultValue={task.completiondate}
                          {...register(`completiondate-${task._id}`)}>{task.completiondate}</p>
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
            contentClassName={theme == "light" ? "" : "modal-content-dark"}
          >
            <Modal.Body>
              <div className={theme == "light" ? DeleteModalText : DeleteModalTextDark}>Are you sure you want to delete this task?</div>
              <button
                className={theme == "light" ? DeleteModalCloseBtn : DeleteModalCloseBtnDark}
                onClick={handleCloseDeleteModal}
              >
                <img src={xIcon} alt="xIcon" />
              </button>
              <div></div>
              <Button className={theme == "light" ? cancelBtn : cancelBtnDark} onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button className={theme == "light" ? createBtn : createBtnDark} onClick={handleDeleteTask}>
                Delete
              </Button>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default TaskListDoneTable;
