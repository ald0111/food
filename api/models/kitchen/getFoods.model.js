const mysql = require("mysql");
const config = require("../../configs/db.config");

async function fetchMenuModel() {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);

    connection.connect();

    let query = "SELECT FoodName, Cost, quantity FROM Foods";

    connection.query(query, (error, rows, fields) => {
      if (error) {
        connection.end();
        return reject(error);
      }

      const menuData = rows.map((row) => {
        return {
          FoodName: row.FoodName,
          Cost: row.Cost,
          Quantity: row.quantity,
        };
      });

      connection.end();
      resolve(menuData);
    });
  });
}

module.exports = fetchMenuModel;
