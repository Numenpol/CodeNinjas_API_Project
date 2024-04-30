import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";

function TaskListTableForm() {

    const { setUpdate } = useContext(StateContext);

    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
          key: "",
          task: "",
          owner: "",
          status: "",
          priority: "",
          timeline: new Date(),
          creationdate: new Date(),
          completiondate: new Date(),
        },
      });

      const formSubmitHandler = async (data) => {
        try {
          await postDataTask(data);
          setUpdate((update) => update + 1);
          reset();
        } catch (error) {
          console.log(error);
        }
      };

    return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
    <Table bsPrefix="table" bordered hover>
    <tbody className="table-body">
    <tr className="table-row">
      <td>
        <input id="key" name="key" type="text" {...register("key")} />
      </td>
      <td>
        <input
          id="task"
          name="task"
          type="text"
          {...register("task")}
        />
      </td>
      <td>
        <input
          id="owner"
          name="owner"
          type="text"
          {...register("owner")}
        />
      </td>
      <td>
        <input
          id="status"
          name="status"
          type="text"
          {...register("status")}
        />
      </td>
      <td>
        <input
          id="priority"
          name="priority"
          type="text"
          {...register("priority")}
        />
      </td>
      <td>
        <input
          id="timeline"
          name="timeline"
          type="text"
          {...register("timeline")}
        />
        {}
      </td>
      <td>
        <input
          style={{ border: "none" }}
          id="creationdate"
          name="creationdate"
          type="text"
          {...register("creationdate")}
        />
      </td>
      <td>
        <input
          id="completiondate"
          name="completiondate"
          type="text"
          {...register("completiondate")}
        />
      </td>
      </tr>
    </tbody>
    </Table>
    </form>
    )}

export default TaskListTableForm;