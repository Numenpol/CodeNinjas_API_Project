import Project from "./Project";
import { StateContext } from "../utils/StateContext";
import { useContext } from "react";
import styles from "../styles/ProjectList.module.css";

function ProjectList() {
  const { projects, error } = useContext(StateContext);

const {cornerGaps, tableBox, tableHeader, projectTitle, invinsible, projectListName, projectListStatus, projectListTasks, tableBodyBox, projectListList} = styles;

  return (
    // <div>
      <div className={cornerGaps}>
        <table className={tableBox}>
          {/* <div className="project-list-box"> */}
            <thead className={tableHeader}>
              <tr className={projectTitle}>
                <th className={invinsible}></th>
                <th className={projectListName}>PROJECT NAME</th>
                <th className={projectListStatus}>STATUS</th>
                <th className={projectListTasks}>TASKS</th>
              </tr>
            </thead>
            <tbody className={tableBodyBox}>
              {projects.map((project) => {
                return (
                  <Project
                    className={projectListList}
                    project={project}
                    key={project._id}
                  />
                );
              })}
              {error}{""}
            </tbody>
          {/* </div> */}
        </table>
      </div>
    /* </div>  */
  );
}

export default ProjectList;




