const mysql = require("mysql");
const config = require("../../configs/db.config");

async function acceptOrderModel(id) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);

    connection.connect();
    let test = 0;
    let query = `UPDATE orders SET status = 'accepted' WHERE id = '${id}'`;

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

module.exports = acceptOrderModel;
