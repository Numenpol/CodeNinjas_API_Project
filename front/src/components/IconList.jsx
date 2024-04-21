import icons from "../services/icons";
import styles from "../styles/IconList.module.css";

function IconList({ setIcon }) {
    const {projectIcons, createProjectIcons } = styles;
    return (
        <div className={projectIcons}>
            {icons.map((icon, key) =>
                <img src={icon} alt="icon" key={key} className={createProjectIcons} onClick={() => {
                    setIcon(icon);
                }} />
            )}
        </div>
    );
}

export default IconList;