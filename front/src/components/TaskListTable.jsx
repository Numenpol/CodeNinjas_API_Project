import Table from 'react-bootstrap/Table';
import '../styles/taskListTable.css';

function TaskListTable() {
    return ( 
            <Table  bordered hover bsPrefix='table'>
              <thead >
                <tr className='table-header'>
                  <th className='tasks-key'>Key</th>
                  <th className='task'>Task</th>
                  <th className='owner'>Owner</th>
                  <th className='tasks-status'>Status</th>
                  <th className='priority'>Priority</th>
                  <th className='timeline'>Timeline</th>
                  <th className='creation-date'>Creation date</th>
                  <th className='completion-date'>Completion date</th>
                </tr>
              </thead>
              <tbody className='bob2'>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>In progress</td>
                  <td>Medium</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          );
}

export default TaskListTable;