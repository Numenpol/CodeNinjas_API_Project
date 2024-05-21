import Project from "./Project";
import { StateContext } from "../utils/StateContext";
import { useContext } from "react";
import styles from "../styles/ProjectList.module.css";
import { useTheme } from "../utils/ThemeContext";

function ProjectList() {
  const { projects, error } = useContext(StateContext);

const {cornerGaps, tableBox, tableHeader, tableBoxDark, projectTitle, tableBodyBoxDark, invinsible, projectListTasksDark, projectListStatusDark, projectListName, projectListNameDark, projectListStatus, projectListTasks, tableBodyBox, projectListList, cornerGapsDark} = styles;

const { theme } = useTheme();

  return (
    // <div>
      <div className={theme == "light" ? cornerGaps : cornerGapsDark}>
        <table className={theme == "light" ? tableBox : tableBoxDark}>
          {/* <div className="project-list-box"> */}
            <thead className={tableHeader}>
              <tr className={projectTitle}>
                {/* <th className={invinsible}></th> */}
                <th colSpan={2} className={theme == "light" ? projectListName : projectListNameDark}>PROJECT NAME</th>
                <th className={theme == "light" ? projectListStatus : projectListStatusDark}>STATUS</th>
                <th className={theme == "light" ? projectListTasks : projectListTasksDark}>TASKS</th>
              </tr>
            </thead>
            <tbody className={theme == "light" ? tableBodyBox : tableBodyBoxDark}>
              {projects.map((project) => {
                return (
                  <Project
                    className={projectListList}
                    project={project}
                    key={project._id}
                  />
                );
              })}
            </tbody>
          {/* </div> */}
        </table>
      </div>
    /* </div>  */
  );
}

export default ProjectList;




