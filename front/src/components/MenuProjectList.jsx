import MenuProject from "./MenuProject";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import "../styles/MenuProject.css";

function MenuProjectList() {
  const { projects } = useContext(StateContext);

  return projects.map((project) => {
    return (
      <button key={project._id} style={{ border: "none", background: "none" }}>
        <MenuProject project={project} />
      </button>
    );
  });
}

export default MenuProjectList;
