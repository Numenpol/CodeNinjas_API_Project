import ProjectWithoutList from "../components/ProjectWithoutList";
import Header from "../components/Header";
import ProjectWithList from "../components/ProjectWithList";

function ProjectPage({projects, error}) {
    if (projects.length==0) {
    return ( 
        <>
        <Header/>  
        <ProjectWithoutList/>
        </>
     );        
    } else {
        return ( 
            <>
            <Header/>  
            <ProjectWithList projects={projects} error={error}/>
            </>
         );      
    }

}

export default ProjectPage;