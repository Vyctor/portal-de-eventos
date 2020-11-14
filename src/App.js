import { BrowserRouter as Router, Route } from "react-router-dom";

// Páginas
import Login from "./view/login";
import CreateAccount from "./view/create-account";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/create-account" component={CreateAccount} />
    </Router>
  );
}

export default App;
