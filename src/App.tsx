import React, { FC, useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/navigation/Menu";
import Routes from "./components/routes/Routes";
import { AuthenticationContextProvider } from "./context/authContext";
import { Auth } from "./types/types";
import firebase from "./config/firebaseConfig";
import { onAuthChangeHandler } from "./api/authentication";

const App: FC = () => {
  const [authentication, setAuthentication] = useState<Auth>({
    authenticated: false,
    uid: "",
  });

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        firebase.auth().onAuthStateChanged((auth: firebase.User | null) => {
          setAuthentication(onAuthChangeHandler(auth));
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="App">
      <AuthenticationContextProvider value={authentication}>
        <Menu />
        <Routes />
      </AuthenticationContextProvider>
    </div>
  );
};

export default App;
