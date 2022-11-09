import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Test() {
  console.log("hola");
  let navigate = useNavigate();
  useEffect(() => {
    // navigate("/user/login", {
    //   state: { email: "test@test.com", password: "1234tyuiOK" },
    // });
    navigate("/user/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
