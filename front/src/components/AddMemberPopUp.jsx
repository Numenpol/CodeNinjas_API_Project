import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import "../styles/AddMemberPopUp.css";
import styles from "../styles/AddMemberPopUp.module.css";

function AddMemberPopUp() {

  const {AddMemberPopUpheadertexts, AddMemberInput} = styles;
  
  return (
    <>
      <div className="AddMemberPopUpCont">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className={AddMemberPopUpheadertexts}>
            {" "}
            User email:
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            bsPrefix={AddMemberInput}
          />
        </Form.Group>
      </div>
    </>
  );
}

export default AddMemberPopUp;
