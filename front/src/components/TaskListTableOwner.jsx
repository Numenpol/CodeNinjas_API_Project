import React, { useState, useEffect } from "react";
import styles from "../styles/Owner.module.css";
import { PersonCircle, CircleFill } from "react-bootstrap-icons";

function TaskListTableOwner({task}) {
  const [isOpeno, setIsOpeno] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedOwnerColor, setSelectedOwnerColor] = useState("");
  const [ownerColors, setOwnerColors] = useState([]);

  useEffect(() => {
   
    const generateOwnerColors = () => {
      const colors = [
        styles.ownerIconWater,
        styles.ownerIconOrange,
        styles.ownerIconGrape,
        styles.ownerIconBlue,
        styles.ownerIconPink
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

    const owners = ["Peter Pan", "Alice Wonderland", "Tom Sawyer", "Mirabel Madrigal", "John Doe"];
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
    <div>
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
        <PersonCircle
          className={styles.ownerIconEmpty}
        />
      )}
    </button>
    {isOpeno[task._id] && (
      <div className={ownerMenu}>
        <div className={ownerListStyle}>
          {[
            "Peter Pan",
            "Alice Wonderland",
            "Tom Sawyer",
            "Mirabel Madrigal",
            "John Doe",
          ].map((owner, index) => (
            <div key={index}>
              <p
                onClick={() =>
                  handleOwnerClick(owner, ownerColors[index])
                }
              >
                <div className={initialsList}>
                  <CircleFill
                    className={ownerColors[index]}
                  />
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
