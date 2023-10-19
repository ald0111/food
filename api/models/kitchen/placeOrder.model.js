const mysql = require("mysql");
const config = require("../../configs/db.config");

async function placeOrderModel(order, userId) {
  return new Promise(async (resolve, reject) => {
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
