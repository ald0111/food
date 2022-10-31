// import logo from "./logo.svg";
import "./App.css";
import UserRouter from "./user/user.router";

import { BrowserRouter as Router } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <UserRouter />
        </Router>

        {/* <Login /> */}
      </header>
    </div>
  );
}

export default App;
