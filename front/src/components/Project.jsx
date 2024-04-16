

function Project({ project }) {
    
    const { _id, projectName, icon, description, status, overall} = project;
    return(
        <div key={_id}>
            <p>{icon}</p>
            <p>{projectName}</p>
            <p>{status}</p>
            <p>{overall}</p>
        </div>
    )
}

export default Project;