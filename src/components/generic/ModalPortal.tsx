import React, { FC, ReactNode, SyntheticEvent } from "react";
import ReactDOM from "react-dom";
import { modalPortal } from "../../constants/constants";
import { motion } from "framer-motion";
import "./ModalPortal.css";

interface ModalPortalProps {
  children: ReactNode;
  toggleModal: (event: SyntheticEvent) => void;
}

const ModalPortal: FC<ModalPortalProps> = ({ children, toggleModal }) => {
  if (modalPortal) {
    return ReactDOM.createPortal(
      <motion.div
        className="modal-background"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={toggleModal}
      >
        <div className="modal-content">{children}</div>
      </motion.div>,
      modalPortal
    );
  } else {
    return null;
  }
};

export default ModalPortal;
