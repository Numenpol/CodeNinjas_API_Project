import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
function CreateProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { error },
    reset,
    setValue,
  } = useForm();
  return (
    <>
      <div>
        <form>
          <div>
            <Form.Group
              className="NewProjectName"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="New project"
                {...register("projectName", {
                  required: "Project name is required",
                })}
              />
            </Form.Group>
          </div>
          <div>Choose your project icon</div>
          <div>
            <Form.Group
              className="NewProjectDesc"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Project description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Project description"
                {...register("projectDesc")}
              />
            </Form.Group>
          </div>
          <div className="CreateButtons">
            <Button
              variant="primary"
              style={{
                backgroundColor: "#FFFFFF",
                width: "79px",
                height: "32px",
                marginLeft: "30.5px",
                color: "#000000",
                borderBlockColor: "#7A7E81",
              }}
              onClick={() => close()}
              className="cancelBtn"
            >
              <div className="btnContent">Cancel</div>
            </Button>
            <Button
              variant="primary"
              style={{
                backgroundColor: "#3fadbe",
                border: "#3fadbe",
                marginLeft: "30.5px",
                width: "79px",
                height: "32px",
              }}
              className="createBtn"
            >
              <div className="btnContent">Create</div>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateProjectForm;
