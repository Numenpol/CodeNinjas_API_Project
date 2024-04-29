import React, { useState } from 'react';
import styles from '../styles/Owner.module.css';
import { PersonCircle, CircleFill } from 'react-bootstrap-icons';
import owner from '../assets/owner.svg';
// import ownerEmpty from '../assets/ownerEmpty.svg';

function Owner() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedOwnerColor, setSelectedOwnerColor] = useState("ownerIconWater");

  const handleOwnerClick = (owner, color) => {
    setSelectedOwner(owner);
    setSelectedOwnerColor(`${color} ${styles.selected}`); 
    setIsOpen(false);
  };

  const getInitials = (name) => {
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('');
    return initials.toUpperCase();
  };

  const { ownerBtn, ownerMenu, ownerList, ownerIconWater, ownerIconOrange, ownerIconGrape, ownerIconBlue, ownerIconEmpty, initials } = styles;

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className={ownerBtn}>
        {selectedOwner ? (
          <div className={initials}>
            <CircleFill className={selectedOwnerColor} />
            <div>{getInitials(selectedOwner)}</div>
          </div>
        ) : (
          <PersonCircle className={ownerIconEmpty}/>
        )}
      </button>
      {isOpen && (
        <div className={ownerMenu}>
          <div className={ownerList}>
            <p onClick={() => handleOwnerClick("Peter Pan", ownerIconWater)}><CircleFill className={ownerIconWater}/> Peter Pan</p>
            <p onClick={() => handleOwnerClick("Alice Wonderland", ownerIconOrange)}><CircleFill className={ownerIconOrange}/> Alice Wonderland</p>
            <p onClick={() => handleOwnerClick("Tom Sawyer", ownerIconGrape)}><CircleFill className={ownerIconGrape}/> Tom Sawyer</p>
            <p onClick={() => handleOwnerClick("Mirabel Madrigal", ownerIconBlue)}><CircleFill className={ownerIconBlue}/> Mirabel Madrigal</p>
            <p onClick={() => handleOwnerClick("Alice Wonderland", ownerIconOrange)}><CircleFill className={ownerIconOrange}/> Alice Wonderland</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Owner;