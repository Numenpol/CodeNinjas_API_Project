// import "../styles/SearchBar.css";
import {
  CheckCircleFill,
  Circle,
  Search,
  Sliders,
} from "react-bootstrap-icons";
// import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import styles from "../styles/SearchBar.module.css";
import { useTheme } from "../utils/ThemeContext";

function SearchBar() {
  const [smShow, setSmShow] = useState(false);
  const [checked, setChecked] = useState({ projectName: false, status: false });
  const buttonRef = useRef(null);

  const handleCheck = (name) => {
    setChecked((prevState) => ({
      // ...prevState,
      [name]: !prevState[name],
    }));
  };

  const { theme } = useTheme();

  useEffect(() => {
    let popperInstance;

    if (smShow) {
      popperInstance = createPopper(
        buttonRef.current,
        document.querySelector(".sort-popup"),
        {
          placement: "bottom",
        }
      );
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
  }, [smShow]);

  const handleClick = () => {
    if (smShow) {
      setSmShow(false);
    } else {
      setSmShow(true);
    }
  };

  const {
    searchbar,
    searchbarDiv,
    searchbarDivDark,
    inputGroup,
    searchbarButton,
    searchIcon,
    sliders,
    searchInput,
    sortPopup,
    sortTitle,
    modalTitle,
    checkIcon,
    checkIconEmpty,
    sortBy,
    searchbarButtonDark,
    searchInputDark,
    slidersDark,
  } = styles;

  return (
    <>
      <form className={searchbar} action="">
        <div className={theme == "light" ? searchbarDiv : searchbarDivDark}>
          <div
            // className="input-group"
            className={inputGroup}
          >
            <button
              id="button-addon"
              type="submit"
              className={`btn ${
                theme == "light" ? searchbarButton : searchbarButtonDark
              }`}
            >
              <Search className={searchIcon} />
            </button>
            <input
              type="search"
              placeholder="Search"
              aria-describedby="button-addon"
              className={`form-control rounded-pill border-0 color ${theme == "light" ? searchInput : searchInputDark}`}
            />
            <Sliders
              // onClick={() => setSmShow(true)}
              // onClick={handleShow}
              ref={buttonRef}
              onClick={() => handleClick()}
              className={`${theme == "light" ? sliders : slidersDark} me-3 d-flex align-self-center`}
            />
            {smShow && (
              <div className={`${sortPopup} sort-popup`}>
                <div className={sortTitle}>
                  <p className={modalTitle}>Choose columns to search</p>
                </div>
                <div
                  onClick={() => handleCheck("projectName")}
                  className={sortBy}
                >
                  {checked.projectName ? (
                    <CheckCircleFill className={checkIcon} />
                  ) : (
                    <Circle className={checkIconEmpty} />
                  )}
                  Project name
                </div>
                <div onClick={() => handleCheck("status")} className={sortBy}>
                  {checked.status ? (
                    <CheckCircleFill className={checkIcon} />
                  ) : (
                    <Circle className={checkIconEmpty} />
                  )}
                  Status
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
