import React, { FC, ReactNode } from "react";
import "./Pagination.css";
import NumberOfTasks from "./NumberOfTasks";
import PaginationButton from "./PaginationButton";

interface PaginationProps {
  firstTaskNumber: number;
  lastTaskNumber: number;
  totalNumberOfTasks: number;
  tasksPerPage: number;
  currentPage: number;
  totalNumberOfPages: number;
  handlePagination: (selectedPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  firstTaskNumber,
  lastTaskNumber,
  totalNumberOfTasks,
  tasksPerPage,
  currentPage,
  totalNumberOfPages,
  handlePagination
}) => {
  const buildPagination = (): ReactNode[] => {
    const paginationButtonComponents: ReactNode[] = [];
    for (let i = 1; i <= totalNumberOfPages; i++) {
      paginationButtonComponents.push(
        <PaginationButton isActive={i === currentPage} pageNumber={i} handlePagination={handlePagination} key={i} />
      );
    }
    return paginationButtonComponents;
  };

  return (
    <div className="pagination-container">
      <NumberOfTasks
        firstTaskNumber={firstTaskNumber}
        lastTaskNumber={lastTaskNumber}
        totalNumberOfTasks={totalNumberOfTasks}
      />
      <div className="pagination-button-container">{buildPagination()}</div>
    </div>
  );
};

export default Pagination;
