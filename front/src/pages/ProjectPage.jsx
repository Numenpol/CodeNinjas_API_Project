import ProjectWithoutList from "../components/ProjectWithoutList";
import Header from "../components/Header";
import ProjectWithList from "../components/ProjectWithList";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";

function ProjectPage() {
    const {projects} = useContext(StateContext)
    if (projects.length==10) {
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
            <ProjectWithList/>
            </>
         );      
    }

}

export default ProjectPage;