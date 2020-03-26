import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Login from './Login'
import Settings from './Settings'
import Home from './Home'

const App = (props) => {
  return (
    <div className="container">
        <Router>
            <Switch>

                <Route path="/settings">
                    <Settings />
                </Route>

                <Route path="/home">
                    <Home />
                </Route>

                <Route path="/">
                    <Login />
                </Route>

            </Switch>
        </Router>
    </div>
  );
}

// make this available to other modules as an import
export default App;
