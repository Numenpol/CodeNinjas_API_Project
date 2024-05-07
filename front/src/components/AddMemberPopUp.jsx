// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../styles/AddMemberPopUp.module.css";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";


function AddMemberPopUp({handleClose, showAddMember}) {
  const { users } = useContext(StateContext);


  const { AddMemberPopUpheadertexts, addMemberSelect, AddMemberInput, AddMemberPopUpModal, AddMemberPopUpheader, AddMemberPopUpheadertext, AddMemberPopUpbody, AddButtons, AddCloseButton, AddAddButton, AddMemberPopUpfooter } = styles;

  return (
    <>
      <Modal
        show={showAddMember}
        onHide={handleClose}
        bsPrefix={AddMemberPopUpModal}
      >
        <Modal.Header closeButton bsPrefix={AddMemberPopUpheader}>
          <Modal.Title>
            {" "}
            <div className={AddMemberPopUpheadertext}>
              Add project member
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix={AddMemberPopUpbody}>
        <div className="AddMemberPopUpCont">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={AddMemberPopUpheadertexts}>
              User email:
            </Form.Label>
            <Form.Control bsPrefix={AddMemberInput} />
          </Form.Group>
        </div>
        <div className={AddButtons}>
          <Button
            variant="primary"
            onClick={handleClose}
            bsPrefix={AddCloseButton}
          >
            Cancel
          </Button>
          <Button variant="primary" bsPrefix={AddAddButton}>
            Add
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer bsPrefix={AddMemberPopUpfooter}>
        <div className={AddMemberPopUpfooter}>Work together!</div>
      </Modal.Footer>
    </Modal >
            </>
  );
}

export default AddMemberPopUp;