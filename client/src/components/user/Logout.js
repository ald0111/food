import { useContext } from "react";
import LoggedInContext from "../LoggedInContext";

export function Logout() {
  const [, setLoggedIn] = useContext(LoggedInContext);
  const logout = () => {
    localStorage.clear();
    setLoggedIn({ value: false });
  };

  // let { state } = useLocation();
  // if (!state) {
  //   state = {};
  // }
  // const { logoutNow } = state;
  // if (logoutNow) {
  //   logout();
  //   return;
  // }
  return <button onClick={logout}>Logout</button>;
}
