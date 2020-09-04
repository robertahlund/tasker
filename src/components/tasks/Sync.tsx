import React, { FC } from "react";
import "./Sync.css";
import SettingsIcon from "../icons/SettingsIcon";
import SyncMenu from "./SyncMenu";

interface SyncProps {
  showSyncMenu: boolean;
  setShowSyncMenu: () => void;
  syncIsLoading: boolean;
  syncAllRepeatedTasks: () => Promise<void>;
}

const Sync: FC<SyncProps> = ({
  showSyncMenu,
  setShowSyncMenu,
  syncIsLoading,
  syncAllRepeatedTasks,
}) => {
  return (
    <div className="sync-container">
      <SettingsIcon
        height="18px"
        width="18px"
        onClickFunction={() => setShowSyncMenu()}
      />
      {showSyncMenu && (
        <SyncMenu
          syncData={() => syncAllRepeatedTasks()}
          isSyncing={syncIsLoading}
        />
      )}
    </div>
  );
};

export default Sync;
