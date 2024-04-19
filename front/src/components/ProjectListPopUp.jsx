import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Popup from "reactjs-popup";
import CreateProjectpopUp from "./CreateProjectpopUp";
import "../styles/projectListPopUp.css";
import MenuProjectList from "./MenuProjectList"
import "../styles/projectWithoutList.css";
import xIcon from "../assets/xIcon.svg";
import folderPlusIcon from "../assets/folderPlusIcon.svg";
import plusSquareFillIcon from "../assets/plusSquareFillIcon.svg";
import searchIcon from "../assets/searchIcon.svg";
import houseIcon from "../assets/houseIcon.svg";

function ProjectListPopUp({projects}) {


  return (
    <>
      <div className="ProjectPopUp">
        <div className="home-icon">
          <div className="HouseIconText">
          <img src={houseIcon} alt="HouseIcon" className="HouseIcon"/>
            <span className="buttonthing">Home</span>
          </div>
          <button className="closeButton">
          <img src={xIcon} alt="X" />
          </button>
        </div>
        <div className="SearchThing">
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">
            <img src={searchIcon} alt="searchIcon" />
            </InputGroup.Text>
            <Form.Control
              aria-label="Small"
              placeholder="Search"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
        </div>
        <div className="FolderTextThing">
          <div className="menu-my--projects">
            <img src={folderPlusIcon} alt="folderIcon" className="FolderIcon2"/>
            <p className="my-projects--text">My Projects</p>
          </div>
          <Popup
            trigger={
              <div className="PlusIcon">
                <button className="AddProjectButton">
                <img src={plusSquareFillIcon} alt="squareIcon" />
                </button>
              </div>
            }
            position="bottom left"
          >
            <div>
              <CreateProjectpopUp/>
            </div>
          </Popup>
        </div>
            <MenuProjectList projects={projects}/>
      </div>
    </>
  );
}

export default ProjectListPopUp;
