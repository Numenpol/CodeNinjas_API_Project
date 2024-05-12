import { useContext, useState, useEffect } from "react";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/Owner.module.css";
import { PersonCircle, CircleFill } from "react-bootstrap-icons";
import { getOne } from "../services/get";

function TaskListTableOwner({ task, updateDataTask }) {
  const { projectId, setUpdate } = useContext(StateContext);
  const [isOpeno, setIsOpeno] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedOwnerColor, setSelectedOwnerColor] = useState("");
  const [ownerColors, setOwnerColors] = useState([]);
  const [getInfo, setProjectInfo] = useState("");

  const getMembersNames = async () => {
    let projectData = await getOne(projectId);
    let getInfo = projectData.data.project;
    setProjectInfo(getInfo);
  };

  useEffect(() => {
    getMembersNames();
  }, [projectId]);

  const handleStatusUpdate = async (id, newpPriority) => {
    try {
      const data = { status: newpPriority };
      await updateDataTask(id, data);
      setUpdate((update) => update + 1);
      // setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    const generateOwnerColors = () => {
      const colors = [
        styles.ownerIconWater,
        styles.ownerIconOrange,
        styles.ownerIconGrape,
        styles.ownerIconBlue,
        styles.ownerIconPink,
      ];
      let index = 0;
      return (ownerList) => {
        return ownerList.map(() => {
          const color = colors[index];
          index = (index + 1) % colors.length;
          return color;
        });
      };
    };

    const owners = [
      "Peter Pan",
      "Alice Wonderland",
      "Tom Sawyer",
      "Mirabel Madrigal",
      "John Doe",
    ];
    const assignColor = generateOwnerColors();
    setOwnerColors(assignColor(owners));
  }, []);

  const handleOwnerClick = (owner, color) => {
    setSelectedOwner(owner);
    setSelectedOwnerColor(color);
    setIsOpeno(false);
  };

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };

  const {
    ownerBtn,
    ownerMenu,
    ownerList: ownerListStyle,
    initials: initialsStyle,
    initialsList,
  } = styles;

  return (
    <div className="task-owner">
      <button
        type="button"
        onClick={() =>
          setIsOpeno((prevState) => ({
            ...prevState,
            [task._id]: !prevState[task._id],
          }))
        }
        className={ownerBtn}
      >
        {selectedOwner ? (
          <div className={initialsStyle}>
            <CircleFill className={selectedOwnerColor} />
            <div>{getInitials(task.owner)}</div>
          </div>
        ) : (
          <PersonCircle className={styles.ownerIconEmpty} />
        )}
      </button>
      {isOpeno[task._id] && (
        <div className={ownerMenu}>
          <div className={ownerListStyle}>
          {getInfo && getInfo.members.map((member, index) => (
              <div key={index}>
                <p onClick={() => handleOwnerClick(member.names, ownerColors[index])}>
                  <div className={initialsList}>
                    <CircleFill className={ownerColors[index]} />
                    <div>{getInitials(task.owner)}</div>
                    <span>{task.owner}</span>
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskListTableOwner;
