import MenuProject from "./MenuProject";
import "../styles/ProjectList.css";

function MenuProjectList({ projects }) {
    return (
        projects.map((project, key) => {
            return (<MenuProject project={project} key={key}/>)
        })
    )
}

export default MenuProjectList;




