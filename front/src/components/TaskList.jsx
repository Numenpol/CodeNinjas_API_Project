import Button from "react-bootstrap/esm/Button";
import MenuProjectListPhone from "./MenuProjectListPhone";
import SearchBar from "./SearchBar";
import styles from "../styles/TaskList.module.css";
import TaskListTable from "./TaskListTable";
// import Modal from "react-bootstrap/Modal";
import { useContext, useState, useEffect } from "react";
import AddMemberPopUp from "./AddMemberPopUp";
import { StateContext } from "../utils/StateContext";
import styles1 from "../styles/ProjectWithList.module.css";
import burgerIcon from "../assets/burgerIcon.svg";
import MenuProjectListDesktop from "./MenuProjectListDesktop";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";
import CreateProjectForm from "./CreateProjectForm";
import { getOne } from "../services/get";
import addMemberStyles from "../styles/AddMemberPopUp.module.css";
import TaskListExecutionTable from "./TaskListExecution";
import TaskListDoneTable from "./TaskListDoneTable";

function TaskList() {
  const { setShowTask, setShowMenu, projectId, update } = useContext(StateContext);
  const toggleShow = () => setShowMenu((s) => !s);
  const [showAddMember, setShowAddMember] = useState(false);
  const handleClose = () => setShowAddMember(false);
  const handleShow = () => setShowAddMember(true);
  const [activeProjectName, setActiveProjectName] = useState("");
  const [activeProjectIcon, setActiveProjectIcon] = useState("");

  const handleShowTask = () => {
    setShowTask((showTask) => !showTask);
  };
  const [showTable, setShowTable] = useState(true);
  const [showTableExecution, setShowTableExecution] = useState(true);
  const [showTableDone, setShowTableDone] = useState(true);

  const toggleTable = () => {
    setShowTable((prevState) => !prevState);
  };

  //active project
  const getProjectInfo = async () => {
    let projectData = await getOne(projectId);
  
    if (projectData && projectData.data && projectData.data.project && projectData.data.project.projectName) {
      const { projectName, icon } = projectData.data.project;
      setActiveProjectName(projectName);
      setActiveProjectIcon(icon);
    } else {
      return;
    }
  };

  useEffect(() => {
    getProjectInfo();
  }, [projectId, update]);

  const toggleTableExecution = () => {
    setShowTableExecution((prevState) => !prevState);
  };
  const toggleTableDone = () => {
    setShowTableDone((prevState) => !prevState);
  };

  const {
    taskList,
    taskListMenu,
    taskListCard,
    taskListHeader,
    taskListHeaderTop,
    taskListHeaderUnderline,
    taskListMenuButton,
    taskListStatus,
    taskListAddMember,
    taskListAdd,
    taskListNameIcon,
    taskListProjectIcon,
    taskListProjectName,
    taskListHeaderBottom,
    taskListNewTask,
    taskListSearch,
    taskListPlanning,
    taskListPlanningIcon,
    taskListBugerButton,
    taskListStatusDisplay,
    taskListAddMemberDisplay,
    container,
    TaskListExecution,
    TaskListDone,
    taskListStorage,
    taskListNameBox,
  } = styles;

  const {
    AddMemberPopUpModal,
    AddMemberPopUpheader,
    AddMemberPopUpheadertext,
    AddMemberPopUpbody,
    AddButtons,
    AddCloseButton,
    AddAddButton,
    AddMemberPopUpfooter,
  } = addMemberStyles;

  const { MenuThing } = styles1;

  return (
    <div className={taskList}>
      <div className={taskListMenu}>
        <MenuProjectListDesktop />
      </div>
      <div>
        <div>
          <CreateProjectForm />
        </div>
      </div>
      <div className={taskListCard}>
        <div className={container}>
          <div className={taskListBugerButton}>
            <button className={MenuThing} onClick={toggleShow}>
              <img src={burgerIcon} alt="burgerIcon" />
            </button>
            <MenuProjectListPhone />
          </div>
          <div className={taskListNameIcon}>
            <div className={taskListProjectIcon}>
              <img
                src={activeProjectIcon}
                alt="project icon"
              />
            </div>
            <div className={taskListNameBox}>
              <h2 className={taskListProjectName}>
                {activeProjectName}
              </h2>
            </div>
          </div>
          <div className={taskListStatusDisplay}>
            <p className={taskListStatus}>STATUS</p>
          </div>
          <div className={taskListAddMemberDisplay}>
            <button className={taskListAddMember} onClick={handleShow}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                className={taskListAdd}
              >
                <path
                  d="M12 8.1539C12 8.92915 11.6839 9.67265 11.1213 10.2208C10.5587 10.769 9.79565 11.077 9 11.077C8.20435 11.077 7.44129 10.769 6.87868 10.2208C6.31607 9.67265 6 8.92915 6 8.1539C6 7.37865 6.31607 6.63516 6.87868 6.08697C7.44129 5.53879 8.20435 5.23083 9 5.23083C9.79565 5.23083 10.5587 5.53879 11.1213 6.08697C11.6839 6.63516 12 7.37865 12 8.1539ZM9 12.5385C10.1935 12.5385 11.3381 12.0766 12.182 11.2543C13.0259 10.432 13.5 9.31677 13.5 8.1539C13.5 6.99103 13.0259 5.87579 12.182 5.05351C11.3381 4.23124 10.1935 3.76929 9 3.76929C7.80653 3.76929 6.66193 4.23124 5.81802 5.05351C4.97411 5.87579 4.5 6.99103 4.5 8.1539C4.5 9.31677 4.97411 10.432 5.81802 11.2543C6.66193 12.0766 7.80653 12.5385 9 12.5385ZM18 19.8462C18 21.3077 16.5 21.3077 16.5 21.3077H1.5C1.5 21.3077 0 21.3077 0 19.8462C0 18.3847 1.5 14.0001 9 14.0001C16.5 14.0001 18 18.3847 18 19.8462ZM16.5 19.8404C16.4985 19.4808 16.269 18.3993 15.252 17.4084C14.274 16.4554 12.4335 15.4616 9 15.4616C5.565 15.4616 3.726 16.4554 2.748 17.4084C1.731 18.3993 1.503 19.4808 1.5 19.8404H16.5ZM20.25 8.1539C20.4489 8.1539 20.6397 8.23089 20.7803 8.36794C20.921 8.50499 21 8.69086 21 8.88467V11.077H23.25C23.4489 11.077 23.6397 11.154 23.7803 11.291C23.921 11.4281 24 11.6139 24 11.8077C24 12.0016 23.921 12.1874 23.7803 12.3245C23.6397 12.4615 23.4489 12.5385 23.25 12.5385H21V14.7308C21 14.9246 20.921 15.1105 20.7803 15.2476C20.6397 15.3846 20.4489 15.4616 20.25 15.4616C20.0511 15.4616 19.8603 15.3846 19.7197 15.2476C19.579 15.1105 19.5 14.9246 19.5 14.7308V12.5385H17.25C17.0511 12.5385 16.8603 12.4615 16.7197 12.3245C16.579 12.1874 16.5 12.0016 16.5 11.8077C16.5 11.6139 16.579 11.4281 16.7197 11.291C16.8603 11.154 17.0511 11.077 17.25 11.077H19.5V8.88467C19.5 8.69086 19.579 8.50499 19.7197 8.36794C19.8603 8.23089 20.0511 8.1539 20.25 8.1539Z"
                  fill="#565656"
                />
              </svg>
              Add
            </button>
          </div>
          <AddMemberPopUp
            handleClose={handleClose}
            showAddMember={showAddMember}
          />
        </div>
        <div className={taskListHeaderUnderline}></div>
        <div className={taskListHeaderBottom}>
          <Button
            className={taskListNewTask}
            variant="primary"
            onClick={handleShowTask}
            style={{
              backgroundColor: "#3fadbe",
              border: "#3fadbe",
            }}
          >
            New task
          </Button>
          <div className={taskListSearch}>
            <SearchBar />
          </div>
        </div>
        <div className={taskListStorage}>
          <div>
            <div className={taskListPlanning}>
              {showTable ? (
                <ChevronDown
                  className={taskListPlanningIcon}
                  onClick={toggleTable}
                />
              ) : (
                <ChevronRight
                  className={taskListPlanningIcon}
                  onClick={toggleTable}
                />
              )}
              Planning
            </div>
            {showTable && <TaskListTable />}
          </div>
          <div>
            <div className={TaskListExecution}>
              {showTableExecution ? (
                <ChevronDown
                  className={taskListPlanningIcon}
                  onClick={toggleTableExecution}
                />
              ) : (
                <ChevronRight
                  className={taskListPlanningIcon}
                  onClick={toggleTableExecution}
                />
              )}
              Execution
            </div>
            {showTableExecution && <TaskListExecutionTable />}
          </div>
          <div>
            <div className={TaskListDone}>
              {showTableDone ? (
                <ChevronDown
                  className={taskListPlanningIcon}
                  onClick={toggleTableDone}
                />
              ) : (
                <ChevronRight
                  className={taskListPlanningIcon}
                  onClick={toggleTableDone}
                />
              )}
              Done
            </div>
            {showTableDone && <TaskListDoneTable />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
