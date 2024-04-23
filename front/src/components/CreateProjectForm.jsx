import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { postData } from "../services/post";
import IconList from "../components/IconList";
import "../styles/createProjectForm.css"
import xIcon from "../assets/xIcon.svg";
import rocket from "../assets/rocket.svg";

function CreateProjectForm() {
  const {show, setShow, icon} = useContext(StateContext)

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
      await postData({ ...data, icon: icon });
      setUpdate((update) => update + 1);
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setShow(false)
    reset();
    };

  
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="create-project">
        <button className="xIconButton" onClick={handleClose}>
            <img src={xIcon} alt="xIcon" />
        </button>    
        <h1 className="H12">Create a new project</h1>
        <Form onSubmit={handleSubmit(formSubmitHandler)} className="create-project--form">
          <div>
            <Form.Group
              className="NewProjectName"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="New project"
                autoComplete="projectName"
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
            <p className="create-choose--icon">Choose your project icon</p>
            <IconList/>
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
                autoComplete="description"
                {...register("description",
                  {
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
            <Button
              className="cancelBtn"
              variant="primary"
              onClick={handleClose}
            >
              <div className="cancelBtnContent" >Cancel</div>
            </Button>
            <Button
              variant="primary"
              className="createBtn"
              type="submit"
              disabled={isSubmitting}
            >
              <div className="createBtnContent">Create</div>
            </Button>
          </div>
        </Form>
        <div className="rocketPicture">
        <img src={rocket} alt="rocketPicture" className="rocket"/>
        <h1 className='rocketSlogan'>Ready? Launch!</h1>
        </div>
      </div>
      </Modal>
    </>
  );
}

export default CreateProjectForm;