import React, {FC, ReactNode, useContext} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import RepeatedTasks from "../repeated-tasks/RepeatedTasks";
import Statistics from "../statistics/Statistics";
import Tasks from "../tasks/Tasks";
import Settings from "../settings/Settings";
import {Auth} from "../../types/types";
import {AuthenticationContext} from "../../context/authContext";
import Login from "../login/Login";
import Register from "../register/Register";

interface RoutesProps {
}

const Routes: FC<RoutesProps> = () => {
    const {authenticated}: { authenticated: boolean } = useContext<Auth>(AuthenticationContext);
    return (
        <Switch>
            <Route exact path="/repeated-tasks"
                   render={(): ReactNode => authenticated ? <RepeatedTasks/> : <Redirect to="/login"/>}/>
            <Route exact path="/tasks" render={(): ReactNode => authenticated ? <Tasks/> : <Redirect to="/login"/>}/>
            <Route exact path="/" render={(): ReactNode => authenticated ? <Tasks/> : <Redirect to="/login"/>}/>
            <Route exact path="/statistics"
                   render={(): ReactNode => authenticated ? <Statistics/> : <Redirect to="/login"/>}/>
            <Route exact path="/settings"
                   render={(): ReactNode => authenticated ? <Settings/> : <Redirect to="/login"/>}/>
            <Route exact path="/login" render={(): ReactNode => !authenticated ? <Login/> : <Redirect to="/tasks"/>}/>
            <Route exact path="/register" render={(): ReactNode => !authenticated ? <Register/> : <Redirect to="/tasks"/>}/>
            <Route render={() => <p>TODO 404</p>}/>
        </Switch>
    );
};

export default Routes;