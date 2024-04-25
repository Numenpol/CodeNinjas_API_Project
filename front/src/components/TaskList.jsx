import Button from "react-bootstrap/esm/Button";
import MenuProjectListPopUp from "./MenuProjectListPopUp";
import SearchBar from "./SearchBar";
import styles from "../styles/TaskList.module.css";
import TaskListTable from "./TaskListTable";
import burgerIcon from "../assets/burgerIcon.svg";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";

function TaskList() {
  const {
    taskList,
    taskListMenu,
    taskListCard,
    taskListHeader,
    taskListHeaderTop,
    taskListMenuButton,
    taskListStatus,
    taskListAddMember,
    taskListNameIcon,
    taskListProjectIcon,
    taskListProjectName,
    taskListHeaderBottom,
    taskListNewTask,
    taskListSearch,
  } = styles;
  const { setShowMenu, handleShow } = useContext(StateContext);

  const toggleShow = () => setShowMenu((s) => !s);
  return (
    <div className={taskList}>
      <div className={taskListMenu}>
        <MenuProjectListPopUp />
      </div>
      <div className={taskListCard}>
        <div className={taskListHeader}>
          <div className={taskListHeaderTop}>
            <button className={taskListMenuButton} onClick={toggleShow}>
              <img src={burgerIcon} alt="burgerIcon" />
            </button>
            <MenuProjectListPopUp />
            <p className={taskListStatus}>STATUS</p>
            <button className={taskListAddMember}>ADD</button>
            <div className={taskListNameIcon}>
              <div className={taskListProjectIcon}>ICON</div>
              <h2 className={taskListProjectName}>NAME</h2>
            </div>
          </div>
          <div className={taskListHeaderBottom}>
            <Button
              className={taskListNewTask}
              variant="primary"
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
        </div>
      <TaskListTable />
      </div>
    </div>
  );
}

export default TaskList;
