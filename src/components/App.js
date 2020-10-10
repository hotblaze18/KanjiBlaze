import React from "react";
import { Router, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import LoginUser from "./LoginUser";
import history from "../history";
import Session from "./Session";
import LessonCard from "./LessonCard";
import LevelPage from "./LevelPage";
import SignupUser from "./SignupUser";

const App = () => (
  <Router history={history}>
    <Route path="/" exact render={() => <LevelPage level={1} />}></Route>
    <Route path="/login" exact component={LoginUser}></Route>
    <Route path="/signup" exact component={SignupUser}></Route>
    <Route path="/dashboard" exact component={Dashboard}></Route>
    <Route
      path="/lesson/session"
      exact
      render={() => <Session type="lesson" />}
    ></Route>
    <Route
      path="/reviews/session"
      exact
      render={() => <Session type="review" />}
    ></Route>
  </Router>
);

export default App;
