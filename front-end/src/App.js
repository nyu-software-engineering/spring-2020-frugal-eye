import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
//import Login from './Login'
import recipe from './recipe.js'

const App = (props) => {
  return (
    <div className="container">
        <Router>
            <Switch>

                <Route path="/">
                    <recipe />
                </Route>

            </Switch>
        </Router>
    </div>
  );
}

// make this available to other modules as an import
export default App;
