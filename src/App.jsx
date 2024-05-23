import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoPage from "./VideoPage";
import HomePage from "./HomePage";
import CommunityDashboard from "./components/CommunityDashboard";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/video/:id" component={VideoPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/community/:id" component={CommunityDashboard} />
      </Switch>
    </Router>
  );
};

export default App;
