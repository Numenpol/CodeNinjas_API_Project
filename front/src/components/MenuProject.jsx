import "../styles/MenuProjects.css";
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

function MenuProject({ project }) {
  const { setUpdate } = useContext(StateContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [smShow, setSmShow] = useState(false);
  const handleSmClose = () => setSmShow(false);
  const handleSmShow = () => setSmShow(true);

  const [delShow, setDelShow] = useState(false);
  const handleDelClose = () => setDelShow(false);
  const handleDelShow = () => setDelShow(true);

  const handleSmAllClose = () => {handleSmShow(), handleClose()};
  const handleDelAllClose = () => {handleDelShow(), handleClose()};


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
  }

  return (
    <>
      <div className="MenuProjectList">
        <div className="MenuProjectList">
        <img src={icon} alt="icon" className="MenuProjectIcon" />
        <p className="MenuProjectName">{projectName}</p>
        </div>
        <div>
        <DashSquare className="editIcon"
          onClick={handleShow}
        />

        </div>
        <Modal className="myModal" show={show} onHide={handleClose} backdropClassName="menuProjectModalBackDrop">
        <div className="menu-edit" onClick={handleSmAllClose} >
            <PencilSquare className="menu-pencilsquare" /> Edit project
          </div>

          <div className="menu-edit" onClick={handleDelAllClose}>
              <Trash className="menu-trash" /> Delete project
            </div>
        </Modal>

          <Modal className="mySecondModal" show={smShow} >
            <div className="create-project">
              <h1 className="H12">Edit your project</h1>
              <Form
                onSubmit={handleSubmit(formSubmitHandler)}
                className="create-project--form"
              >
                <div>
                  <Form.Group
                    className="NewProjectName"
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
                  <p className="create-choose--icon">
                    Choose your project icon
                  </p>
                  <IconList />
                </div>
                <div>
                  <Form.Group
                    className="NewProjectDesc"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Project description</Form.Label>
                    <Form.Control
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
                <div className="CreateButtons">
                  <Button className="cancelBtn" variant="primary">
                    <div onClick={handleSmClose} className="cancelBtnContent">
                      Cancel
                    </div>
                  </Button>
                  <Button
                    variant="primary"
                    className="createBtn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <div className="createBtnContent">
                      Edit
                    </div>
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>


            <Modal
              className="myDeleteModal"
              show={delShow}
            >
              <Modal.Body>
                Are You sure You want to delete this project?
              </Modal.Body>
              <Modal.Footer>
                <Button className="cancelBtn" onClick={handleDelClose}>
                  <div className="cancelBtnContent">Cancel</div>
                </Button>
                <Button className="createBtn" onClick={() => handleDelete(project._id)}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>


          </div>
    </>
  );
}

export default MenuProject;
