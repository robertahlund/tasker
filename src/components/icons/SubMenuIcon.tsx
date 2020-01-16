import React, {FC} from "react";
import {IconProps} from "../../types/types";
import "./Icon.css";

const SubMenuIcon: FC<IconProps> = ({height, width, onClickFunction}) => {
  return (
    <svg className="icon-path" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0V0z"/>
      <path
        d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  )
};

export default SubMenuIcon;