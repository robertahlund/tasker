import React, {FC, useEffect, useState} from 'react';
import './Menu.css';
import Logo from "../Logo";
import MobileMenuIcon from "./MobileMenuIcon";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import {AnimatePresence} from "framer-motion";

interface MenuProps {

}

const Menu: FC<MenuProps> = props => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (window.screen.availWidth > 768) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    }, []);

    const toggleMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };

    return (
        <nav className="menu">
            <Logo/>
            {isMobile && <MobileMenuIcon isOpen={menuIsOpen} toggleMenu={toggleMenu}/>}
            {!isMobile && <DesktopMenu/>}
            {isMobile &&
            <AnimatePresence>
                {menuIsOpen && <MobileMenu key="mobile-menu"/>}
            </AnimatePresence>
            }
        </nav>
    );
};

export default Menu;