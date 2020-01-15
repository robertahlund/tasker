import React, {FC} from 'react';
import './RepatedTasks.css';
import SectionTitle from "../generic/SectionTitle";

interface UploadProps {

}

const RepeatedTasks: FC<UploadProps> = (props) => {
  return (
    <main className="main-section repeated-tasks">
      <SectionTitle title="Repeated Tasks"/>
    </main>
  );
};

export default RepeatedTasks;