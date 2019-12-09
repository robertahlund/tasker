import React, {FC} from 'react';

interface LogoProps {
}

const Logo: FC<LogoProps> = (props) => {
  return (
    <span style={{fontSize: '1.1rem', color: '#fff'}}>Logo</span>
  );
};

export default Logo;