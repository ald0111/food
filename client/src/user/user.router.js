import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function UserRouter() {
  return (
    <Routes>
      <Route path="/user">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
export default UserRouter;
