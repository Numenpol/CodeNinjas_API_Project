import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import xIcon from "../assets/xIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import plusSquareFillIcon from "../assets/plusSquareFillIcon.svg";
import houseIconPic from "../assets/houseIcon.svg";
import MenuProjectList from "./MenuProjectList";
import SearchBar from "./SearchBar";
import styles from "../styles/MenuProjectListDesktop.module.css";
import { Link } from "react-router-dom";

function MenuProjectListDesktop() {
  const { setShowMenu, handleShow, value, setValue } = useContext(StateContext)

  const handleClose = () => setShowMenu(false);

  const { projectPopUp, homeIcon, houseIconText, houseIcon, buttonthing, closeButton, searchThing, folderTextThing, menuMyProjects, folderIcon2, myProjectsText, plusIcon, addProjectButton } = styles;

  return (
    <>
      <div className={projectPopUp}>
        <div className={homeIcon}>
          <Link to={"/projects"}>
            <div className={houseIconText}>
              <img src={houseIconPic} alt="HouseIcon" className={houseIcon} />
              <button className={buttonthing}>Home</button>
            </div>
          </Link>
          <button className={closeButton} onClick={handleClose}>
            <img src={xIcon} alt="X" />
          </button>
        </div>
        <div className={searchThing}>
          <SearchBar value={value} setValue={setValue} />
        </div>
        <div className={folderTextThing}>
          <div className={menuMyProjects}>
            <img src={folderPlusIcon} alt="folderIcon" className={folderIcon2} />
            <p className={myProjectsText}>My Projects</p>
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