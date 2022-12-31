const mysql = require("mysql");

const {
  nameValidator,
} = require("../../../client/src/functions/input/Validator");
const config = require("../../configs/db.config");

async function foodNameModel(FoodName, err = {}) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);
    let errors = err;

    nameValidator(FoodName, errors);

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return reject(errors);
    }

    connection.connect();

    let query = `SELECT foodName FROM Foods WHERE foodName ='${FoodName}'`;
    connection.query(query, (error, rows) => {
      if (error) {
        throw error;
      }
      if (rows.length > 0) {
        errors.exists = "food exists";
        reject(errors);
      } else {
        resolve(true);
      }
      connection.end();
    });

    // return 1;
  });
}
module.exports = foodNameModel;
