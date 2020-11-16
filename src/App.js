import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "../src/store/";
import { Provider } from "react-redux";

// Páginas
import Login from "./view/login";
import CreateAccount from "./view/create-account";
import Home from "./view/home";
import ResetPassword from "./view/reset-password";
import EventoCadastro from "./view/evento-cadastro";
import EventoDetalhes from "./view/evento-detalhes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/eventos/:parametro" component={Home} />
        <Route exact path="/create-account" component={CreateAccount} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/evento-cadastro" component={EventoCadastro} />
        <Route path="/evento-detalhes/:id" component={EventoDetalhes} />
      </Router>
    </Provider>
  );
}

export default App;
