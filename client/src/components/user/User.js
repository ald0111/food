import "../../functions/Token";
import { Redirect, Logout } from "../../functions/Token";

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
