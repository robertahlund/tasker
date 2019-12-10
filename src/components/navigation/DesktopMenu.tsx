import React, {FC, useContext} from "react";
import {NavLink} from "react-router-dom";
import MenuItem from "./MenuItem";
import "./DesktopMenu.css";
import {AuthenticationContext} from "../../context/authContext";
import {Auth} from "../../types/types";

interface DesktopMenuProps {

}

const DesktopMenu: FC<DesktopMenuProps> = () => {
    const {authenticated}: { authenticated: boolean } = useContext<Auth>(AuthenticationContext);
    return (
        <div className="menu-list-wrapper">
            <ul className="menu-list">
                {authenticated && (
                    <>
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
                    </>
                )}
                <NavLink to="#">
                    <MenuItem text={authenticated ? "Log out" : "Log in"}/>
                </NavLink>
            </ul>
        </div>
    );
};

export default DesktopMenu;