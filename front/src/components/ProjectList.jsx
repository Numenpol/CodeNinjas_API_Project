import Project from "./Project";
import "../styles/ProjectList.css";

function ProjectList({ projects, error }) {
  return (
    <div className="corner-gaps">
    <table className="table-box">
        <tr className="project-title">
          <th className="invinsible"></th>
          <th className="name">PROJECT NAME</th>
          <th className="status">STATUS</th>
          <th className="tasks">TASKS</th>
        </tr>
        <tr>
          <th>
            {projects.map((project) => {
              return (
                <Project
                  className="project-list"
                  project={project}
                  key={project._id}
                />
                
              );
            })}
            {error}{" "}
            </th>
        </tr>
      <tbody></tbody>
    </table>
    </div>
  );
}

export default ProjectList;
