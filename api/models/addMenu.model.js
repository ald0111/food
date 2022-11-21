const mysql = require("mysql");

const {
  nameValidator,
  currencyValidator,
} = require("../../client/src/functions/input/Validator");
const config = require("../configs/db.config");

async function addMenuModel(FoodName, Cost) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);
    let errors = {};
    nameValidator(FoodName, errors);
    currencyValidator(Cost, errors);

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return reject(errors);
    }

    connection.connect();

    let query = `INSERT INTO Foods (FoodName, Cost, dateCreated) VALUES ( '${FoodName}', '${Cost}', CURRENT_DATE())`;

    connection.query(query, (error, rows, fileds) => {
      if (error) {
        throw error;
      }
      console.log("Food added");
      // return true;
      // console.log(rows);
      connection.end();
      resolve(true);
    });
  });
}
module.exports = addMenuModel;
