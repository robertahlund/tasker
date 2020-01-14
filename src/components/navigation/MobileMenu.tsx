import React, {FC, useContext, useEffect} from "react";
import {NavLink} from "react-router-dom";
import MenuItem from "./MenuItem";
import "./MobileMenu.css";
import {motion, useAnimation} from "framer-motion";
import {Auth} from "../../types/types";
import {AuthenticationContext} from "../../context/authContext";
import {logout} from "../../api/authentication";

interface MobileMenuProps {

}

const MobileMenu: FC<MobileMenuProps> = () => {
    const controls = useAnimation();
    const {authenticated}: { authenticated: boolean } = useContext<Auth>(AuthenticationContext);

    useEffect(() => {
        controls.start(i => ({
            opacity: 1,
            transition: {delay: i * 0.1},
        }))
    }, [controls]);

    return (
        <motion.div
            className="mobile-menu-list-wrapper"
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}>
            <ul className="mobile-menu-list">
                {authenticated && (
                    <>
                        <motion.span custom={0} animate={controls} initial={{opacity: 0}}>
                            <NavLink to="/tasks" activeClassName="mobile-menu-list-item__active">
                                <MenuItem text="Tasks"/>
                            </NavLink>
                        </motion.span>
                        <motion.span custom={1} animate={controls} initial={{opacity: 0}}>
                            <NavLink to="/repeated-tasks" activeClassName="mobile-menu-list-item__active">
                                <MenuItem text="Repeated Tasks"/>
                            </NavLink>
                        </motion.span>
                        <motion.span custom={2} animate={controls} initial={{opacity: 0}}>
                            <NavLink to="/statistics" activeClassName="mobile-menu-list-item__active">
                                <MenuItem text="Statistics"/>
                            </NavLink>
                        </motion.span>
                        <motion.span custom={3} animate={controls} initial={{opacity: 0}}>
                            <NavLink to="/settings" activeClassName="mobile-menu-list-item__active">
                                <MenuItem text="Settings"/>
                            </NavLink>
                        </motion.span>
                    </>
                )}
                <motion.span custom={4} animate={controls} initial={{opacity: 0}}>
                    <NavLink to="/login" onClick={() => authenticated ? logout() : null}>
                        <MenuItem text={authenticated ? "Log out" : "Log in"}/>
                    </NavLink>
                </motion.span>

            </ul>
        </motion.div>
    );
};

export default MobileMenu;