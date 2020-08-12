import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Builder from "../builder";
import Generator from "../NewGenerator";
import Report from "../Report";

// import {Generator} from 'hatal-utils'
// import 'hatal-utils/dist/index.css'

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Builder} />
      <Route exact path="/form/:id" component={Generator} />
      <Route exact path="/report/:id" component={Report} />
    </Switch>
  </Router>
);

export default AppRouter;
