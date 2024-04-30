import "../styles/MenuProjects.css";
import styles from "../styles/MenuProject.module.css";
import { StateContext } from "../utils/StateContext";
import { useContext } from "react";
import MenuProjectEditDelete from "./MenuProjectEditDelete";
import { useNavigate } from "react-router-dom";
import { DashSquare } from "react-bootstrap-icons";

function MenuProject({ project }) {
  const { setShowEdit, setprojectId, setShowMenu } = useContext(StateContext)

  const handleShow = () => setShowEdit(true);

  const navigate = useNavigate();

  const projectClickHandler = (project) => {
      setprojectId(project._id);
      setShowMenu(false);
      navigate("/tasklist");
  }
  
  
  const { projectName, icon } = project;



  const {menuProjectList, menuProjectIcon, menuProjectName, editIcon } = styles;

  return (
    <>
      <div className={menuProjectList} >
        <div className={menuProjectList} onClick={projectClickHandler}>
          <img src={icon} alt="icon" className={menuProjectIcon} />
          <p className={menuProjectName}>{projectName}</p>
        </div>
          <DashSquare className={editIcon}
                  onClick={handleShow}/>
        <MenuProjectEditDelete project={project}/>
      </div>
    </>
  );
}

export default MenuProject;
