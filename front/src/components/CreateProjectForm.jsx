import { useState, useEffect } from "react";
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
import { useTheme } from "../utils/ThemeContext";

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

  useEffect(() => {
    if (icon == "") {
      setIcon("icons/projectIcon1.svg");
    }
  }, [icon]);

  const { theme } = useTheme();

  const formSubmitHandler = async (data) => {
    try {
      const currentUser = localStorage.getItem("user");
      const userObject = JSON.parse(currentUser);

      await postData({
        ...data,
        icon: icon,
        members: { emails: userObject.data.email, names: userObject.data.name },
      });
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
    rocketPictureDark,
    createProjectFormDark,
    createProjectHeaderDark,
    blankSpace,
    blankSpaceDark,
    formLabel,
    formLabelDark,
    createChooseIconDark,
    formLabelProjectDescription,
    formLabelProjectDescriptionDark,
    xIconButtonDark,
    createProjectDark,
    projectNameField,
    projectNameFieldDark,
    projectDescriptionField,
    projectDescriptionFieldDark,
    newProjectNameDark,
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
        <div className={theme == "light" ? createProject : createProjectDark}>
          <button
            className={theme == "light" ? xIconButton : xIconButtonDark}
            onClick={handleClose}
          >
            <img src={xIcon} alt="xIcon" />
          </button>
          <div className={theme == "light" ? blankSpace : blankSpaceDark}>
            <h1
              className={
                theme == "light" ? createProjectHeader : createProjectHeaderDark
              }
            >
              Create a new project
            </h1>
            <Form
              onSubmit={handleSubmit(formSubmitHandler)}
              className={
                theme == "light" ? createProjectForm : createProjectFormDark
              }
            >
              <div>
                <Form.Group
                  className={theme == "light" ? newProjectName : newProjectNameDark}
                  controlId="exampleForm.ControlInput1"
                >
                  <p className={theme == "light" ? formLabel : formLabelDark}>
                    Project Name
                  </p>
                  <Form.Control
                    type="textarea"
                    placeholder="New project"
                    autoComplete="projectName"
                    className={
                      theme == "light" ? projectNameField : projectNameFieldDark
                    }
                    {...register("projectName", {
                      required: "Project name is required",
                      maxLength: {
                        value: 40,
                        message:
                          "Project name is to long, it can't exceed 40 characters",
                      },
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
                <p
                  className={
                    theme == "light" ? createChooseIcon : createChooseIconDark
                  }
                >
                  Choose your project icon
                </p>
                <IconList />
              </div>
              <div>
                <Form.Group
                  className={newProjectDesc}
                  controlId="exampleForm.ControlTextarea1"
                >
                  <p
                    className={
                      theme == "light"
                        ? formLabelProjectDescription
                        : formLabelProjectDescriptionDark
                    }
                  >
                    Project description
                  </p>
                  <Form.Control
                    style={{ resize: "none" }}
                    type="textarea"
                    as="textarea"
                    rows={3}
                    placeholder="Project description"
                    className={
                      theme == "light"
                        ? projectDescriptionField
                        : projectDescriptionFieldDark
                    }
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
          <div className={theme == "light" ? rocketPicture : rocketPictureDark}>
            <img src={rocketPic} alt="rocketPicture" className={rocket} />
            <h1 className={rocketSlogan}>Ready? Launch!</h1>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateProjectForm;
