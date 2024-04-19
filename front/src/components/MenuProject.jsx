import "../styles/Project.css";

function MenuProject({ project }) {
  const { projectName, icon } = project;

  return (
    <>
    <div style={{display: "inline-flex"}}>
    <img src={icon} alt="icon" style={{width: "20px"}}/>
    <p>{projectName}</p>
    </div>
    </>
  );
}

export default MenuProject;
