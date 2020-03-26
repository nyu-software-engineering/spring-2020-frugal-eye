import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Login from './Login'
import Settings from './Settings'
import Home from './Home'
import AddIngredients from './AddIngredients'
import RecipeList from './RecipeList'
import FavoriteList from './FavoriteList'

const App = (props) => {
  return (
    <div className="container">
        <Router>
            <Switch>

                <Route path="/add-ingredients">
                    <AddIngredients />
                </Route>

                <Route path="/settings">
                    <Settings />
                </Route>

                <Route path="/home">
                    <Home />
                </Route>

                <Route path = "/recipelist">
                    <RecipeList />
                </Route>

                <Route path = "/favoritelist">
                    <FavoriteList />
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
