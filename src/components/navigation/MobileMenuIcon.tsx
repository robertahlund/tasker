import React, {FC} from "react";
import "./MobileMenuIcon.css";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuIcon: FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className="mobile-nav" onClick={toggleMenu}>
      <span className={`mobile-navbar ${isOpen ? "mobile-navbar__open" : "mobile-navbar__closed"}`}/>
      <span className={`mobile-navbar ${isOpen ? "mobile-navbar__open" : "mobile-navbar__closed"}`}/>
    </div>
  );
};

export default MobileMenuIcon;