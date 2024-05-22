// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import burgerIcon from "../assets/burgerIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import CreateProjectForm from "./CreateProjectForm";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import MenuProjectListPhone from "./MenuProjectListPhone";
import MenuProjectListDesktop from "./MenuProjectListDesktop";
import ProjectsSearchBar from "./ProjectsSearchBar";
import styles from "../styles/ProjectWithoutList.module.css";
import { useTheme } from "../utils/ThemeContext";

function ProjectWithoutList() {
  const { setShowMenu, handleShow } = useContext(StateContext);

  const { theme } = useTheme();


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
    projectWithoutListDark,
    projectListCardDark,
    myProjectsTextDark,
    projectListMenuDark,
    createFirstProjectButtonDark,
  } = styles;

  return (
    <div className={theme == "light" ? projectWithoutList : projectWithoutListDark}>
      <div className={theme == "light" ? projectListMenu : projectListMenuDark}>
        <MenuProjectListDesktop />
      </div>
      <div className={theme == "light" ?  projectListCard : projectListCardDark}>
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
                <div className={theme == "light" ? myProjectsText : myProjectsTextDark}>My Projects</div>
              </div>
            </div>
            <div className={projectListSearchBar}>
              <ProjectsSearchBar />
            </div>
          </div>
        </div>
        <div className={createProjectBox}>
          <img src="src\assets\Group 54.svg" alt="" className={chartIcon} />
          <button className={theme == "light" ? createFirstProjectButton : createFirstProjectButtonDark} onClick={handleShow}>
            Create Your first project
          </button>
        </div>
        <CreateProjectForm />
      </div>
    </div>
  );
}

export default ProjectWithoutList;
