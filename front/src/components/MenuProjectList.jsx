import MenuProject from "./MenuProject";
import "../styles/ProjectList.css";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";

function MenuProjectList() {
    const {projects} = useContext(StateContext);
    return (
        projects.map((project, key) => {
            return (<MenuProject project={project} key={key}/>)
        })
    )
}

export default MenuProjectList;




