import React, { FC } from "react";
import { IconProps } from "../../types/types";
import "./Icon.css";

const AddIcon: FC<IconProps> = ({ height, width, onClickFunction }) => {
  return (
    <svg
      className="icon-path"
      onClick={onClickFunction}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" onClick={onClickFunction}/>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" onClick={onClickFunction}/>
    </svg>
  );
};

export default AddIcon;
