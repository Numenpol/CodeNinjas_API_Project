import ProjectList from "./ProjectList"
import Dashboard from "./Dashboard"
import styles from "../styles/ProjectWithList.module.css";
import burgerIcon from "../assets/burgerIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import CreateProjectForm from "./CreateProjectForm";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import MenuProjectListPopUp from "./MenuProjectListPopUp";
import SearchBar from "./SearchBar";
import MenuProjectListDesktop from "./MenuProjectListDesktop"

function ProjectWithList() {
  const { setShowMenu, handleShow } = useContext(StateContext)

  const toggleShow = () => setShowMenu((s) => !s);

  const { projectList, ProjectListMenu, projectListCard, ProjectThing, ProjectListHeader, MenuThing, FolderText, FolderPlusIcon, projectListSearchBar, ProjectListDashboard, CreateProjectButtonPosition,
    createFirstProjectButton, projectListList} = styles;
  return (
    <div className={projectList}>
      <div className={ProjectListMenu}>
        <MenuProjectListDesktop />
      </div>
      <div className={projectListCard}>
        <div className={ProjectThing}>
          <div className={ProjectListHeader}>
            <button className={MenuThing} onClick={toggleShow}>
              <img src={burgerIcon} alt="burgerIcon" />
            </button>
            <MenuProjectListPopUp />
            <div className={FolderText}>
              <img src={folderPlusIcon} alt="folderPlusIcon" className={FolderPlusIcon} />
              <div className="MyProjectsText">My Projects</div>
            </div>
            <div className={projectListSearchBar}>
              <SearchBar />
            </div>
          </div>
        </div>
        <div className={ProjectListDashboard}>
          <Dashboard />
        </div>
        <div className={CreateProjectButtonPosition}>
          <button className={createFirstProjectButton} onClick={handleShow}> Create Your project </button>
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