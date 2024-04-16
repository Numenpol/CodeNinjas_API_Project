import Project from "./Project";

function ProjectList({projects, error}) {
    return(
        <>
        {projects.map((project) => {
        return <Project project={project} key={project._id}/>
        })}
        {error}
        </>
    );
}

export default ProjectList;