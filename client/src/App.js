import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./global.css";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <Router>
      <CssBaseline />
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
