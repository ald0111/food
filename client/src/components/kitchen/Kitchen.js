import { Logout } from "../user/Logout";

import { useState, useEffect, useContext, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./Kitchen.css";
import Verify from "./Verify";
import LoggedInContext from "../LoggedInContext";
import { nameValidator } from "../../functions/input/Validator";
import { currencyValidator } from "../../functions/input/Validator";
import { TextField, Button } from "@mui/material";
import TestKitchen from "./Test";

export default function Kitchen() {
  //   const

  //   const [whichSection, setWhichSection] = useState("to");
  //   useEffect(() => {
  //     console.log("i'm good");
  //   }, [whichSection]);

  const ws = useRef();
  const [RTdata, setRTdata] = useState({});
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.78.96:8000/ws");
    ws.current.onopen = () => {
      console.log("Connected");
    };
    ws.current.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      setRTdata({ data: message });
      // console.log(message);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (ws.current.readyState === 1) {
      ws.current.send(orderCount);
    }
  }, [orderCount]);

  return (
    <div>
      <center>
        <h1>hi kitchen</h1>
        <Logout />
        <div className="margin-top">
          <Navigator orderCount={orderCount} />
        </div>
      </center>
      <Routes>
        <Route path="/add" element={<AddMenu />} />
        <Route path="/update" element={<UpdateMenu />} />
        <Route path="/test" element={<TestKitchen />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route
          path="/orders"
          element={<Orders setOrderCount={setOrderCount} wsData={RTdata} />}
        />
      </Routes>
    </div>
  );
}
// let count = 0;

