// import logo from "./logo.svg";
import "./App.css";
import UserRouter from "./components/user/user.router";
import KitchenRouter from "./components/kitchen/kitchen.router";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoggedInContext from "./components/LoggedInContext";
import tokenExists from "./functions/Token";
// import { Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(tokenExists());
  useEffect(() => {
    window.addEventListener("storage", () => {
      if (tokenExists()) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App">
        <header className="App-header">
          <Router>
            <Routes>
              <Route path="/user/*" element={<UserRouter />} />
              <Route path="/kitchen/*" element={<KitchenRouter />} />
            </Routes>

            {/* <UserRouter />
            <KitchenRouter /> */}
          </Router>

          {/* <Login /> */}
        </header>
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;
