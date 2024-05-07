// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../styles/AddMemberPopUp.module.css";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";

function AddMemberPopUp() {
  const { users } = useContext(StateContext);


  const {AddMemberPopUpheadertexts, addMemberSelect, AddMemberInput} = styles;
  
  return (
    <div className="AddMemberPopUpCont">
      <Form.Group controlId="formBasicEmail">
        <Form.Label className={AddMemberPopUpheadertexts}>
          User email:
          <Form.Select aria-label="Default select example" className={addMemberSelect}>
            <option>Open this select menu</option>
            {users.map((user, key) => (
              <option key={key} value={user.email}>
                {user.email}
              </option>
            ))}
          </Form.Select>
        </Form.Label>
        <Form.Control bsPrefix={AddMemberInput} />
      </Form.Group>
    </div>
  );
}

export default AddMemberPopUp;
