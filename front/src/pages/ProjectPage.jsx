import ProjectWithoutList from "../components/ProjectWithoutList";
import Header from "../components/Header";
import ProjectWithList from "../components/ProjectWithList";

function ProjectPage({projects, error, setUpdate}) {
    if (projects.length==0) {
    return ( 
        <>
        <Header/>  
        <ProjectWithoutList projects={projects} setUpdate={setUpdate}/>
        </>
     );        
    } else {
        return ( 
            <>
            <Header/>  
            <ProjectWithList projects={projects} error={error} setUpdate={setUpdate}/>
            </>
         );      
    }

}

export default ProjectPage;