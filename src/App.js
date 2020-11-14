import { BrowserRouter as Router, Route } from "react-router-dom";

// Páginas
import Login from "./view/login";
import CreateAccount from "./view/create-account";
import Home from "./view/home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/create-account" component={CreateAccount} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
}

export default App;
