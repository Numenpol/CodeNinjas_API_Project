import ProjectList from "../components/ProjectList"
import ProjectLists from "../components/ProjectLists"
function ProjectPage({projects, error}) {
    return ( 
        <>
        <ProjectList/>
        <ProjectLists projects={projects} error={error}/>
        </>
     );
}

export default ProjectPage;