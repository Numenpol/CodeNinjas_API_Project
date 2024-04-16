import Popup from "reactjs-popup";
import ProjectListPopUp from "../Popup/ProjectListPopUp";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import CreateProjectpopUp from "../Popup/CreateProjectpopUp";
import "../styles/projectsList.css";

function ProjectList() {
  return (
    <>
      <div className="ProjectThing">
        <div className="ProjectListHeader">
          <Popup
            trigger={
              <button className="MenuThing">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="MenuIcon"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </button>
            }
            position="bottom left"
          >
            <div>
              <ProjectListPopUp />
            </div>
          </Popup>
          <div className="FolderText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35.15"
              height="29.25"
              fill="currentColor"
              className="FolderIcon1"
              viewBox="0 0 16 16"
            >
              <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z" />
              <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5" />
            </svg>
            <div className="MyProjectsText">My Projects</div>
          </div>
          <div className="Thing2">
          <InputGroup className="SearcbarProjectList">
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
              className="InputBoxCss"
              placeholder="Search"
            />
          </InputGroup>
          </div>
        </div>
      </div>
      <div className="CreateProjectTHing">
        <img src="src\assets\Group 54.svg" alt="" className="ChartIcon" />

        <Popup
          trigger={
            <Button
              variant="primary"
              style={{
                backgroundColor: "#3fadbe",
                border: "#3fadbe",
                width: "299px",
                marginLeft: "30.5px",
                marginTop: "20px",
              }}
            >
              Create Your first project
            </Button>
          }
          className="CreatePopUp"
          position="top"
        >
          <div>
            <CreateProjectpopUp />
          </div>
        </Popup>
      </div>
    </>
  );
}

export default ProjectList;
