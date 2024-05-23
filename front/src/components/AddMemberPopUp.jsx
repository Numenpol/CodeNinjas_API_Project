import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { useForm } from "react-hook-form";
import { addMembersToProject } from "../services/update";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../styles/AddMemberPopUp.module.css";
import { login } from "../utils/auth/authenticate";
import "../styles/taskListTable.css";
import xIcon from "../assets/xIcon.svg";

function AddMemberPopUp({ handleClose, showAddMember }) {
  const { users } = useContext(StateContext);

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const objectId = sessionStorage.getItem("projectid");

  const formSubmitHandler = async (data) => {
    try {
      const user = users.find((user) => user.email === data.email);
      const currentUser = localStorage.getItem("user");
      const userObject = JSON.parse(currentUser);
      if(data.email==userObject.data.email){

      } else
      if (user) {
        const emails = data.email;
        const names = user.name;
        await addMembersToProject({
          id: objectId,
          // emails: [...emails, ...names],
          emails: {
            emails,
            names,
          }
          
        });
        reset();
        handleClose();
      } else {
        setError("email", {
          type: "manual",
          message: `User with email ${data.email} not found`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    AddMemberPopUpheadertexts,
    addMemberSelect,
    AddMemberInput,
    AddMemberPopUpModal,
    AddMemberPopUpheader,
    AddMemberPopUpheadertext,
    AddMemberPopUpbody,
    AddButtons,
    AddCloseButton,
    AddAddButton,
    AddMemberPopUpfooter,
    mailDiv,
    xIconButton
  } = styles;

  return (
    <>
      <Modal
        className="AddMemberPopUpModal"
        show={showAddMember}
        onHide={handleClose}
        backdrop={true}
      >
        <div className={AddMemberPopUpheadertext}>Add project member</div>
        <button className={xIconButton} onClick={handleClose}>
          <img src={xIcon} alt="xIcon" />
        </button>
        <Form onSubmit={handleSubmit(formSubmitHandler)}>
          <div className="AddMemberPopUpCont">
            <Form.Group controlId="formBasicEmail">
              <Form.Label className={AddMemberPopUpheadertexts}>
                User email:
              </Form.Label>
              <Form.Control
                bsPrefix={AddMemberInput}
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email.message}
              </Form.Control.Feedback>
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
            <Button
              variant="primary"
              bsPrefix={AddAddButton}
              type="submit"
              disabled={isSubmitting}
            >
              Add
            </Button>
          </div>
        </Form>
        <div className={AddMemberPopUpfooter}>Work together!</div>
      </Modal>
    </>
  );
}

export default AddMemberPopUp;
