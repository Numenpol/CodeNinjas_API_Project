import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import xIcon from "../assets/xIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import plusSquareFillIcon from "../assets/plusSquareFillIcon.svg";
import searchIcon from "../assets/searchIcon.svg";
import houseIcon from "../assets/houseIcon.svg";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MenuProjectList from "./MenuProjectList";
import "../styles/projectWithoutList.css";
import "../styles/projectListPopUp.css";

function MenuProjectListPopUp() {
  const { showMenu, setShowMenu, handleShow } = useContext(StateContext);

  const handleClose = () => setShowMenu(false);

  return (
    <>
      <Offcanvas
        show={showMenu}
        onHide={handleClose}
        backdrop={false}
        bsPrefix="ProjectPopUp"
      >
        <Offcanvas.Body bsPrefix="popup-content">
          <div className="PopupHeader">
            <div className="home-icon">
              <div className="HouseIconText">
                <img src={houseIcon} alt="HouseIcon" className="HouseIcon" />
                <span className="buttonthing">Home</span>
              </div>
              <button className="closeButton" onClick={handleClose}>
                <img src={xIcon} alt="X" />
              </button>
            </div>
            <div className="SearchThing">
              <InputGroup size="sm" className="Epic">
                <InputGroup.Text
                  id="inputGroup-sizing-sm"
                  bsPrefix="SearchIcon"
                >
                  <img
                    src={searchIcon}
                    alt="searchIcon"
                    className="Searchicon"
                  />
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  placeholder="Search"
                  aria-describedby="inputGroup-sizing-sm"
                  bsPrefix="SearchPopUp"
                />
              </InputGroup>
            </div>
            <div className="FolderTextThing">
              <div className="menu-my--projects">
                <img
                  src={folderPlusIcon}
                  alt="folderIcon"
                  className="FolderIcon2"
                />
                <p className="my-projects--text">My Projects</p>
              </div>
              <div className="PlusIcon">
                <button className="AddProjectButton" onClick={handleShow}>
                  <img src={plusSquareFillIcon} alt="squareIcon" />
                </button>
              </div>
            </div>
            <MenuProjectList />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MenuProjectListPopUp;
