import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import xIcon from "../assets/xIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import plusSquareFillIcon from "../assets/plusSquareFillIcon.svg";
// import searchIcon from "../assets/searchIcon.svg";
import houseIconPic from "../assets/houseIcon.svg";
// import "../styles/projectWithoutList.css";
// import "../styles/projectListPopUp.css";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import MenuProjectList from "./MenuProjectList";
import SearchBar from './SearchBar';
import styles from "../styles/MenuProjectListDesktop.module.css";
import { Link } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";
import "../styles/MenuProject.css"

function MenuProjectListPhone() {
  const { showMenu, setShowMenu, handleShow } = useContext(StateContext);

  const handleClose = () => setShowMenu(false);

  const { theme } = useTheme();

  const {
    menuProjectPopUp,
    projectPopUp,
    projectPopUpDark,
    homeIcon,
    houseIconText,
    houseIcon,
    buttonthing,
    closeButton,
    searchThing,
    folderTextThing,
    menuMyProjects,
    folderIcon2,
    myProjectsText,
    plusIcon,
    addProjectButton,
    offcanvasBodyDark,
    offcanvasBody,
    buttonthingDark,
    myProjectsTextDark,
  } = styles;

  return (
    <div className={menuProjectPopUp}>
      <Offcanvas
        show={showMenu}
        onHide={handleClose}
        backdrop={true}
        className="mt-5 mb-5 rounded-3 shadow border-0"
      >
        <Offcanvas.Body className={theme === "light" ? offcanvasBody : offcanvasBodyDark}>
          <div className={theme === "light" ? projectPopUp : projectPopUpDark}>
            <div className={homeIcon}>
              <Link to={"/projects"}>
                <div className={houseIconText}>
                  <img
                    src={houseIconPic}
                    alt="HouseIcon"
                    className={houseIcon}
                  />
                  <button className={theme === "light" ? buttonthing : buttonthingDark}>Home</button>
                </div>
              </Link>
              <button className={closeButton} onClick={handleClose}>
                <img src={xIcon} alt="X" />
              </button>
            </div>
            <div className={searchThing}>
              <SearchBar />
            </div>
            <div className={folderTextThing}>
              <div className={menuMyProjects}>
                <img
                  src={folderPlusIcon}
                  alt="folderIcon"
                  className={folderIcon2}
                />
                <p className={theme === "light" ? myProjectsText : myProjectsTextDark}>My Projects</p>
              </div>
              <div className={plusIcon}>
                <button className={addProjectButton} onClick={handleShow}>
                  <img
                    src={plusSquareFillIcon}
                    alt="squareIcon"
                  />
                </button>
              </div>
            </div>
            <MenuProjectList />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MenuProjectListPhone;
