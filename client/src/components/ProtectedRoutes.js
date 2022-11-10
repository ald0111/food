import { useContext, useEffect } from "react";
import LoggedInContext from "./LoggedInContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ rev = true, children }) {
  //   console.log(`this is ${rev}`);
  const where = rev ? "/user/login" : "/user";
  const [loggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(loggedIn, rev);
    if (rev === !loggedIn) navigate(where);
    // console.log("from proteced routes");
  }, [loggedIn, navigate, rev, where]);

  return children;
}
