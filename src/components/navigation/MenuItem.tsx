import React, {FC} from 'react';
import './MenuItem.css';

interface MenuItemProps {
  text: string;
}

const MenuItem: FC<MenuItemProps> = ({text}) => {
  return (
    <li className="menu-list-item">
      {text}
    </li>
  );
};

export default MenuItem;