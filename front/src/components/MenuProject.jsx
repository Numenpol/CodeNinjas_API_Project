import "../styles/MenuProject.css";
import IconList from "../components/IconList";
import { DashSquare, Trash, PencilSquare } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { postData } from "../services/post";
import { updateData } from "../services/update";
import { deleteData } from "../services/delete";
import { StateContext } from "../utils/StateContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MenuProject.module.css";
import stylesForm from "../styles/CreateProjectForm.module.css";
import xIcon from "../assets/xIcon.svg";
import rocketPic from "../assets/rocket.svg";

function MenuProject({ project }) {
  const { setprojectId, setShowMenu } = useContext(StateContext)

  const { setUpdate } = useContext(StateContext);
  const [clickX, setClickX] = useState(null);
  const [clickY, setClickY] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    if (show) {
      setShow(false);
    }
    setShow(true);
    setClickX(event.clientX);
    setClickY(event.clientY);
  };

  const navigate = useNavigate();

  const projectClickHandler = (project) => {
      setprojectId(project._id);
      setShowMenu(false);
      navigate("/tasklist");
  }
  
  
  const [smShow, setSmShow] = useState(false);
  const handleSmClose = () => setSmShow(false);
  const handleSmShow = () => setSmShow(true);

  const [delShow, setDelShow] = useState(false);
  const handleDelClose = () => setDelShow(false);
  const handleDelShow = () => setDelShow(true);

  const handleSmAllClose = () => {
    handleSmShow(), handleClose();
  };
  const handleDelAllClose = () => {
    handleDelShow(), handleClose();
  };

  const { projectName, icon } = project;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      projectName: "",
      description: "",
    },
  });

  useEffect(() => {
    if (project) {
      setValue("projectName", project.projectName);
      setValue("description", project.description);
    }
  }, [project]);

  const formSubmitHandler = async (data) => {
    try {
      if (project) {
        await updateData(project._id, data);
      } else {
        await postData({ ...data, icon: icon });
      }
      setUpdate((update) => update + 1);
      reset();
      handleSmClose();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      setUpdate((update) => update + 1);
      handleClose();
      handleDelClose();
    } catch (error) {
      console.log(error);
    }
  };

  const { menuProjectList, menuProjectIcon, menuProjectName, editIcon, menuProjectModalBackDrop, menuEdit, menuPencilsquare, menuTrash, menuTrashIcon } = styles;

  const { modalDialog, createProject, xIconButton, createProjectHeader, createProjectForm, newProjectName, createChooseIcon, newProjectDesc, createButtons, cancelBtn, cancelBtnContent, createBtn, createBtnContent, rocketPicture, rocket, rocketSlogan } = stylesForm;

  return (
    <>
      <div className={menuProjectList} >
        <div className={menuProjectList} onClick={() => {projectClickHandler(project)}}>
          <img src={icon} alt="icon" className={menuProjectIcon} />
          <p className={menuProjectName}>{projectName}</p>
        </div>
        <div className="Thing">
          <div>
            <DashSquare className={editIcon} onClick={handleShow} />
          </div>
          {show && (
            <Modal
              className="myModal"
              // dialogClassName={`${myModal} modal-content`}
              show={show}
              onHide={handleClose}
              backdropClassName={menuProjectModalBackDrop}
              style={{
                top: `${clickY + -500}px`,
                left: `${clickX + -300}px`,
              }}
              backdrop="true"
            >
              <div className={menuEdit} onClick={handleSmAllClose}>
                <PencilSquare className={menuPencilsquare} /> Edit project
              </div>

              <div className={menuTrash} onClick={handleDelAllClose}>
                <Trash className={menuTrashIcon} /> Delete project
              </div>
            </Modal>
          )}
        </div>

        <Modal className="mySecondModal" show={smShow} dialogClassName={modalDialog} backdrop="static">
          <div className={createProject}>
            <button className={xIconButton} onClick={handleSmClose}>
              <img src={xIcon} alt="xIcon" />
            </button>
            <div>
              <h1 className={createProjectHeader}>Edit your project</h1>
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
                      name="projectName"
                      // autoComplete="projectName"
                      {...register("projectName", {
                        required: "Project name is required",
                      })}
                      isInvalid={errors.projectName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.projectName && errors.projectName.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div>
                  <p className={createChooseIcon}>
                    Choose your project icon
                  </p>
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
                      name="description"
                      // autoComplete="description"
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
                  <Button className={cancelBtn} variant="primary">
                    <div onClick={handleSmClose} className={cancelBtnContent}>
                      Cancel
                    </div>
                  </Button>
                  <Button
                    variant="primary"
                    className={createBtn}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <div className={createBtnContent}>
                      Edit
                    </div>
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

        <Modal className="myDeleteModal" show={delShow}>
          <Modal.Body>Are You sure, you want to delete {projectName}?</Modal.Body>
          <Modal.Footer>
            <Button className={cancelBtn} onClick={handleDelClose}>
              <div className={cancelBtnContent}>Cancel</div>
            </Button>
            <Button
              className="createBtn"
              onClick={() => handleDelete(project._id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default MenuProject;
