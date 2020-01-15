import React, {FC} from "react";
import "./SectionTitle.css";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title}) => {
  return <h1 className="section-title">{title}</h1>;
};

export default SectionTitle;