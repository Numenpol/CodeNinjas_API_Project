import Table from "react-bootstrap/Table";
import "../styles/taskListTable.css";
import { useForm } from "react-hook-form";
import { updateDataTask } from "../services/update";
import { postDataTask } from "../services/post";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/StatusDropdown.module.css";
import styles2 from "../styles/PriorityDropdown.module.css";
import Ownerstyles from "../styles/Owner.module.css";
import { PersonCircle, CircleFill } from "react-bootstrap-icons";
import TaskListTableTimeLine from "./TaskListTableTimeLine";
import { addProjectTask } from "../services/patch";
import { getOne } from "../services/get";

function TaskListTableForm({
  selectedTimeLine,
  setSelectedTimeLine,
  setSelectedCreationDay,
  selectedCreationDay,
  selectedCompletionDay,
  setSelectedCompletionDay,
}) {
  const { tasks, setUpdate, showTask, setShowTask, projectId } =
    useContext(StateContext);

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
  const [ownerColor, setOwnerColor] = useState("")
  const [ownerColors, setOwnerColors] = useState([]);
  const [getInfo, setProjectInfo] = useState("");

  const getMembersNames = async () => {
    let projectData = await getOne(projectId);
    let getInfo = projectData.data.project;
    setProjectInfo(getInfo);
  };

  useEffect(() => {
    getMembersNames();
  }, [projectId]);

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
    const fixedColor = color.match(/_([^_]+)_/)[1];
    setOwnerColor(fixedColor);
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
    circleIcon
  } = Ownerstyles;

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
      timeline: "",
      creationdate: "",
      completiondate: "",
    },
  });

  const formSubmitHandler = async (data) => {
    try {
      // const { resDataId } =
      await postDataTask({
        ...data,
        status: selectedStatus,
        priority: selectedPriority,
        owner: [selectedOwner, ownerColor],
        timeline: selectedTimeLine,
        creationdate: selectedCreationDay,
        completiondate: selectedCompletionDay,
        projectId: projectId,
      });
      // await addProjectTask(projectId, resDataId);
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
      <div>
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
                <td className="tasklist-task-field">
                  <input
                    className="task-nameForm"
                    id="task"
                    name="task"
                    type="text"
                    {...register("task")}
                  />
                </td>
                <td className="table-headerOwnerTh">
                  <div className="table-headerOwner">
                  <div className="task-owner">
                    <button
                      type="button"
                      onClick={() => setIsOpeno(!isOpeno)}
                      className={ownerBtn}
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
                      {getInfo && getInfo.members.map((member, index) => (
                          <div className="{circleIcon}"
                            key={index}
                            onClick={() =>
                              handleOwnerClick(member.names, ownerColors[index])
                            }
                          >
                            <div className={initialsList}>
                              <CircleFill className={ownerColors[index]} />
                              <div>{getInitials(member.names)}</div>
                              <span>{member.names}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                      // <div className={ownerMenu}>
                      //   <div className={ownerListStyle}>
                      //     {[
                      //       "Peter Pan",
                      //       "Alice Wonderland",
                      //       "Tom Sawyer",
                      //       "Mirabel Madrigal",
                      //       "John Doe",
                      //     ].map((owner, index) => (
                      //       <p
                      //         key={index}
                      //         onClick={() =>
                      //           handleOwnerClick(owner, ownerColors[index])
                      //         }
                      //       >
                      //         <div className={initialsList}>
                      //           <CircleFill className={ownerColors[index]} />
                      //           <div>{getInitials(owner)}</div>
                      //           <span>{owner}</span>
                      //         </div>
                      //       </p>
                      //     ))}
                      //   </div>
                      // </div>
                    )}
                  </div>
                  </div>
                </td>
                <td className="table-headerStatusTh">
                  <div className="table-headerStatus">
                    <div className="task-status">
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
                  </div>
                </td>
                <td className="table-headerPriorityTh">
                  <div className="table-headerPriority">
                    <div className="task-priority">
                      <button
                        type="button"
                        onClick={() => setOpens(!opens)}
                        className={
                          priorityBtn +
                          (selectedPriority ? " " + selectedPrioLow : "")
                        }
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
                  </div>
                </td>
                <td className="table-timeline">
                  <TaskListTableTimeLine
                    setSelectedTimeLine={setSelectedTimeLine}
                    setSelectedCreationDay={setSelectedCreationDay}
                    setSelectedCompletionDay={setSelectedCompletionDay}
                  />
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
    {/* <ul>
      {getInfo && getInfo.members.map((member, index) => (
        <li key={index}>{member.names}</li>
      ))}
    </ul> */}
          </Table>
          <input style={{ display: "none" }} type="submit" />
        </form>
      </div>
    </>
  );
}

export default TaskListTableForm;
