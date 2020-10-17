import React from "react";
import { Router, Route } from "react-router-dom";
import Loader from "react-promise-loader";
import { usePromiseTracker } from "react-promise-tracker"

import Dashboard from "./Dashboard";
import LoginUser from "./LoginUser";
import history from "../history";
import Session from "./Session";
import LessonCard from "./LessonCard";
import LevelPage from "./LevelPage";
import SignupUser from "./SignupUser";
import LandingPage from "./LandingPage";


const App = () => (
  <Router history={history}>
    <Loader promiseTracker={usePromiseTracker} />
    <Route path="/" exact component={LandingPage}></Route>
    <Route path="/levels/:level" exact component={LevelPage}></Route>
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
