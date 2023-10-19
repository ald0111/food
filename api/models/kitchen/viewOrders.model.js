const mysql = require("mysql");
const config = require("../../configs/db.config");

async function viewOrdersModel() {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);

    connection.connect();

    let query = "select * from order_user_view";

    connection.query(query, (error, rows, fields) => {
      if (error) {
        connection.end();
        return reject(error);
      }

      //   const menuData = rows.map((row) => {
      //     return {
      //       id: row.FoodName,
      //       Cost: row.Cost,
      //       Quantity: row.quantity,
      //     };
      //   });

      connection.end();
      resolve(rows);
    });
  });
}

module.exports = viewOrdersModel;
