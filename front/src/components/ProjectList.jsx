import Project from "./Project";
import "../styles/ProjectList.css";

function ProjectList({ projects, error }) {
  return (
    // <div>
      <div className="corner-gaps">
        <table className="table-box">
          <div className="project-list-box">
            <thead>
              <tr className="project-title">
                <th className="invinsible"></th>
                <th className="name">PROJECT NAME</th>
                <th className="status">STATUS</th>
                <th className="tasks">TASKS</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </div>
        </table>
      </div>
    // </div>
  );
}

export default ProjectList;




