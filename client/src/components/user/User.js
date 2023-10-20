import "../../functions/Token";
import { Route, Routes } from "react-router-dom";
import ViewOrders from "./ViewOrders";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoutes from "../ProtectedRoutes";
import { Logout } from "./Logout";
import "./style1.css";
import "./style2.css";
import { TextField, Button } from "@mui/material";

const PlaceOrder = ({ cart, getMenu, setCart }) => {
  const placeOrder = async () => {
    try {
      let response = await fetch("/api/kitchen/placeOrder", {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: cart }),
      });
      console.log(response.ok);
      if (response.ok) {
        try {
          let resp = await response.json();
          console.log(resp);
          getMenu();
          setCart({});
        } catch (error) {
          console.log("place order error", error);
        }
        console.log("order placed");
      } else {
        console.log("api placeOrder failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="contained" onClick={placeOrder}>
      Place Order
    </Button>
  );
};

function User() {
  // Redirect("/user/login", false);
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState({});
  let navigate = useNavigate();
  const viewOrders = () => {
    navigate("/user/orders");
  };
  const viewMenu = () => {
    navigate("/user/");
  };
  const getMenu = async () => {
    try {
      let response = await fetch("/api/kitchen/menu", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.ok);
      if (response.ok) {
        try {
          let resp = await response.json();
          console.log(resp);
          setFoods(resp);

          // test();
        } catch (error) {
          console.log("add menu error", error);
        }
      } else {
        // formik.errors = response.json();
        console.log("api getMenu failed");
        // console.log(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMenu();
  }, []);
  const addToCart = async (e) => {
    let id = e.target.id.split("button")[0];
    let quantity = document.getElementById(id + "input").value;
    // console.log(quantity);
    if (quantity > 0) {
      // console.log(foods[id]["Quantity"]);
      if (foods[id]["Quantity"] >= quantity) {
        setCart((prev) => {
          let temp = {};
          temp[id] = JSON.parse(
            JSON.stringify({
              ...foods[id],
              Remaining: foods[id]["Quantity"] - quantity,
              Quantity: quantity,
            })
          );
          // temp[id]["Quantity"] = quantity;
          // temp[id].Remaining = 0;
          console.log(temp);
          return { ...prev, ...temp };
        });
      } else {
        alert("Not enough quantity is available");
      }
    }
  };
  function MenuPlace() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>FoodName</th>
              <th>Cost</th>
              <th>Available</th>
              <th>Quantity</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, id) =>
              food["Quantity"] > 0 ? (
                <tr key={id}>
                  <td>{food["FoodName"]}</td>
                  <td>{food["Cost"]}</td>
                  <td>{food["Quantity"]}</td>
                  <td>
                    <TextField
                      className="textInput"
                      id={id + "input"}
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      InputProps={{
                        style: {
                          color: "#000", // Change text color to white
                          borderColor: "white", // Change border color to white
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      id={id + "button"}
                      variant="contained"
                      onClick={(e) => {
                        addToCart(e);
                      }}
                    >
                      Apply
                    </Button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
        <div className="margin-top"></div>
        <h1>Cart</h1>
        <table>
          <thead>
            <tr>
              <th>FoodName</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Totalcost</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(cart).map(([id, food]) => (
              <tr key={id}>
                <td>{food["FoodName"]}</td>
                <td>{food["Cost"]}</td>
                <td>{food["Quantity"]}</td>
                <td>{food["Cost"] * food["Quantity"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="margin-top"></div>
        <PlaceOrder cart={cart} getMenu={getMenu} setCart={setCart} />
      </>
    );
  }
  return (
    <ProtectedRoutes>
      <center>
        <h1>Hi, {localStorage.name}</h1>
        <Logout />
        <h1>Greetings!</h1>
        <div className="margin-top"></div>
        <Button variant="contained" onClick={viewOrders}>
          View Orders
        </Button>
        <Button className="margin-left" variant="contained" onClick={viewMenu}>
          Place Orders
        </Button>
        <div className="margin-top"></div>
        <Routes>
          <Route index element={<MenuPlace />} />
          <Route path="/orders" element={<ViewOrders />} />
        </Routes>
      </center>
    </ProtectedRoutes>
  );
}
export default User;
