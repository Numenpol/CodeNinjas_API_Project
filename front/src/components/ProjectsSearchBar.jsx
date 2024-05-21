import { CheckCircleFill, Circle, Search, Sliders } from "react-bootstrap-icons";
// import Modal from 'react-bootstrap/Modal';

import { useEffect, useRef, useState, useContext } from "react";
import { createPopper } from '@popperjs/core';
import { getSearchByProjectName } from "../services/get";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/SearchBar.module.css";

function ProjectsSearchBar() {
  const [smShow, setSmShow] = useState(false);
  const [checked, setChecked] = useState({ projectName: false, status: false });
  const [value, setValue] = useState("");

  const { setProjects, projects } = useContext(StateContext);


  const handleSearchChange = async (e) => {
    setValue(e.target.value);
    await handleSubmit(e);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await getSearchByProjectName(value);
    setProjects(result.data.projects);
  }


  const buttonRef = useRef(null);


  const handleCheck = (name) => {
    setChecked(prevState => ({
      // ...prevState, 
      [name]: !prevState[name]
    }));
  }

  const { searchbar, searchbarDiv, inputGroup, searchbarButton, searchIcon, sliders, searchInput, sortPopup, sortTitle, modalTitle, checkIcon, checkIconEmpty, sortBy } = styles;

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
    if (smShow) {
      setSmShow(false);
    } else {
      setSmShow(true);
    }
  }

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
              // onClick={() => setSmShow(true)}
              // onClick={handleShow}
              ref={buttonRef}
              onClick={() => handleClick()}
              className={`${sliders} me-3 d-flex align-self-center`} />
            {smShow && (
              <div className={`${sortPopup} sort-popup`}  >
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
          {/* <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
            dialogClassName="modal-90w"
          >
            <Modal.Header className="modal-title">
              <Modal.Title id="example-modal-sizes-title-sm" >
                Choose columns to search
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div onClick={() => handleCheck('projectName')}>
                {checked.projectName ? <CheckSquareFill className="me-3 check-icon" /> : <Square className="me-3 check-icon-empty" />}
                Project name
              </div>
              <div onClick={() => handleCheck('status')}>
                {checked.status ? <CheckSquareFill className="me-3 check-icon" /> : <Square className="me-3 check-icon-empty" />}
                Status
              </div>
            </Modal.Body>
          </Modal> */}
        </div>
      </form>
    </>
  );
}

export default ProjectsSearchBar;

