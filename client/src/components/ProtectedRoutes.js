import { useContext, useEffect } from "react";
import LoggedInContext from "./LoggedInContext";
import { useNavigate, Navigate } from "react-router-dom";

export default function ProtectedRoutes({
  rev = true,
  children,
  role = "user",
}) {
  //   console.log(`this is ${rev}`);
  let where = rev ? "/user/login" : null;
  const [loggedIn] = useContext(LoggedInContext);
  if (!where && loggedIn) {
    switch (localStorage.role) {
      case "kitchen":
        where = "/kitchen";
        break;
      default:
        where = "/user";
        break;
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(loggedIn, rev);
    if (rev === !loggedIn) {
      navigate(where);
    }
    console.log(rev, where);
    // console.log("from proteced routes");
  }, [loggedIn, navigate, rev, where]);
  return !rev || localStorage.role === role ? children : null;
  // let renders = localStorage.role === role ? children : null;
}
