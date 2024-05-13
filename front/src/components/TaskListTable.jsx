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
import { getAllTaskById } from '../services/get';

function TaskListTable() {
  const { setUpdate, showTask, projectId, update, setprojectId } = useContext(StateContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [isOpens, setIsOpens] = useState({});
  const [selectedPriority, setSelectedPriority] = useState("");

  const [selectedOwner, setSelectedOwner] = useState("");
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const [selectedTimeLine, setSelectedTimeLine] = useState();
  const [selectedCreationDay, setSelectedCreationDay] = useState();
  const [selectedCompletionDay, setSelectedCompletionDay] = useState();

  const [tasksById, setTasksById] = useState([]);
  const [error, setError] = useState("");

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
        owner: selectedOwner,
        timeline: selectedTimeLine,
        creationdate: selectedCreationDay,
        completiondate: selectedCompletionDay,
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

  const handleDeleteButtonClick = (taskId) => {
    setTaskIdToDelete(taskId);
    setDeleteModalShow(true);
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

  const handleCloseDeleteModal = () => {
    setDeleteModalShow(false);
    setTaskIdToDelete(null);
  };

  const fetchTasksByProjectId = async (projectId) => {
    try {
      const { data: { tasks } } = await getAllTaskById(projectId);
      setTasksById(tasks);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchId = projectId;
        if (projectId === "") {
          fetchId = sessionStorage.getItem("projectid");
          setprojectId(fetchId);
        }
        await fetchTasksByProjectId(fetchId);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };

    fetchData();
  }, [update, projectId]);


  return (
    <>
      <div className="allTaskList">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Table bordered>
            <thead>
              <tr className="table-header">
                {/* <th>Nr.</th> */}
                <th>Key</th>
                <th>Task</th>
                <th className="table-headerOwnerTh">Owner</th>
                <th className="table-headerStatusTh">Status</th>
                <th className="table-headerPriorityTh">Priority</th>
                <th>Timeline</th>
                <th className="table-headerCreationdate">Creation date</th>
                <th className="table-headerCompletiondate">Completion date</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {tasksById.map((task) => (
                <tr key={task._id}>
                  {/* <td>{index+1}</td> */}
                  <td className="table-headerKey">
                    <input
                      className="key-name"
                      id={`key-${task._id}`}
                      name={`key-${task._id}`}
                      type="text"
                      defaultValue={task.key}
                      {...register(`key-${task._id}`)}
                    />
                  </td>
                  <td className="tasklist-task-field">
                    <input
                      className="task-name"
                      id={`task-${task._id}`}
                      name={`task-${task._id}`}
                      type="text"
                      defaultValue={task.task}
                      {...register(`task-${task._id}`)}
                      onKeyDown={(e) => handleKeyPress(e, task._id)}
                    />
                    <span>
                      <PencilSquare className="pencilTrashIcon"
                        onClick={() => handlePencilClick(task._id)}
                      />
                    </span>
                    <span className="pencilTrashIcon" onClick={() => handleDeleteButtonClick(task._id)}>
                      <Trash />
                    </span>
                  </td>
                  <td className="table-headerOwner">
                    <TaskListTableOwner 
                      task={task}
                      selectedOwner={selectedOwner}
                      updateDataTask={updateDataTask} />
                  </td>
                  <td className="table-headerStatus">
                    <TaskListTableStatus
                      selectedStatus={selectedStatus}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      task={task}
                      updateDataTask={updateDataTask}
                    />
                  </td>
                  <td className="table-headerPriority">
                    <TaskListTablePriority
                      isOpens={isOpens}
                      setIsOpens={setIsOpens}
                      task={task}
                      updateDataTask={updateDataTask}
                    />
                  </td>
                  <td className="table-timeline">
                    <TaskListTableTimeLine setSelectedTimeLine={setSelectedTimeLine} setSelectedCreationDay={setSelectedCreationDay} setSelectedCompletionDay={setSelectedCompletionDay}
                      task={task.timeline} />
                  </td>
                  <td className="table-headerCreationdate">
                    <input
                      className="task-creationdate"
                      style={{ border: "none" }}
                      id={`creationdate-${task._id}`}
                      name={`creationdate-${task._id}`}
                      type="text"
                      defaultValue={task.creationdate}
                      {...register(`creationdate-${task._id}`)}
                    />
                  </td>
                  <td className="table-headerCompletiondate">
                    <input
                      className="task-completiondate"
                      id={`completiondate-${task._id}`}
                      name={`completiondate-${task._id}`}
                      type="text"
                      defaultValue={task.completiondate}
                      {...register(`completiondate-${task._id}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <input style={{ display: "none" }} type="submit" />
        </form>
        <div className={showTask === true ? "" : "hidden"}>
          <TaskListTableForm selectedTimeLine={selectedTimeLine} setSelectedTimeLine={setSelectedTimeLine} selectedCreationDay={selectedCreationDay}
            setSelectedCreationDay={setSelectedCreationDay} setSelectedCompletionDay={setSelectedCompletionDay} selectedCompletionDay={selectedCompletionDay} />
        </div>
      </div>
      <Modal
        className="myDeleteModal"
        show={deleteModalShow}
        onHide={handleCloseDeleteModal}
      >
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button className="cancelBtn" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button className="createBtn" onClick={handleDeleteTask}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskListTable;