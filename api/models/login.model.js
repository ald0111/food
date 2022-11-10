const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { email } = require("../../client/src/functions/input/Validator");
const config = require("../configs/db.config");

function loginModel(Email, Password, err = {}) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    let errors = err;

    email(Email, errors);

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      reject(errors);
    }

    connection.connect();

    let query = `SELECT userId,name,password,role FROM users WHERE email = '${Email}'`;

    connection.query(query, async (error, rows) => {
      if (error) {
        throw error;
      }
      let userId;
      let name;
      let role;

      if (rows.length === 1) {
        let row = rows[0];
        userId = row.userId;
        name = row.name;
        role = row.role;
        let password = row.password;
        let valid = await bcrypt.compare(Password, password);

        if (!valid) {
          errors.error = "incorrect email or password";
        }
      } else {
        errors.error = "incorrect email or password";
      }
      connection.end();

      if (Object.keys(errors).length === 0) {
        resolve({ userId: userId, name: name, role: role });
      } else {
        reject(errors);
      }
    });
  });
}

module.exports = loginModel;
