import { Logout } from "../user/Logout";

import { useState, useEffect, useContext, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./Kitchen.css";
import LoggedInContext from "../LoggedInContext";
import { nameValidator } from "../../functions/input/Validator";
import { currencyValidator } from "../../functions/input/Validator";

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
    ws.current = new WebSocket("ws://192.168.101.100:8000/ws");
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
        <Navigator orderCount={orderCount} />
        <h1>hi kitchen</h1>
        <Logout />
      </center>
      <Routes>
        <Route path="/add" element={<AddMenu />} />
        <Route path="/update" element={<UpdateMenu />} />
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
      <span>Welcome to AddMenu</span>
      <center>
        <span style={{ color: Error.color }}>{Error.error}</span>
        <form action="" onSubmit={addFoodHandler}>
          <input
            type="text"
            name="foodName"
            id="foodName"
            placeholder="FoodName"
            value={FoodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          <input
            type="text"
            name="cost"
            id="cost"
            placeholder="Cost"
            value={Cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <input type="submit" value="Add Food" />
        </form>
      </center>
    </section>
  );
}

function UpdateMenu() {
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
  return (
    <section className="kitchenDiv" id="addToMenu">
      Welcome to Update menu
    </section>
  );
}

function Orders({ setOrderCount, wsData }) {
  return (
    <>
      <section className="kitchenDiv" id="addToMenu">
        Welcome to Orders
      </section>
      <button
        onClick={() => {
          setOrderCount((count) => count + 1);
        }}
      >
        add
      </button>
      <button
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
      </button>
      <span>{wsData?.data}</span>
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
          <button id="atm" onClick={addToMenu}>
            Add to menu
          </button>
        </li>
        <li>
          <button id="um" onClick={updateMenu}>
            Update menu
          </button>
        </li>
        <li>
          <button id="to" onClick={takeOrders}>
            Take orders
            {orderCount > 0 ? <span>Count: {orderCount} </span> : null}
          </button>
        </li>
      </ul>
    </nav>
  );
}
