import MenuProject from "./MenuProject";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";

function MenuProjectList() {
    const {projects } = useContext(StateContext);
    


    return (
        projects.map((project) => {
            return (
            <div key={project._id}><MenuProject project={project}/></div>
            )
        })
    )
}

export default MenuProjectList;




