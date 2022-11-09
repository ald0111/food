import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function tokenExists() {
  return localStorage.token && localStorage.name ? true : false;
}
export function Redirect(where = "/user", rev = true) {
  let navigate = useNavigate();
  // console.log(where, rev, tokenExists());
  useEffect(() => {
    if (rev === tokenExists()) {
      console.log("blah");
      navigate(where);
    }
  });
}
export function Logout() {
  let navigate = useNavigate();
  // console.log(where, rev, tokenExists());
  const logout = () => {
    localStorage.clear();

    navigate("/user/login");
  };
  return <button onClick={logout}>Logout</button>;
}
