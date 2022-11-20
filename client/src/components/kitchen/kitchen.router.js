import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../ProtectedRoutes";
// import TestKitchen from "./Test";
import Kitchen from "./Kitchen";
function KitchenRouter() {
  return (
    <ProtectedRoutes role="kitchen">
      <Routes>
        {/* <Route index element={<Kitchen />} /> */}
        <Route path="*" element={<Kitchen />} />
        {/* <Route path="/kitchen/login" element={<Login />} />
      <Route path="/kitchen/register" element={<Register />} />
      <Route path="/kitchen/test" element={<Test />} /> */}
      </Routes>
    </ProtectedRoutes>
  );
}
export default KitchenRouter;
