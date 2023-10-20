import React from "react";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const Food = (inps) => {
  const foodParsed = JSON.parse(inps["foods"]["order_data"]);
  console.log(foodParsed);
  return (
    <table>
      <tbody>
        {Object.entries(foodParsed).map(([id, food]) => (
          <tr key={id + "food"}>
            <td>{String(food["FoodName"])}</td>
            {/* <td>{String(food["Cost"])}</td> */}
            <td>{String(food["Quantity"])}</td>
            {/* <td>{String(food["Cost"] * food["Quantity"])}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
function CompleteOrder({ token, fn }) {
  const completeHandler = () => {
    console.log(token);
    fetch(`/api/kitchen/complete/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("cool");
        fn();
      });
  };
  return <button onClick={completeHandler}>Complete Order</button>;
}
function Verify() {
  const { token } = useParams();
  const [order, setOrder] = useState({
    id: null,
    order_data: null,
    status: null,
    name: null,
    phonenumber: null,
  });
  const fetchOrder = async () => {
    fetch(`/api/kitchen/verify/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setOrder(data[0]);
      });
  };
  useEffect(() => {
    fetchOrder();
  }, [token]);
  return (
    <>
      <div>ViewOrders</div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order</th>
            <th>Status</th>
            <th>Name</th>
            <th>Phonenumber</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order["id"]}</td>
            <td>{order["order_data"] ? <Food foods={order} /> : null}</td>
            <td>{order["status"]}</td>
            <td>{order["name"] ? order["name"] : "Not available"}</td>
            <td>{order["phonenumber"]}</td>
          </tr>
        </tbody>
      </table>
      <CompleteOrder
        token={token}
        fn={() => {
          setOrder((prev) => ({ ...prev, status: "completed" }));
        }}
      />
    </>
  );
}

export default Verify;
