import ProtectedRoutes from "../ProtectedRoutes";

export default function TestKitchen() {
  return (
    <ProtectedRoutes role="kitchen">
      <h1>Hola! Kitchen</h1>
    </ProtectedRoutes>
  );
}
