import "../styles/SearchBar.css";
import { Search } from "react-bootstrap-icons";
// import Modal from 'react-bootstrap/Modal';
import { Sliders, CheckSquareFill, Square } from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from "react";
import { createPopper } from '@popperjs/core';

function SearchBar() {
  const [smShow, setSmShow] = useState(false);
  const [checked, setChecked] = useState({ projectName: false, status: false });
  const buttonRef = useRef(null);

  const handleCheck = (name) => {
    setChecked(prevState => ({ ...prevState, [name]: !prevState[name] }));
  }

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
      <form className="searchbar" action="">
        <div className="rounded border rounded-pill position-relative searchbar-div">
          <div className="input-group">
            <button id="button-addon" type="submit" className="btn">
              <Search className="search-icon" />
            </button>
            <input
              type="search"
              placeholder="Search"
              aria-describedby="button-addon"
              className="form-control rounded-pill border-0 color"
            />
            <Sliders
              // onClick={() => setSmShow(true)}
              // onClick={handleShow}
              ref={buttonRef}
              onClick={() => handleClick()}
              className="sliders me-3 d-flex align-self-center" />
                {smShow && (
              <div className="sort-popup" >
                <div className="sort-title">
                  <p className="modal-title">Choose columns to search</p>
                </div>
                <div onClick={() => handleCheck('projectName')}>
                  {checked.projectName ? <CheckSquareFill className="me-3 check-icon" /> : <Square className="me-3 check-icon-empty" />}
                  Project name
                </div>
                <div onClick={() => handleCheck('status')}>
                  {checked.status ? <CheckSquareFill className="me-3 check-icon" /> : <Square className="me-3 check-icon-empty" />}
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

export default SearchBar;

