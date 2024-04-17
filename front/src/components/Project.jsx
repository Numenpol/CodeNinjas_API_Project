import "../styles/Project.css";
import { useState, useEffect } from "react";

function Project({ project }) {
  const [statusCheck, setStatusCheck] = useState("");

  const { _id, projectName, icon, description, status, overall } = project;
 
  useEffect(() => {
    setStatusCheck(status);
  }, [])

  return (
    <div key={_id} className="project-list-box">
      <tr className="project-list">
        <th className="project-icon">
          <img src={icon} alt="" />
        </th>
        <th className="project-name">
          <p>{projectName}</p>
        </th>
        <th className={statusCheck=="done" ? "project-done" : "" || statusCheck=="on hold" ? "project-onHold" : "" || statusCheck=="in progress" ? "project-inProgress" : ""}>
          <p>{status}</p>
        </th>
        <th className="project-overall">
          <p>{overall}</p>
        </th>
      </tr>
    </div>
  );
}

export default Project;
