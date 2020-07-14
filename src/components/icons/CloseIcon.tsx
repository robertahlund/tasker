import React, { FC } from "react";
import { IconProps } from "../../types/types";
import "./Icon.css";

const CloseIcon: FC<IconProps> = ({ height, width, onClickFunction }) => {
  return (
    <svg
      className="icon-path"
      onClick={onClickFunction}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path onClick={onClickFunction} fill="none" d="M0 0h24v24H0V0z" />
      <path
        onClick={onClickFunction}
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
      />
    </svg>
  );
};

export default CloseIcon;
