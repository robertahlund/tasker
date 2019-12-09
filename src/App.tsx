import React, {FC} from 'react';
import './App.css';
import Menu from "./components/navigation/Menu";
import Routes from "./components/routes/Routes";

const App: FC = () => {
  return (
    <div className="App">
      <Menu/>
      <Routes/>
    </div>
  );
};

export default App;
