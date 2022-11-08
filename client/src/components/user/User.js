import "../../functions/Token";
import { Redirect } from "../../functions/Token";
import Logout from "./Logout";
function User() {
  Redirect("/user/login", false);
  return (
    <>
      <h1>HII! {localStorage.name}</h1>
      <Logout />
    </>
  );
}
export default User;
