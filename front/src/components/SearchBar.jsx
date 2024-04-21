import "../styles/SearchBar.css";
import { Search } from "react-bootstrap-icons";
import Modal from 'react-bootstrap/Modal';
import { Sliders, CheckSquareFill, Square } from 'react-bootstrap-icons';
import { useState } from "react";

function SearchBar() {
  const [smShow, setSmShow] = useState(false);
  const [checked, setChecked] = useState({ projectName: false, status: false });

  const handleCheck = (name) => {
    setChecked(prevState => ({ ...prevState, [name]: !prevState[name] }));
  }

  return (
    <>
      <form className="searchbar" action="">
        <div className="rounded border rounded-pill mb-5">
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
           
              <Sliders onClick={() => setSmShow(true)}  className="sliders me-3 mt-2" />
          </div>
            <Modal
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
            </Modal>
        </div>
      </form>
    </>
  );
}

export default SearchBar;

