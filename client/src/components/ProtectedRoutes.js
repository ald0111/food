import { useContext, useEffect } from "react";
import LoggedInContext from "./LoggedInContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({
  rev = true,
  children,
  role = "user",
  everyone = false,
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
    } else if (!(localStorage.role === role) && !everyone) {
      navigate(where);
    }
    console.log(rev, where);
    // console.log("from proteced routes");
  }, [loggedIn, navigate, rev, where, role]);
  // return !rev || localStorage.role === role ? children : null;
  return children;
  // let renders = localStorage.role === role ? children : null;
}
