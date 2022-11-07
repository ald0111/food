import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import Test from "./Test";
function UserRouter() {
  return (
    <Routes>
      <Route path="/user" element={<User />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/user/test" element={<Test />} />
    </Routes>
  );
}
export default UserRouter;
