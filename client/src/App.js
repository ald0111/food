// import logo from "./logo.svg";
import "./App.css";
import UserRouter from "./components/user/user.router";

import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import LoggedInContext from "./components/LoggedInContext";
import tokenExists from "./functions/Token";
// import { Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(tokenExists());
  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App">
        <header className="App-header">
          <Router>
            <UserRouter />
          </Router>

          {/* <Login /> */}
        </header>
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;
