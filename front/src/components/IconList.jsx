import icons from "../services/icons";
import styles from "../styles/IconList.module.css";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";

function IconList() {
    const {setIcon} = useContext(StateContext)
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