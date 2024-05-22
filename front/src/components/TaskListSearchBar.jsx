import { CheckCircleFill, Circle, Search, Sliders } from "react-bootstrap-icons";
import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { createPopper } from '@popperjs/core';
import { getSearchByTaskName } from "../services/get";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/SearchBar.module.css";

function TaskListSearchBar() {
    const [smShow, setSmShow] = useState(false);
    const [checked, setChecked] = useState({ projectName: false, status: false });
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
        debounce(async (searchValue) => {
            try {
                let projectId = sessionStorage.getItem('projectid');
                const result = await getSearchByTaskName(projectId, searchValue);
                setTasksById(result.data.tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }, 400),
        []
    );

    const handleSearchChange = (e) => {
        setValue(e.target.value);
        debounceSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let projectId = sessionStorage.getItem('projectid');
            const result = await getSearchByTaskName(projectId, value);
            setTasksById(result.data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const buttonRef = useRef(null);

    const handleCheck = (name) => {
        setChecked(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    };

    const {
        searchbar, searchbarDiv, inputGroup, searchbarButton, searchIcon, sliders, searchInput, sortPopup, sortTitle,
        modalTitle, checkIcon, checkIconEmpty, sortBy
    } = styles;

    useEffect(() => {
        let popperInstance;

        if (smShow) {
            popperInstance = createPopper(buttonRef.current, document.querySelector('.sort-popup'), {
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
    }, [smShow]);

    const handleClick = () => {
        setSmShow(!smShow);
    };

    return (
        <>
            <form className={searchbar} onSubmit={handleSubmit}>
                <div className={searchbarDiv}>
                    <div className={inputGroup}>
                        <button id="button-addon" type="submit" className={`btn ${searchbarButton}`}>
                            <Search className={searchIcon} />
                        </button>
                        <input
                            type="search"
                            placeholder="Search"
                            aria-describedby="button-addon"
                            className={`form-control rounded-pill border-0 color ${searchInput}`}
                            onChange={handleSearchChange}
                            value={value}
                        />
                        <Sliders
                            ref={buttonRef}
                            onClick={handleClick}
                            className={`${sliders} me-3 d-flex align-self-center`}
                        />
                        {smShow && (
                            <div className={`${sortPopup} sort-popup`}>
                                <div className={sortTitle}>
                                    <p className={modalTitle}>Choose columns to search</p>
                                </div>
                                <div onClick={() => handleCheck('projectName')} className={sortBy}>
                                    {checked.projectName ? <CheckCircleFill className={checkIcon} /> : <Circle className={checkIconEmpty} />}
                                    Project name
                                </div>
                                <div onClick={() => handleCheck('status')} className={sortBy}>
                                    {checked.status ? <CheckCircleFill className={checkIcon} /> : <Circle className={checkIconEmpty} />}
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
