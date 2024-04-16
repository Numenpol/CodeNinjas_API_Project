import icons from "../services/icons";
import { v4 as uuidv4 } from "uuid";

function IconList() {
    const uniqueKey = uuidv4();

    return (
    <>
    {console.log(icons)}
    {icons.map((icon) => 
        <img src={icon} alt="icon" key={uniqueKey}/>
    )}
        </>
    );
}

export default IconList;