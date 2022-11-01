const mysql = require("mysql");

const { email } = require("../../client/src/input/Validator");
const config = require("../configs/db.config");

async function emailModel(Email, err = {}) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);
    let errors = err;

    email(Email, errors);

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      reject(errors);
    }

    connection.connect();

    let query = `SELECT * FROM users WHERE email ='${Email}'`;
    connection.query(query, (error, rows) => {
      if (error) {
        throw error;
      }
      if (rows.length > 0) {
        errors.email = "email exists";
        reject(errors);
      } else {
        resolve(true);
      }
      connection.end();
    });

    // return 1;
  });
}
module.exports = emailModel;
