import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
function UserRouter() {
  return (
    <Routes>
      <Route path="/user" element={<User />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
export default UserRouter;
