// import logo from "./logo.svg";
import "./App.css";
import UserRouter from "./components/user/user.router";
import KitchenRouter from "./components/kitchen/kitchen.router";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoggedInContext from "./components/LoggedInContext";
import tokenExists from "./functions/Token";
// import { Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState({
    value: tokenExists(),
    afterLogin: null,
  });
  useEffect(() => {
    window.addEventListener("storage", () => {
      if (tokenExists()) {
        setLoggedIn({ value: true });
      } else {
        setLoggedIn({ value: false });
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
            {/* <Routes>
              <UserRouter />
              <KitchenRouter />
            </Routes> */}
          </Router>
          {/* <Login /> */}
        </header>
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;
