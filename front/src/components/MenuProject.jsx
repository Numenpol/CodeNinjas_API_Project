import styles from "../styles/MenuProject.module.css";

function MenuProject({ project }) {
  const { projectName, icon } = project;
  const {MenuProjectList, MenuProjectIcon, MenuProjectName} = styles;

  return (
    <>
    <div className={MenuProjectList}>
    <img src={icon} alt="icon" className={MenuProjectIcon}/>
    <p className={MenuProjectName}>{projectName}</p>
    </div>
    </>
  );
}

export default MenuProject;
