// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import "../styles/projectWithoutList.css";
import burgerIcon from "../assets/burgerIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import CreateProjectForm from "./CreateProjectForm";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import MenuProjectListPhone from "./MenuProjectListPhone";
import MenuProjectListDesktop from "./MenuProjectListDesktop";
import SearchBar from "./SearchBar";
import styles from "../styles/ProjectWithoutList.module.css";

function ProjectWithoutList() {
  const { setShowMenu, handleShow } = useContext(StateContext);

  const {
    projectWithoutList,
    projectListMenu,
    projectListCard,
    projectThing,
    projectListHeader,
    menuThing,
    folderText,
    folderIcon1,
    myProjectsText,
    projectListSearchBar,
    createProjectBox,
    chartIcon,
    createFirstProjectButton,
  } = styles;

  return (
    <div className={projectWithoutList}>
      <div className={projectListMenu}>
        <MenuProjectListDesktop />
      </div>
      <div className={projectListCard}>
        <div className={projectThing}>
          <div className={projectListHeader}>
            <div>
              <button className={menuThing} onClick={setShowMenu}>
                <img src={burgerIcon} alt="burgerIcon" />
              </button>
              <MenuProjectListPhone />
              <div className={folderText}>
                <img
                  src={folderPlusIcon}
                  alt="folderPlusIcon"
                  className={folderIcon1}
                />
                <div className={myProjectsText}>My Projects</div>
              </div>
            </div>
            <div className={projectListSearchBar}>
              <SearchBar />
            </div>
          </div>
        </div>
        <div className={createProjectBox}>
          <img src="src\assets\Group 54.svg" alt="" className={chartIcon} />
          <button className={createFirstProjectButton} onClick={handleShow}>
            Create Your first project
          </button>
        </div>
        <CreateProjectForm />
      </div>
    </div>
  );
}

export default ProjectWithoutList;
