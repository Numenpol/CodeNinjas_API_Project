import "../styles/Project.css";
import { useState, useEffect } from "react";

function Project({ project }) {
  const [statusCheck, setStatusCheck] = useState("");

  const { projectName, icon, description, status, overall } = project;

  useEffect(() => {
    setStatusCheck(status);
  }, []);

  return (
    <tr className="project-list" title={description}>
      <th className="project-icon">
        <img className="project-list-icon" src={icon} alt="" />
      </th>
      <td overclassName="project-name"> {projectName}</td>
      <td className="project-list-status">
        <p
          className={
            statusCheck == "done"
              ? "project-done"
              : statusCheck == "on hold"
                ? "project-onHold"
                : statusCheck == "in progress"
                  ? "project-inProgress"
                  : ""
          }
        >
          {status}
        </p>
      </td>
      <td className="project-overall">
        <p className="overall-box">{overall}</p>
      </td>

{/* <div className="myDIV">Hover over me.</div>
<div className="hide">I am shown when someone hovers over the div above.</div> */}
    </tr>
  );
}

export default Project;
