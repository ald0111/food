import { useContext, useEffect, useState } from "react";
import LoggedInContext from "./LoggedInContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({
  rev = true,
  children,
  role = "user",
  everyone = false,
}) {
  const [CanRender, setCanRender] = useState(false);
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
  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  useEffect(() => {
    (async () => {
      // console.log("Hello Toturix");
      // await sleep(3000);
      // console.log("good");
      if (rev === !loggedIn) {
        navigate(where);
        console.log(rev, where);
      } else if (!(localStorage.role === role) && !everyone) {
        navigate(where);
        console.log(rev, where);
      }
      setCanRender(true);
      // console.log(loggedIn, rev);
      // console.log("from proteced routes");
    })();
  }, [loggedIn, navigate, rev, where, role, everyone]);
  // return !rev || localStorage.role === role ? children : null;
  if (CanRender) {
    return children;
  } else {
    return null;
  }

  // let renders = localStorage.role === role ? children : null;
}
