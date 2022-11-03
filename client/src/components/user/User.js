import { Outlet } from "react-router-dom";
import "../../functions/Token";
import tokenExists from "../../functions/Token";
function User() {
  return <>{tokenExists() ? <h1>HII! {localStorage.name}</h1> : <Outlet />}</>;
}
export default User;
