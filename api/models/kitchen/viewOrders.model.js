const mysql = require("mysql");
const config = require("../../configs/db.config");

async function viewOrdersModel(userId, orderId) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);

    connection.connect();
    let query;
    if (userId != undefined) {
      query = `select * from order_user_view where status='accepted' AND user_id = '${userId}'`;
    } else if (orderId != undefined) {
      query = `select * from order_user_view where status='accepted' AND id = ${orderId}`;
    } else {
      query = "select * from order_user_view";
    }
    console.log(query);
    connection.query(query, (error, rows, fields) => {
      if (error) {
        connection.end();
        return reject(error);
      }

      connection.end();
      resolve(rows);
    });
  });
}

module.exports = viewOrdersModel;
