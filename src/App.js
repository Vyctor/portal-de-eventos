import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "../src/store/";
import { Provider } from "react-redux";
// Páginas
import Login from "./view/login";
import CreateAccount from "./view/create-account";
import Home from "./view/home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/create-account" component={CreateAccount} />
        <Route exact path="/login" component={Login} />
      </Router>
    </Provider>
  );
}

export default App;
