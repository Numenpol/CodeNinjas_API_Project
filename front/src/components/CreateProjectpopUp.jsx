import CreateProjectForm from "./CreateProjectsForm";
import "../styles/createProjectPopUp.css";
import "../styles/projectWithoutList.css";
import xIcon from "../assets/xIcon.svg";
import rocket from "../assets/rocket.svg"

function CreateProjectpopUp() {
  return (
    <div className="create-project--popUp">
      <div className="PopUpInsides">
        <div className="create-close--button">
          <button className="create-project--close">
          <img src={xIcon} alt="xIcon"/>
          </button>
        </div>
        <div>
          <CreateProjectForm />
        </div>
        <div className="RocketThing">
          <img src={rocket} className="Rocket" />
          <h1 className="RocketSlogan">Ready? Launch!</h1>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectpopUp;
