const mysql = require("mysql");
const config = require("../../configs/db.config");
const updateQuantity = require("./updateQuantity.model");

async function placeOrderModel(order, userId) {
  return new Promise(async (resolve, reject) => {
    let orderData = JSON.parse(order);
    Object.entries(orderData).map(([id, food]) => {
      console.log(food["FoodName"], food["Remaining"]);
      updateQuantity(food["FoodName"], food["Remaining"]);
    });

    const connection = mysql.createConnection(config);

    connection.connect();

    let query = `INSERT INTO orders (user_id, order_data, status) VALUES ('${userId}', '${order}', 'pending');`;
    console.log(query);
    connection.query(query, (error, rows, fileds) => {
      if (error) {
        throw error;
      }
      // return true;
      // console.log(rows);
      connection.end();
      resolve(true);
    });
  });
}
module.exports = placeOrderModel;
