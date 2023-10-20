import React from "react";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/user/viewOrders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, []);
  return (
    <>
      <div>ViewOrders</div>
      {orders.map((order, i) => (
        <div key={i}>
          <QRCode
            value={"http://192.168.78.96:3000/kitchen/verify/" + order}
            bgColor="#292C33"
            fgColor="#ffffff"
            size={600}
          />
        </div>
      ))}
    </>
  );
}

export default ViewOrders;
