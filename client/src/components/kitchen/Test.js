import TestTwo from "./test2";
import { useEffect, useState } from "react";
export default function TestKitchen() {
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    console.log("helo its working!");
  }, [popup]);
  return (
    <>
      <h1>Hola! Kitchen</h1>
      <TestTwo open={popup} setOpen={setPopup} />
    </>
  );
}
