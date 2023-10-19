const mysql = require("mysql");
const config = require("../../configs/db.config");

async function updateQuantity(foodName, quantity) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);

    connection.connect();
    let test = 0;
    let query = `UPDATE Foods SET quantity = ${quantity} WHERE FoodName = '${foodName}'`;

    connection.query(query, (error, rows, fields) => {
      if (error) {
        connection.end();
        return reject(error);
      }

      connection.end();
      resolve(true);
    });
  });
}

module.exports = updateQuantity;
