import { useContext, useState, useEffect, useRef } from "react";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/Owner.module.css";
import { PersonCircle, CircleFill } from "react-bootstrap-icons";
import { getOne } from "../services/get";
import { createPopper } from '@popperjs/core';

function TaskListTableOwner({ task, updateDataTask, setOwnerColor }) {
  const { projectId, setUpdate } = useContext(StateContext);
  const [isOpeno, setIsOpeno] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedOwnerColor, setSelectedOwnerColor] = useState("");
  const [ownerColors, setOwnerColors] = useState([]);
  const [getInfo, setProjectInfo] = useState("");
  const buttonRef = useRef(null);

  const getMembersNames = async () => {
    let projectData = await getOne(projectId);
    let getInfo = projectData.data.project;
    setProjectInfo(getInfo);
  };

  useEffect(() => {
    getMembersNames();
  }, [projectId]);

  const handleStatusUpdate = async (id, newOwner, fixedColor) => {
    try {
      const data = { owner: [newOwner, fixedColor] };
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
    const fixedColor = color.match(/_([^_]+)_/)[1];
    setOwnerColor(fixedColor);
    setIsOpeno(false);
    task.owner = owner;
    handleStatusUpdate(task._id, owner, fixedColor);
  };

  const getInitials = (name) => {
    const initials = name[0]
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
    circleIcon
  } = styles;

  useEffect(() => {
    let popperInstance;

    if (isOpeno) {
      popperInstance = createPopper(buttonRef.current, document.querySelector('.ownerMenu'), {
        placement: 'bottom',
      });
    } else {
      if (popperInstance) {
        popperInstance.destroy();
      }
    }

    return () => {
      if (popperInstance) {
        popperInstance.destroy();
      }
    };
  }, [isOpeno]);

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsOpeno(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
        ref={buttonRef}
        className={ownerBtn}
      >
        {task.owner && task.owner[1] ? (
          <div className={initialsStyle}>
            <CircleFill className={selectedOwnerColor == "" ? styles[task.owner[1]] : selectedOwnerColor}/>
            <div>{getInitials(task.owner)}</div>
          </div>
        ) : (
          <PersonCircle className={styles.ownerIconEmpty} />
        )}
      </button>
      {isOpeno[task._id] && (
        <div className={`${ownerMenu} ownerMenu`}>
          <div className={ownerListStyle}>
            {getInfo && getInfo.members.map((member, index) => (
              <div key={index}>
                <div className="{circleIcon}" onClick={() => handleOwnerClick(member.names, ownerColors[index])}>
                  <div className={initialsList}>
                    <CircleFill className={ownerColors[index]} />
                    <div>{getInitials(member.names)}</div>
                    <span>{member.names}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskListTableOwner;