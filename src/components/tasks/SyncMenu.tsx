import React, { FC } from "react";
import "./SyncMenu.css";
import { motion } from "framer-motion";
import RepeatedIcon from "../icons/RepeatedIcon";

interface SyncMenuProps {
  syncData: () => Promise<void>;
  isSyncing: boolean;
}

const SyncMenu: FC<SyncMenuProps> = ({ syncData, isSyncing }) => {
  return (
    <motion.div
      className="syncmenu-wrapper"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="syncmenu-item" onClick={syncData}>
        <RepeatedIcon width="18px" height="18px" isSyncing={isSyncing} />
        Synchronize repeated tasks
      </div>
    </motion.div>
  );
};

export default SyncMenu;
