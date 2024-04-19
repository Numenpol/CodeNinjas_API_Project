import CreateProjectForm from "./CreateProjectsForm";
import "../styles/createProjectPopUp.css";

function CreateProjectpopUp() {
  return (
    <>
      <div className="PopUpInsides">
        <div className="create-close--button">
          <button className="create-project--close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="CloseButton"
              viewBox="0 0 16 16"
              onClick={() => close()}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
        <div>
          <CreateProjectForm />
        </div>
        <div className="RocketThing">
          <img src="src\assets\Rocket.png" className="Rocket" />
          <h1 className="RocketSlogan">Ready? Launch!</h1>
        </div>
      </div>
    </>
  );
}

export default CreateProjectpopUp;
