const mysql = require("mysql");
const config = require("../../configs/db.config");

async function completeOrderModel(orderid) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);

    connection.connect();

    let query = `UPDATE orders SET status = 'completed' WHERE id = '${orderid}'`;

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

module.exports = completeOrderModel;
