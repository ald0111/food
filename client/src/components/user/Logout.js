import { useContext } from "react";
import LoggedInContext from "../LoggedInContext";
import { Button } from "@mui/material";

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
  return (
    <Button variant="contained" onClick={logout}>
      Logout
    </Button>
  );
}
