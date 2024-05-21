import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import xIcon from "../assets/xIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import plusSquareFillIcon from "../assets/plusSquareFillIcon.svg";
import houseIconPic from "../assets/houseIcon.svg";
import MenuProjectList from "./MenuProjectList";
import ProjectsSearchBar from "./ProjectsSearchBar";
import styles from "../styles/MenuProjectListDesktop.module.css";
import { Link } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";

function MenuProjectListDesktop() {
  const { setShowMenu, handleShow } = useContext(StateContext)

  const handleClose = () => setShowMenu(false);

  const { theme } = useTheme();

  const { projectPopUp, homeIcon, houseIconText, myProjectsTextDark, houseIcon, buttonthing, closeButton, searchThing, folderTextThing, menuMyProjects, folderIcon2, myProjectsText, plusIcon, addProjectButton, projectPopUpDark, buttonthingDark } = styles;

  return (
    <>
      <div className={theme == "light" ? projectPopUp : projectPopUpDark}>
        <div className={homeIcon}>
          <Link to={"/projects"}>
            <div className={houseIconText}>
              <img src={houseIconPic} alt="HouseIcon" className={houseIcon} />
              <button className={theme == "light" ? buttonthing : buttonthingDark}>Home</button>
            </div>
          </Link>
          <button className={closeButton} onClick={handleClose}>
            <img src={xIcon} alt="X" />
          </button>
        </div>
        <div className={searchThing}>
          <ProjectsSearchBar />
        </div>
        <div className={folderTextThing}>
          <div className={menuMyProjects}>
            <img src={folderPlusIcon} alt="folderIcon" className={folderIcon2} />
            <p className={theme == "light" ? myProjectsText : myProjectsTextDark}>My Projects</p>
          </div>
          <div className={plusIcon}>
            <button className={addProjectButton} onClick={handleShow}>
              <img src={plusSquareFillIcon} alt="squareIcon" />
            </button>
          </div>
        </div>
        <MenuProjectList />
      </div>
    </>
  );
}

export default MenuProjectListDesktop;