function AddMenu() {
  const [FoodName, setFoodName] = useState("");
  const [Cost, setCost] = useState("");
  const [Error, setError] = useState({ color: "red", error: "" });
  // const navigate = useNavigate();
  const [, setLoggedIn] = useContext(LoggedInContext);
  const logout = () => {
    localStorage.clear();
    setLoggedIn({ value: false, afterLogin: "/kitchen/add" });
  };
  const addMenuHandler = async (values) => {
    let jsonBody = JSON.stringify({
      foodName: values.foodName,
      cost: values.cost,
    });
    try {
      let response = await fetch("/api/kitchen/addToMenu", {
        method: "put",
        body: jsonBody,
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
          setError({ color: "green", error: "Success!" });

          // test();
        } catch (error) {
          console.log("add menu error", error);
        }
      } else if (response.status === 403) {
        logout();
      } else {
        // formik.errors = response.json();
        console.log("api put failed");
        // console.log(await response.json());
        let errorObj = await response.json();

        setError({ color: "red", error: Object.values(errorObj)[0] });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addFoodHandler = (event) => {
    event.preventDefault();
    console.log(event);
    let errors = {};
    nameValidator(FoodName, errors);
    currencyValidator(Cost, errors);
    if (Object.keys(errors).length > 0) {
      console.log("Invalid foodname or currency entry");
      setError({ color: "red", error: Object.values(errors)[0] });
      return;
    }
    addMenuHandler({ foodName: FoodName, cost: Cost });
  };
  return (
    <section className="kitchenDiv" id="addToMenu">
      <center>
        <h1>Welcome to AddMenu</h1>
        <div className="margin-top"></div>
        <span style={{ color: Error.color }}>{Error.error}</span>
        <form action="" onSubmit={addFoodHandler}>
          <TextField
            className="margin-left"
            type="text"
            name="foodName"
            id="foodName"
            variant="outlined"
            placeholder="FoodName"
            value={FoodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
            InputProps={{
              style: {
                color: "#000", // Change text color to white
                borderColor: "white", // Change border color to white
                backgroundColor: "white",
              },
            }}
          />
          <TextField
            type="text"
            name="cost"
            className="margin-left"
            variant="outlined"
            id="cost"
            placeholder="Cost"
            value={Cost}
            onChange={(e) => setCost(e.target.value)}
            required
            InputProps={{
              style: {
                color: "#000", // Change text color to white
                borderColor: "white", // Change border color to white
                backgroundColor: "white",
              },
            }}
          />
          <Button
            className="margin-left"
            variant="contained"
            type="submit"
            value="Add Food"
          >
            Add Food
          </Button>
        </form>
      </center>
    </section>
  );
}
function extractNumber(input) {
  // Use regular expression to match numeric characters at the beginning of the string
  const match = input.match(/^\d+/);

  // If a match is found, convert it to a number and return, otherwise return null
  return match ? parseInt(match[0], 10) : null;
}
function UpdateMenu() {
  const [foods, setFoods] = useState([]);
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

  const updateMenuHandler = async (e) => {
    let val = document.getElementById(
      extractNumber(e.target.id) + "value"
    ).value;
    console.log(val);
    let jsonBody = JSON.stringify({
      foodName: foods[extractNumber(e.target.id)]["FoodName"],
      quantity: val,
    });
    try {
      let response = await fetch("/api/kitchen/updateQuantity", {
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: jsonBody,
      });
      console.log(response.ok);
      if (response.ok) {
        try {
          let resp = await response.json();
          console.log(resp);
          getMenu();
        } catch (error) {
          console.log("update menu error", error);
        }
      } else {
        console.log("api updateMenu failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <center>
      <section className="kitchenDiv" id="addToMenu">
        <h1>Welcome to Update menu</h1>
      </section>
      <table>
        <thead>
          <tr>
            <th>FoodName</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Change Quantity</th>
            <th>Apply</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, id) => (
            <tr key={id}>
              <td>{food["FoodName"]}</td>
              <td>{food["Cost"]}</td>
              <td>{food["Quantity"]}</td>
              <td>
                <TextField
                  type="text"
                  placeholder="Quantity"
                  id={id + "value"}
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
                  variant="contained"
                  id={id + "button"}
                  onClick={(e) => {
                    updateMenuHandler(e);
                  }}
                >
                  Apply
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </center>
  );
}
const Food = ({ foods }) => {
  const foodParsed = JSON.parse(foods["order_data"]);
  console.log(foodParsed);
  return (
    <table key={2}>
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
function Orders({ setOrderCount, wsData }) {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      let response = await fetch("/api/kitchen/viewOrders", {
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
          setOrders(resp);

          // test();
        } catch (error) {
          console.log("add menu error", error);
        }
      } else {
        // formik.errors = response.json();
        console.log("api getOrders failed");
        // console.log(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  const acceptOrderHandler = async (e) => {
    console.log("ok done");
    let oId = orders[extractNumber(e.target.id)]["id"];
    let jsonBody = JSON.stringify({
      orderId: oId,
    });
    try {
      let response = await fetch("/api/kitchen/acceptOrder", {
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: jsonBody,
      });
      console.log(response.ok);
      if (response.ok) {
        try {
          let resp = await response.json();
          console.log(resp);
          getOrders();
        } catch (error) {
          console.log("update menu error", error);
        }
      } else {
        console.log("api updateMenu failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="kitchenDiv" id="addToMenu">
        <center>
          <h1>Welcome to Orders</h1>
        </center>
      </section>
      {/* <Button
        variant="contained"
        onClick={() => {
          setOrderCount((count) => count + 1);
        }}
      >
        add
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setOrderCount((count) => {
            if (count > 0) {
              return count - 1;
            }
            return 0;
          });
        }}
      >
        subtract
      </Button>
      <span>{wsData?.data}</span> */}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order</th>
            <th>Status</th>
            <th>Name</th>
            <th>Phonenumber</th>
            <th>Accept</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, id) =>
            order["status"] === "pending" ? (
              <tr key={`${id}t`}>
                <td>{order["id"]}</td>
                <td>
                  <Food foods={order} />
                </td>
                <td>{order["status"]}</td>
                <td>{order["name"] ? order["name"] : "Not available"}</td>
                <td>{order["phonenumber"]}</td>
                <td>
                  <Button
                    variant="contained"
                    id={id + "buttonOrder"}
                    onClick={(e) => {
                      acceptOrderHandler(e);
                    }}
                  >
                    Accept
                  </Button>
                </td>
              </tr>
            ) : (
              <></>
            )
          )}
        </tbody>
      </table>
    </>
  );
}

function Navigator({ orderCount }) {
  let navigate = useNavigate();
  const addToMenu = () => {
    navigate("/kitchen/add");
  };
  const updateMenu = () => {
    navigate("/kitchen/update");
  };
  const takeOrders = () => {
    navigate("/kitchen/orders");
  };
  return (
    <nav>
      <ul>
        <li>
          <Button
            className="margin-left"
            variant="contained"
            id="atm"
            onClick={addToMenu}
          >
            Add to menu
          </Button>
        </li>
        <li>
          <Button
            className="margin-left"
            variant="contained"
            id="um"
            onClick={updateMenu}
          >
            Update menu
          </Button>
        </li>
        <li>
          <Button
            className="margin-left"
            variant="contained"
            id="to"
            onClick={takeOrders}
          >
            Take orders
            {orderCount > 0 ? <span>Count: {orderCount} </span> : null}
          </Button>
        </li>
      </ul>
    </nav>
  );
}
