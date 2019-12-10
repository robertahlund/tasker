import {createContext, Provider, Consumer} from "react";
import {Auth} from "../types/types";

export const AuthenticationContext = createContext<Auth>({ uid: "", authenticated: false});
export const AuthenticationContextProvider: Provider<Auth> = AuthenticationContext.Provider;
export const AuthenticationContextConsumer: Consumer<Auth> = AuthenticationContext.Consumer;
