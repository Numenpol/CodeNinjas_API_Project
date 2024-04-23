import Project from "./Project";
import "../styles/ProjectList.css";
import { StateContext } from "../utils/StateContext";
import { useContext } from "react";

function ProjectList() {
  const { projects, error } = useContext(StateContext);

  return (
    // <div>
      <div className="corner-gaps">
        <table className="table-box">
          {/* <div className="project-list-box"> */}
            <thead className="table-header">
              <tr className="project-title">
                <th className="invinsible"></th>
                <th className="name">PROJECT NAME</th>
                <th className="status">STATUS</th>
                <th className="tasks">TASKS</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {projects.map((project) => {
                return (
                  <Project
                    className="project-list--list"
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




