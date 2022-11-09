import "../../functions/Token";

import ProtectedRoutes from "../ProtectedRoutes";
import { Logout } from "./Logout";
function User() {
  // Redirect("/user/login", false);
  return (
    <ProtectedRoutes>
      <h1>HII! {localStorage.name}</h1>
      <Logout />
      <h1>Yello!</h1>
    </ProtectedRoutes>
  );
}
export default User;
