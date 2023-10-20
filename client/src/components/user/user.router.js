import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Logout } from "./Logout";
import User from "./User";
import Test from "./Test";
function UserRouter() {
  return (
    <Routes>
      <Route path="/*" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}
export default UserRouter;
