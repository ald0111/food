const mysql = require("mysql");

const { phonenumber } = require("../../client/src/functions/input/Validator");
const config = require("../configs/db.config");

async function phonenumberModel(Email, err = {}) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);
    let errors = err;

    phonenumber(Email, errors);

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return reject(errors);
    }

    connection.connect();

    let query = `SELECT * FROM users WHERE phonenumber ='${Email}'`;
    connection.query(query, (error, rows) => {
      if (error) {
        throw error;
      }
      if (rows.length > 0) {
        errors.phonenumber = "phonenumber exists";
        reject(errors);
      } else {
        resolve(true);
      }
      connection.end();
    });

    // return 1;
  });
}
module.exports = phonenumberModel;
