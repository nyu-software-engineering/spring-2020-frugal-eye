import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Login from './Login'

const App = (props) => {
  return (
    <div className="container">
        <Router>
            <Switch>
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
