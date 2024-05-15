import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import xIcon from "../assets/xIcon.svg";
import rocketPic from "../assets/rocket.svg";
import { StateContext } from "../utils/StateContext";
import { postData } from "../services/post";
import IconList from "../components/IconList";
import styles from "../styles/CreateProjectForm.module.css";

function CreateProjectForm() {
  const { show, setShow, icon, setUpdate, setIcon } = useContext(StateContext);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      projectName: "",
      description: "",
    },
  });

  const formSubmitHandler = async (data) => {
    try {
      if (icon == "") {
        setIcon("icons/projectIcon1.svg");
      }
      // const user = localStorage.getItem("user");
      // const userData = JSON.parse(user);
      // const userEmail = userData.data.email
      await postData({ ...data, icon: icon });
      setUpdate((update) => update + 1);
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      if (error.message == "Request failed with status code 400") {
        setError("A project with this name already exists");
        setTimeout(() => {
          setError("");
        }, 2500);
      } else setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const {
    createProjectModal,
    modalDialog,
    createProject,
    xIconButton,
    createProjectHeader,
    createProjectForm,
    newProjectName,
    createProjectFormError,
    createChooseIcon,
    newProjectDesc,
    createButtons,
    cancelBtn,
    cancelBtnContent,
    createBtn,
    createBtnContent,
    rocketPicture,
    rocket,
    rocketSlogan,
  } = styles;

  return (
    <div className={createProjectModal}>
      <Modal
        show={show}
        backdropClassName="createProjectFormModalBackDrop backdrop"
        keyboard={false}
        dialogClassName={modalDialog}
        // backdropClassName='backdrop'
      >
        <div className={createProject}>
          <button className={xIconButton} onClick={handleClose}>
            <img src={xIcon} alt="xIcon" />
          </button>
          <div>
            <h1 className={createProjectHeader}>Create a new project</h1>
            <Form
              onSubmit={handleSubmit(formSubmitHandler)}
              className={createProjectForm}
            >
              <div>
                <Form.Group
                  className={newProjectName}
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="New project"
                    autoComplete="projectName"
                    {...register("projectName", {
                      required: "Project name is required",
                      maxLength:{
                        value:40,
                        message:"Project name is to long, it can't exceed 40 characters"
                      }
                    })}
                    isInvalid={errors.projectName}
                  />
                  <div className={createProjectFormError}>{error}</div>
                  <Form.Control.Feedback type="invalid">
                    {errors.projectName && errors.projectName.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div>
                <p className={createChooseIcon}>Choose your project icon</p>
                <IconList />
              </div>
              <div>
                <Form.Group
                  className={newProjectDesc}
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Project description</Form.Label>
                  <Form.Control
                    style={{ resize: "none" }}
                    type="textarea"
                    as="textarea"
                    rows={3}
                    placeholder="Project description"
                    autoComplete="description"
                    {...register("description", {
                      required: "Project description is required",
                    })}
                    isInvalid={errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description && errors.description.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className={createButtons}>
                <Button
                  className={cancelBtn}
                  variant="primary"
                  onClick={handleClose}
                >
                  <div className={cancelBtnContent}>Cancel</div>
                </Button>
                <Button
                  variant="primary"
                  className={createBtn}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <div className={createBtnContent}>Create</div>
                </Button>
              </div>
            </Form>
          </div>
          <div className={rocketPicture}>
            <img src={rocketPic} alt="rocketPicture" className={rocket} />
            <h1 className={rocketSlogan}>Ready? Launch!</h1>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateProjectForm;
