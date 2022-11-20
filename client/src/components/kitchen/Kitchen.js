import { Logout } from "../user/Logout";

import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./Kitchen.css";

export default function Kitchen() {
  //   const

  //   const [whichSection, setWhichSection] = useState("to");
  //   useEffect(() => {
  //     console.log("i'm good");
  //   }, [whichSection]);
  const [orderCount, setOrderCount] = useState(0);

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
          element={<Orders setOrderCount={setOrderCount} />}
        />
      </Routes>
    </div>
  );
}
// let count = 0;

function AddMenu() {
  const [FoodName, setFoodName] = useState("");
  const [Cost, setCost] = useState("");

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

          // test();
        } catch (error) {
          console.log("add menu error", error);
        }
      } else {
        // formik.errors = response.json();
        console.log("api put failed");
        // console.log(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addFoodHandler = (event) => {
    event.preventDefault();
    // console.log(event);
    addMenuHandler(FoodName, Cost);
  };
  return (
    <section className="kitchenDiv" id="addToMenu">
      <span>Welcome to AddMenu</span>
      <center>
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
  return (
    <section className="kitchenDiv" id="addToMenu">
      Welcome to Update menu
    </section>
  );
}

function Orders({ setOrderCount }) {
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
          setOrderCount((count) => count - 1);
        }}
      >
        subtract
      </button>
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
