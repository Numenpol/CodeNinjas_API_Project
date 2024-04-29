import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import "../styles/TaskListStatusModal.css";

function TaskListStatusModal({ show, handleClose }) {
  return (
      <Modal show={show} onHide={handleClose}>
        <Table bordered>
          <thead>
            <tr  className="bob">
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>To do</td>
              <td>Low</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan={2}>Timeline</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>Labas</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Task creation date</th>
              <th>Completion date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bob1">
              <td className="task-creation-date">Labas</td>
              <td className="task-completion-date">Vakaras</td>
            </tr>
          </tbody>
        </Table>
      </Modal>
  );
}

export default TaskListStatusModal;
