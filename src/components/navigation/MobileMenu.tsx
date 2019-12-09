import React, {FC, useEffect} from "react";
import {NavLink} from "react-router-dom";
import MenuItem from "./MenuItem";
import "./MobileMenu.css";
import {motion, useAnimation} from "framer-motion";

interface MobileMenuProps {

}

const MobileMenu: FC<MobileMenuProps> = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      transition: {delay: i * 0.1},
    }))
  }, []);

  return (
    <motion.div
      className="mobile-menu-list-wrapper"
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}>
      <ul className="mobile-menu-list">
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
        <motion.span custom={4} animate={controls} initial={{opacity: 0}}>
          <NavLink to="#">
            <MenuItem text="Log out"/>
          </NavLink>
        </motion.span>

      </ul>
    </motion.div>
  );
};

export default MobileMenu;