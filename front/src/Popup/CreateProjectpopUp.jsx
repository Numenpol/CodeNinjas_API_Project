import CreateProjectForm from "../components/CreateProjectsForm";
function CreateProjectpopUp() {
  return (
    <>
      <div className="PopUpInsides">
        <h1 className="H12">Create a new project</h1>
        <CreateProjectForm />
        <div className="RocketThing">
          <img src="src\assets\Rocket.png" className="Rocket" />
          <h1 className="RocketSlogan">Ready? Launch!</h1>
        </div>
      </div>
    </>
  );
}

export default CreateProjectpopUp;
