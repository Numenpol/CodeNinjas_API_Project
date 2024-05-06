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
import styles2 from "../styles/PriorityDropdown.module.css";
import Ownerstyles from "../styles/Owner.module.css";
import { PersonCircle, CircleFill } from "react-bootstrap-icons";

function TaskListTableForm() {
  const { tasks, setUpdate, showTask, setShowTask } = useContext(StateContext);
  
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
        status: selectedStatus,
        priority: selectedPriority,
        owner: selectedOwner,
      });
      setUpdate((update) => update + 1);
      setShowTask(false);
      reset();
      setSelectedStatus("");
      setSelectedPriority("");
      setSelectedOwner("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="allTaskList">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Table bordered>
            <tbody className="table-body">
              <tr>
                <td className="table-headerKey">
                  <input
                    className="key-name"
                    id="key"
                    name="key"
                    type="text"
                    {...register("key")}
                  />
                </td>
                <td>
                  <input
                    className="task-name"
                    id="task"
                    name="task"
                    type="text"
                    {...register("task")}
                  />
                </td>
                <td className="table-headerOwner">
                  <div className="task-owner">
                    <button
                      type="button"
                      onClick={() => setIsOpeno(!isOpeno)}
                      className={ownerBtn}
                      // className="task-owner"
                    >
                      {selectedOwner ? (
                        <div className={initialsStyle}>
                          <CircleFill className={selectedOwnerColor} />
                          <div>{getInitials(selectedOwner)}</div>
                        </div>
                      ) : (
                        <PersonCircle className={Ownerstyles.ownerIconEmpty} />
                      )}
                    </button>
                    {isOpeno && (
                      <div className={ownerMenu}>
                        <div className={ownerListStyle}>
                          {[
                            "Peter Pan",
                            "Alice Wonderland",
                            "Tom Sawyer",
                            "Mirabel Madrigal",
                            "John Doe",
                          ].map((owner, index) => (
                            <p
                              key={index}
                              onClick={() =>
                                handleOwnerClick(owner, ownerColors[index])
                              }
                            >
                              <div className={initialsList}>
                                <CircleFill className={ownerColors[index]} />
                                <div>{getInitials(owner)}</div>
                                <span>{owner}</span>
                              </div>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="table-headerStatus">
                  <div className="task-status">
                    <button
                      type="button"
                      onClick={() => setOpen(!open)}
                      className={`${statusBtn} ${selectedStatus && selected}`}
                      // className="task-status"
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
                <td className="table-headerPriority">
                  <div className="task-priority">
                    <button
                      type="button"
                      onClick={() => setOpens(!opens)}
                      className={
                        priorityBtn +
                        (selectedPriority ? " " + selectedPrioLow : "")
                      }
                      // className="task-priority"
                      style={{
                        backgroundColor:
                          selectedPriority === "Low"
                            ? "#40ADBE"
                            : selectedPriority === "Medium"
                            ? "#FDAB3D"
                            : selectedPriority === "High"
                            ? "#C0417F"
                            : "",
                          }}
                    >
                      {selectedPriority || String.fromCharCode(9662)}
                    </button>
                    {opens && (
                      <div className={priorityMenu}>
                        <p
                          className={priorityLow}
                          onClick={() => handlePriorityClick("Low")}
                        >
                          Low
                        </p>
                        <p
                          className={priorityMedium}
                          onClick={() => handlePriorityClick("Medium")}
                        >
                          Medium
                        </p>
                        <p
                          className={priorityHigh}
                          onClick={() => handlePriorityClick("High")}
                        >
                          High
                        </p>
                      </div>
                    )}
                  </div>
                </td>
                <td className="table-headerTimeline">
                  <input
                    className="task-timeline"
                    id="timeline"
                    name="timeline"
                    type="text"
                    {...register("timeline")}
                  />
                  {}
                </td>
                <td className="table-headerCreationdate">
                  <input
                    className="task-creationdate"
                    style={{ border: "none" }}
                    id="creationdate"
                    name="creationdate"
                    type="text"
                    {...register("creationdate")}
                  />
                </td>
                <td className="table-headerCompletiondate">
                  <input
                    className="task-completiondate"
                    id="completiondate"
                    name="completiondate"
                    type="text"
                    {...register("completiondate")}
                  />
                </td>        
              </tr>
            </tbody>
          </Table>
          <input style={{ display: "none" }} type="submit" />
        </form>

      </div>
      {/* <Button onClick={handleShow}>Mark</Button>
                <TaskListStatusModal show={show} handleClose={handleClose} /> */}
    </>
  );
}

export default TaskListTableForm;
