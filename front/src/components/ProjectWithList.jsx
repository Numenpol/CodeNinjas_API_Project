import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ProjectList from "./ProjectList"
import Dashboard from "./Dashboard"
import styles from "../styles/ProjectWithList.module.css";
import burgerIcon from "../assets/burgerIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import CreateProjectForm from "./CreateProjectForm";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import MenuProjectListREAL from "./MenuProjectListPopUp";

function ProjectWithList() {
  const {setShowMenu, handleShow} = useContext(StateContext)

  const toggleShow = () => setShowMenu((s) => !s);

  const { projectList, ProjectListMenu, projectListCard, ProjectThing, ProjectListHeader, MenuThing, FolderText, FolderPlusIcon, searchbarGroup, SearcbarProjectList, InputBoxCss, CreateProjectButtonPosition, createFirstProjectButton, 
   } = styles;
  return (
    <div className={projectList}>
      {/* greiciausiai project list menu yra useless, kai kuriuos css klases nieko nedaro. */}
      <div className={ProjectListMenu}>

      </div>          
      <div className={projectListCard}>
        <div className={ProjectThing}>
          <div className={ProjectListHeader}>


                <button className={MenuThing} onClick={toggleShow}>
                  <img src={burgerIcon} alt="burgerIcon" />
                </button>
                <MenuProjectListREAL/>
            <div className={FolderText}>
              <img src={folderPlusIcon} alt="folderPlusIcon" className={FolderPlusIcon}/>
              <div className="MyProjectsText">My Projects</div>
            </div>
            <div className={searchbarGroup}>
              <InputGroup className={SearcbarProjectList}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  className={InputBoxCss}
                  placeholder="Search"
                />
              </InputGroup>
            </div>
          </div>
        </div>
        <Dashboard />
        <div className={CreateProjectButtonPosition}>
              <button className={createFirstProjectButton} onClick={handleShow}> Create Your project </button>
              <CreateProjectForm/>
        </div>
        <ProjectList/>
      </div>
    </div>
  );
}

export default ProjectWithList;