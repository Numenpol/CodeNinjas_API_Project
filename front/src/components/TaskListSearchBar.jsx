import { CheckCircleFill, Circle, Search, Sliders } from "react-bootstrap-icons";
import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { createPopper } from "@popperjs/core";
import { getSearchByTaskName } from "../services/get";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/SearchBar.module.css";
import { useTheme } from "../utils/ThemeContext";
import OutsideClickHandler from 'react-outside-click-handler';

function TaskListSearchBar() {
  const [smShow, setSmShow] = useState(false);
  const [checked, setChecked] = useState({ task: false, status: false, priority: false });
  const [value, setValue] = useState("");
  const { setTasksById } = useContext(StateContext);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debounceSearch = useCallback(
    debounce(async (searchValue, priority, status) => {
      try {
        let projectId = sessionStorage.getItem("projectid");
        const result = await getSearchByTaskName(
          projectId,
          searchValue,
          priority,
          status
        );
        setTasksById(result.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }, 400),
    []
  );

  const handleSearchChange = (e) => {
    setValue(e.target.value);
    debounceSearch(
      e.target.value,
      checked.priority,
      checked.status ? "active" : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let projectId = sessionStorage.getItem("projectid");
      const result = await getSearchByTaskName(
        projectId,
        value,
        checked.priority,
        checked.status ? "active" : ""
      );
      setTasksById(result.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const buttonRef = useRef(null);


  const handleCheck = (name) => {
    setChecked((prevState) => {
      const newState = { task: false, status: false, priority: false };
      newState[name] = !prevState[name];
      return newState;
    });
    setSmShow(false);

    debounceSearch(
      value,
      name === "priority" ? !checked.priority : false,
      name === "status" ? (!checked.status ? 'active' : '') : ''
    );
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

  const { theme } = useTheme();

  return (
    <>
      <form className={searchbar} onSubmit={handleSubmit}>
        <div className={theme === "light" ? searchbarDiv : searchbarDivDark}>
          <div className={inputGroup}>
            <button
              id="button-addon"
              type="submit"
              className={`btn ${theme === "light" ? searchbarButton : searchbarButtonDark
                }`}
            >
              <Search className={searchIcon} />
            </button>
            <input
              type="search"
              placeholder="Search"
              aria-describedby="button-addon"
              className={`form-control rounded-pill border-0 color ${theme === "light" ? searchInput : searchInputDark
                }`}
              onChange={handleSearchChange}
              value={value}
            />
            <Sliders
              ref={buttonRef}
              onClick={handleClick}
              className={`${theme === "light" ? sliders : slidersDark
                } me-3 d-flex align-self-center`}
            />
            {smShow && (
              <OutsideClickHandler onOutsideClick={() => setSmShow(false)}>
                <div
                  className={`${theme === "light" ? sortPopup : sortPopupDark
                    } sort-popup`}
                >
                  <div className={sortTitle}>
                    <p
                      className={theme === "light" ? modalTitle : modalTitleDark}
                    >
                      Choose columns to search
                    </p>
                  </div>
                  <div onClick={() => handleCheck("task")} className={sortBy}>
                    {checked.task ? (
                      <CheckCircleFill className={checkIcon} />
                    ) : (
                      <Circle className={checkIconEmpty} />
                    )}
                    Task
                  </div>
                  <div onClick={() => handleCheck("status")} className={sortBy}>
                    {checked.status ? (
                      <CheckCircleFill className={checkIcon} />
                    ) : (
                      <Circle className={checkIconEmpty} />
                    )}
                    Status
                  </div>
                  <div onClick={() => handleCheck("priority")} className={sortBy}>
                    {checked.priority ? (
                      <CheckCircleFill className={checkIcon} />
                    ) : (
                      <Circle className={checkIconEmpty} />
                    )}
                    Priority
                  </div>
                </div>
              </OutsideClickHandler>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default TaskListSearchBar;
