import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContext from "../components/LoggedInContext";
export default function tokenExists() {
  return localStorage.token && localStorage.name ? true : false;
}
export function Redirect(where = "/user", rev = true) {
  const navigate = useNavigate();
  const [loggedIn] = useContext(LoggedInContext);

  // console.log(where, rev, tokenExists());
  useEffect(() => {
    console.log(loggedIn);
    if (rev === loggedIn) {
      console.log("blah");
      navigate(where);
    }
  }, [navigate, loggedIn, rev, where]);
}

//currently not used anywhere
