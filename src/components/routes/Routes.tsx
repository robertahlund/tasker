import React, {FC, ReactNode} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import RepeatedTasks from "../repeated-tasks/RepeatedTasks";
import Statistics from "../profile/Statistics";
import Tasks from "../tasks/Tasks";
import Settings from "../settings/Settings";

interface RoutesProps {
}

const Routes: FC<RoutesProps> = (props) => {
  return (
    <Switch>
      <Route exact path="/repeated-tasks" render={(): ReactNode => <RepeatedTasks/>}/>
      <Route exact path="/tasks" render={(): ReactNode => <Tasks/>}/>
      <Route exact path="/statistics" render={(): ReactNode => <Statistics/>}/>
      <Route exact path="/settings" render={(): ReactNode => <Settings/>}/>
    </Switch>
  );
};

export default Routes;