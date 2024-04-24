import Popup from "reactjs-popup";
import Button from "react-bootstrap/esm/Button";

import ProjectListPopUp from "./ProjectListPopUp";
import SearchBar from "./SearchBar";

import styles from "../styles/TaskList.module.css";
import TaskListTable from "./TaskListTable";

function TaskList() {

    const { taskList, taskListMenu, taskListCard, taskListHeader, taskListHeaderTop, taskListMenuButton, taskListStatus, taskListAddMember, taskListNameIcon, taskListProjectIcon, taskListProjectName, taskListHeaderBottom, taskListNewTask, taskListSearch
    } = styles;

    return (
        <div className={taskList}>
            <div className={taskListMenu}>
                <ProjectListPopUp />
            </div>
            <div className={taskListCard}>
                <div className={taskListHeader}>
                    <div className={taskListHeaderTop}>
                        <Popup
                            trigger={
                                <button className={taskListMenuButton}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        fill="currentColor"
                                        className="MenuIcon"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                                        />
                                    </svg>
                                </button>
                            }
                            position="bottom left"
                        >
                            <div>
                                <ProjectListPopUp />
                            </div>
                        </Popup>
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
                //   width: "299px",
                //   height: "3.125rem",
                //   marginLeft: "30.5px",
                //   marginTop: "1rem",
                //   marginBottom: "1rem"
                }}
              >
                New task
              </Button>
                        <div className={taskListSearch}>
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>
            <TaskListTable />
        </div>
    );
}

export default TaskList;