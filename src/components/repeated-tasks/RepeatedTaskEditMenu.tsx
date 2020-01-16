import React, {FC} from "react";
import "./RepeatedTaskEditMenu.css"

interface RepeatedTaskEditMenuProps {

}

const RepeatedTaskEditMenu: FC<RepeatedTaskEditMenuProps> = (props) => {
  return (
    <div className="submenu-wrapper">
      <div className="submenu-item">
        Edit repeatable task
      </div>
      <div className="submenu-item submenu-item__delete">
        Delete repeatable task
      </div>
    </div>
  );
};

export default RepeatedTaskEditMenu;