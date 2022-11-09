import { useContext } from "react";
import LoggedInContext from "../LoggedInContext";

export function Logout() {
  const [, setLoggedIn] = useContext(LoggedInContext);

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };
  return <button onClick={logout}>Logout</button>;
}
