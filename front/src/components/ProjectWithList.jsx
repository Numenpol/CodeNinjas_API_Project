import ProjectList from "./ProjectList";
import Dashboard from "./Dashboard";
import styles from "../styles/ProjectWithList.module.css";
import burgerIcon from "../assets/burgerIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import CreateProjectForm from "./CreateProjectForm";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import MenuProjectListPhone from "./MenuProjectListPhone";
import SearchBar from "./SearchBar";
import MenuProjectListDesktop from "./MenuProjectListDesktop";
import { useTheme } from "../utils/ThemeContext";

function ProjectWithList() {
  const { setShowMenu, handleShow } = useContext(StateContext);

  const toggleShow = () => setShowMenu((s) => !s);

  const { theme } = useTheme();

  const {
    projectList,
    ProjectListMenu,
    projectListCard,
    ProjectThing,
    ProjectListHeader,
    MenuThing,
    FolderText,
    FolderPlusIcon,
    projectListSearchBar,
    ProjectListDashboard,
    CreateProjectButtonPosition,
    createFirstProjectButton,
    projectListList,
    createFirstProjectButtonDark,
    CreateProjectButtonPositionDark,
    ProjectThingDark,
    projectListCardDark,
    projectListDark,
    ProjectListHeaderDark,
    MyProjectsText,
    MyProjectsTextDark,
    FolderTextDark,
    ProjectListMenuDark,
  } = styles;
  return (
    <div className={theme == "light" ? projectList : projectListDark}>
      <div className={theme == "light" ? ProjectListMenu : ProjectListMenuDark}>
        <MenuProjectListDesktop />
      </div>
      <div className={theme == "light" ? projectListCard : projectListCardDark}>
        <div className={theme == "light" ? ProjectThing : ProjectThingDark}>
          <div
            className={
              theme == "light" ? ProjectListHeader : ProjectListHeaderDark
            }
          >
            <div>
              <div>
                <button className={MenuThing} onClick={toggleShow}>
                  <img src={burgerIcon} alt="burgerIcon" />
                </button>
                <MenuProjectListPhone />
              </div>
              <div className={theme == "light" ? FolderText : FolderTextDark}>
                <img
                  src={folderPlusIcon}
                  alt="folderPlusIcon"
                  className={FolderPlusIcon}
                />
                <div
                  className={
                    theme == "light" ? MyProjectsText : MyProjectsTextDark
                  }
                >
                  My Projects
                </div>
              </div>
            </div>
            <div>
              <div className={projectListSearchBar}>
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
        <div className={ProjectListDashboard}>
          <Dashboard />
        </div>
        <div
          className={
            theme == "light"
              ? CreateProjectButtonPosition
              : CreateProjectButtonPositionDark
          }
        >
          <button
            className={
              theme == "light"
                ? createFirstProjectButton
                : createFirstProjectButtonDark
            }
            onClick={handleShow}
          >
            {" "}
            Create Your project{" "}
          </button>
          <CreateProjectForm />
        </div>
        <div className={projectListList}>
          <ProjectList />
        </div>
      </div>
    </div>
  );
}

export default ProjectWithList;
