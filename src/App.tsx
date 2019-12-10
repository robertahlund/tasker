import React, {FC, useState} from 'react';
import './App.css';
import Menu from "./components/navigation/Menu";
import Routes from "./components/routes/Routes";
import {AuthenticationContextProvider} from "./context/authContext";
import {Auth} from "./types/types";

const App: FC = () => {
    const [authentication, setAuthentication] = useState<Auth>({authenticated: false, uid: ""});
    return (
        <div className="App">
            <AuthenticationContextProvider value={authentication}>
                <Menu/>
                <Routes/>
            </AuthenticationContextProvider>
        </div>
    );
};

export default App;
