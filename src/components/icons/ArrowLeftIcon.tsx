import React, { FC } from "react";

interface ArrowLeftProps {
  width: string;
  height: string;
}

const ArrowLeftIcon: FC<ArrowLeftProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className="icon-path"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
    </svg>
  );
};

export default ArrowLeftIcon;
