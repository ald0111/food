const mysql = require("mysql");
const bcrypt = require("bcrypt");
const {
  phonenumber,
  nameValidator,
  password,
  email,
} = require("../../client/src/input/Validator");
const config = require("../configs/db.config");

async function registerModel(Email, Name, Phonenumber, Password) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);
    let errors = {};
    nameValidator(Name, errors);
    email(Email, errors);
    phonenumber(Phonenumber, errors);
    password(Password, errors);
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      reject(errors);
    }
    const salt = bcrypt.genSalt(10);
    connection.connect();
    const hash = await bcrypt.hash(Password, await salt);
    let query = `INSERT INTO users VALUES (UUID_SHORT(), '${Email}', '${Name}', '${Phonenumber}', '${hash}', CURRENT_DATE())`;
    await connection.query(query, (error, rows, fileds) => {
      if (error) {
        throw error;
      }
      // return true;
      // console.log(rows);
      connection.end();
      resolve(true);
    });
  });
}
module.exports = registerModel;
