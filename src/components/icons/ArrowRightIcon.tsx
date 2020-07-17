import React, { FC } from "react";

interface ArrowRightProps {
  width: string;
  height: string;
  color?: string;
}

const ArrowRightIcon: FC<ArrowRightProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className="icon-path"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </svg>
  );
};

export default ArrowRightIcon;
