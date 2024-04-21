import MenuProject from "./MenuProject";
import "../styles/ProjectList.css";

function MenuProjectList({ projects, setUpdate }) {
    return (
        projects.map((project, key) => {
            return (<MenuProject project={project} key={key} setUpdate={setUpdate}/>)
        })
    )
}

export default MenuProjectList;




