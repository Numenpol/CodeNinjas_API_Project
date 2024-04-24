import icons from "../services/icons";
import styles from "../styles/IconList.module.css";
import { useContext, useState } from "react";
import { StateContext } from "../utils/StateContext";

function IconList() {
    const {setIcon} = useContext(StateContext);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const {projectIcons, createProjectIcons, createProjectIconsSelected} = styles;

    const handleIconClick = (icon) => {
        setIcon(icon);
        setSelectedIcon(icon);
    }

    return (
        <div className={projectIcons}>
            {icons.map((icon, key) =>
                <img src={icon} alt="icon" key={key} className={icon === selectedIcon ? createProjectIconsSelected : createProjectIcons} 
                onClick={() => {
                handleIconClick(icon)
                }} />
            )}
        </div>
    );
}

export default IconList;