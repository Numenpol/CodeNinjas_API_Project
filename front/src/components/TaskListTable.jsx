import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import "../styles/taskListTable.css";
// import TaskListStatusModal from "./TaskListStatusModal";
import { useForm } from "react-hook-form";
import { updateDataTask } from "../services/update";
import { postDataTask } from "../services/post";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../utils/StateContext";
import { PencilSquare } from "react-bootstrap-icons";
import styles from "../styles/StatusDropdown.module.css";
import styles2 from "../Prioritystyles/PriorityDropdown.module.css";
import Ownerstyles from "../Ownerstyles/Owner.module.css";
import { PersonCircle, CircleFill } from "react-bootstrap-icons";
import TaskListTableForm from "./TaskListTableForm";
function TaskListTable() {
  const { tasks, setUpdate, showTask } = useContext(StateContext);
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [open, setOpen] = useState(false);

  //Priority

  const [isOpens, setIsOpens] = useState({});
  const [opens, setOpens] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");

  // Owner
  const [isOpeno, setIsOpeno] = useState(false);
  const [isOpenos, setIsOpenos] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedOwnerColor, setSelectedOwnerColor] = useState("");
  const [ownerColors, setOwnerColors] = useState([]);

  useEffect(() => {
    const generateOwnerColors = () => {
      const colors = [
        Ownerstyles.ownerIconWater,
        Ownerstyles.ownerIconOrange,
        Ownerstyles.ownerIconGrape,
        Ownerstyles.ownerIconBlue,
        Ownerstyles.ownerIconPink,
      ];
      let index = 0;
      return (ownerList) => {
        return ownerList.map(() => {
          const color = colors[index];
          index = (index + 1) % colors.length;
          return color;
        });
      };
    };

    const owners = [
      "Peter Pan",
      "Alice Wonderland",
      "Tom Sawyer",
      "Mirabel Madrigal",
      "John Doe",
    ];
    const assignColor = generateOwnerColors();
    setOwnerColors(assignColor(owners));
  }, []);

  const handleOwnerClick = (owner, color) => {
    setSelectedOwner(owner);
    setSelectedOwnerColor(color);
    setIsOpeno(false);
    setIsOpenos(false);
  };

  const handleOwnerUpdate = async (id, newOwner) => {
    try {
      const data = { owner: newOwner };
      await updateDataTask(id, data);
      setUpdate((update) => update + 1);
      setIsOpenos(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };

  const {
    priorityBtn,
    priorityMenu,
    priorityLow,
    priorityMedium,
    priorityHigh,
    selectedPrioLow,
    selectedPrioMed,
    selectedPrioHi,
  } = styles2;

  const {
    ownerBtn,
    ownerMenu,
    ownerList: ownerListStyle,
    initials: initialsStyle,
    initialsList,
  } = Ownerstyles;

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleStatusClick = (statuss) => {
    setSelectedStatus(statuss);
    setIsOpen(false);
    setOpen(false);
  };

  const handlePriorityClick = (prioritys) => {
    setSelectedPriority(prioritys);
    setIsOpens(false);
    setOpens(false);
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

  const handlePriorityUpdate = async (id, newPriority) => {
    try {
      const data = { priority: newPriority };
      await updateDataTask(id, data);
      setUpdate((update) => update + 1);
      setIsOpens(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const data = { status: newStatus };
      await updateDataTask(id, data);
      setUpdate((update) => update + 1);
      setIsOpen(false);
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
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setIsOpenos((prevState) => ({
                            ...prevState,
                            [task._id]: !prevState[task._id],
                          }))
                        }
                        className={ownerBtn}
                      >
                        {selectedOwner ? (
                          <div className={initialsStyle}>
                            <CircleFill className={selectedOwnerColor} />
                            <div>{getInitials(task.owner)}</div>
                          </div>
                        ) : (
                          <PersonCircle
                            className={Ownerstyles.ownerIconEmpty}
                          />
                        )}
                      </button>
                      {isOpenos[task._id] && (
                        <div className={ownerMenu}>
                          <div className={ownerListStyle}>
                            {[
                              "Peter Pan",
                              "Alice Wonderland",
                              "Tom Sawyer",
                              "Mirabel Madrigal",
                              "John Doe",
                            ].map((owner, index) => (
                              <div key={index}>
                                <p
                                  onClick={() =>
                                    handleOwnerClick(owner, ownerColors[index])
                                  }
                                >
                                  <div className={initialsList}>
                                    <CircleFill
                                      className={ownerColors[index]}
                                    />
                                    <div>{getInitials(task.owner)}</div>
                                    <span>{task.owner}</span>
                                  </div>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
                          color:
                            task.status === "To do"
                              ? "white"
                              : task.status === "In progress"
                              ? "white"
                              : task.status === "Done"
                              ? "white"
                              : "black",
                        }}
                        
                      >
                        {task.status || String.fromCharCode(9662)}
                      </button>
                      {isOpen[task._id] && (
                        <div className={statusMenu}>
                          <p
                            className={statusDo}
                            onClick={() =>
                              handleStatusUpdate(task._id, "To do")
                            }
                          >
                            To do
                          </p>
                          <p
                            className={statusProgress}
                            onClick={() =>
                              handleStatusUpdate(task._id, "In progress")
                            }
                          >
                            In progress
                          </p>
                          <p
                            className={statusDone}
                            onClick={() => handleStatusUpdate(task._id, "Done")}
                          >
                            Done
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setIsOpens((prevState) => ({
                            ...prevState,
                            [task._id]: !prevState[task._id],
                          }))
                        }
                        className={`${priorityBtn} ${
                          isOpens[task._id] ? selectedPrioLow : ""
                        }`}
                        style={{
                          backgroundColor:
                            task.priority === "Low"
                              ? "#40ADBE"
                              : task.priority === "Medium"
                              ? "#FDAB3D"
                              : task.priority === "High"
                              ? "#C0417F"
                              : "",
                              color:
                              task.priority === "Low"
                              ? "white"
                              : task.priority === "Medium"
                              ? "white"
                              : task.priority === "High"
                              ? "white"
                              : "black",
                        }}
                      >
                        {task.priority || String.fromCharCode(9662)}
                      </button>
                      {isOpens[task._id] && (
                        <div className={priorityMenu}>
                          <p
                            className={priorityLow}
                            onClick={() =>
                              handlePriorityUpdate(task._id, "Low")
                            }
                          >
                            Low
                          </p>
                          <p
                            className={priorityMedium}
                            onClick={() =>
                              handlePriorityUpdate(task._id, "Medium")
                            }
                          >
                            Medium
                          </p>
                          <p
                            className={priorityHigh}
                            onClick={() =>
                              handlePriorityUpdate(task._id, "High")
                            }
                          >
                            High
                          </p>
                        </div>
                      )}
                    </div>
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
