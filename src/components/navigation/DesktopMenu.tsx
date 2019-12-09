import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import MenuItem from "./MenuItem";
import "./DesktopMenu.css";

interface DesktopMenuProps {

}

const DesktopMenu: FC<DesktopMenuProps> = (props) => {
  return (
    <div className="menu-list-wrapper">
      <ul className="menu-list">
        <NavLink to="/tasks" activeClassName="menu-list-item__active">
          <MenuItem text="Tasks"/>
        </NavLink>
        <NavLink to="/repeated-tasks" activeClassName="menu-list-item__active">
          <MenuItem text="Repeated Tasks"/>
        </NavLink>
        <NavLink to="/statistics" activeClassName="menu-list-item__active">
          <MenuItem text="Statistics"/>
        </NavLink>
        <NavLink to="/settings" activeClassName="menu-list-item__active">
          <MenuItem text="Settings"/>
        </NavLink>
        <NavLink to="#">
          <MenuItem text="Log out"/>
        </NavLink>
      </ul>
    </div>
  );
};

export default DesktopMenu;