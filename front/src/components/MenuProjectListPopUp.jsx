import Offcanvas from 'react-bootstrap/Offcanvas';
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import xIcon from "../assets/xIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import plusSquareFillIcon from "../assets/plusSquareFillIcon.svg";
// import searchIcon from "../assets/searchIcon.svg";
import houseIcon from "../assets/houseIcon.svg";
import "../styles/projectWithoutList.css";
// import "../styles/projectListPopUp.css";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import MenuProjectList from "./MenuProjectList"
import SearchBar from './SearchBar';

function MenuProjectListPopUp() {
  const { showMenu, setShowMenu, handleShow } = useContext(StateContext)

  const handleClose = () => setShowMenu(false);

  return (
    <div className='MenuProjectPopUp'>
      <Offcanvas show={showMenu} onHide={handleClose} backdrop={false} className="mt-5 mb-5 rounded-3 shadow border-0">
        <Offcanvas.Body>
          <div className="ProjectPopUp">
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
            <SearchBar />
            </div>
            <div className="FolderTextThing">
              <div className="menu-my--projects">
                <img src={folderPlusIcon} alt="folderIcon" className="FolderIcon2" />
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
    </div>
  );
}

export default MenuProjectListPopUp;