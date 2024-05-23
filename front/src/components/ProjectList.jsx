import { useContext, useState } from "react";
import Project from "./Project";
import { StateContext } from "../utils/StateContext";
import { useTheme } from "../utils/ThemeContext";
import styles from "../styles/ProjectList.module.css";
import Pagination from 'react-bootstrap/Pagination';

function ProjectList() {
  const { projects } = useContext(StateContext);
  const { theme } = useTheme();
  const {
    cornerGaps,
    tableBox,
    tableHeader,
    tableBoxDark,
    projectTitle,
    tableBodyBoxDark,
    projectListTasksDark,
    projectListStatusDark,
    projectListName,
    projectListNameDark,
    projectListStatus,
    projectListTasks,
    tableBodyBox,
    projectListList,
    cornerGapsDark
  } = styles;


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;
  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    let items = [];
    items.push(
      <Pagination.First key="first" onClick={() => paginate(1)} disabled={currentPage === 1} />
    );
    items.push(
      <Pagination.Prev key="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
    );
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next key="next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
    );
    items.push(
      <Pagination.Last key="last" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
    );

    return items;
  };

  return (
    <div className={theme === "light" ? cornerGaps : cornerGapsDark}>
      <table className={theme === "light" ? tableBox : tableBoxDark}>
        <thead className={tableHeader}>
          <tr className={projectTitle}>
            <th colSpan={2} className={theme === "light" ? projectListName : projectListNameDark}>
              PROJECT NAME
            </th>
            <th className={theme === "light" ? projectListStatus : projectListStatusDark}>STATUS</th>
            <th className={theme === "light" ? projectListTasks : projectListTasksDark}>TASKS</th>
          </tr>
        </thead>
        <tbody className={theme === "light" ? tableBodyBox : tableBodyBoxDark}>
          {currentProjects.map((project, index) => (
            <Project
              className={projectListList}
              project={project}
              key={project._id}
              index={indexOfFirstProject + index + 1}
            />
          ))}
        </tbody>
      </table>
      <Pagination className="d-flex justify-content-center mt-5">{renderPaginationItems()}</Pagination>
    </div>
  );
}

export default ProjectList;
