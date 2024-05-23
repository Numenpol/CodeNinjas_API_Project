import {
  CheckCircleFill,
  Circle,
  Search,
  Sliders,
} from "react-bootstrap-icons";
// import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef, useState, useContext } from "react";
import { createPopper } from "@popperjs/core";
import { getSearchByTaskName } from "../services/get";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/SearchBar.module.css";
import { useTheme } from "../utils/ThemeContext";

function TaskListSearchBar() {
  const [smShow, setSmShow] = useState(false);
  const [checked, setChecked] = useState({ projectName: false, status: false });
  const [value, setValue] = useState("");

  const { setTasksById } = useContext(StateContext);

  const { theme } = useTheme();

  const handleSearchChange = async (e) => {
    setValue(e.target.value);
    await handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let projectId = sessionStorage.getItem("projectid");
      const result = await getSearchByTaskName(projectId, value);
      setTasksById(result.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const buttonRef = useRef(null);

  const handleCheck = (name) => {
    setChecked((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const {
    searchbar,
    searchbarDiv,
    inputGroup,
    searchbarButton,
    searchIcon,
    sliders,
    searchInputDark,
    searchInput,
    sortPopup,
    sortTitle,
    modalTitle,
    checkIcon,
    checkIconEmpty,
    sortBy,
    searchbarButtonDark,
    searchbarDivDark,
    slidersDark,
    sortPopupDark,
    modalTitleDark,
  } = styles;

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
    setSmShow(!smShow);
  };

  return (
    <>
      <form className={searchbar} onSubmit={handleSubmit}>
        <div className={theme === "light" ? searchbarDiv : searchbarDivDark}>
          <div className={inputGroup}>
            <button
              id="button-addon"
              type="submit"
              className={`btn ${theme === "light" ? searchbarButton : searchbarButtonDark}`}
            >
              <Search className={searchIcon} />
            </button>
            <input
              type="search"
              placeholder="Search"
              aria-describedby="button-addon"
              className={`form-control rounded-pill border-0 color ${
                theme === "light" ? searchInput : searchInputDark
              }`}
              onChange={handleSearchChange}
              value={value}
            />
            <Sliders
              ref={buttonRef}
              onClick={handleClick}
              className={`${theme === "light" ? sliders : slidersDark} me-3 d-flex align-self-center`}
            />
            {smShow && (
              <div className={`${theme === "light" ? sortPopup : sortPopupDark} sort-popup`}>
                <div className={sortTitle}>
                  <p className={theme === "light" ? modalTitle : modalTitleDark}>Choose columns to search</p>
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

export default TaskListSearchBar;
