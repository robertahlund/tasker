import React, { FC } from "react";
import "./PaginationButton.css";

interface PaginationButtonProps {
  isActive: boolean;
  pageNumber: number;
  handlePagination: (selectedPage: number) => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({
  isActive,
  pageNumber,
  handlePagination
}) => {
  return (
    <div className={isActive ? "pagination-button pagination-button--active" : "pagination-button"} onClick={() => handlePagination(pageNumber)}>
      <span className="pagination-button-text">{pageNumber}</span>
    </div>
  );
};

export default PaginationButton;
