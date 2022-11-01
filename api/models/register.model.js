const mysql = require("mysql");
const {
  phonenumber,
  nameValidator,
  password,
  email,
} = require("../../client/src/input/Validator");
const config = require("../configs/db.config");

async function registerModel(Email, Name, Phonenumber, Password) {
  const connection = mysql.createConnection(config);
  let errors = {};
  nameValidator(Name, errors);
  email(Email, errors);
  phonenumber(Phonenumber, errors);
  password(Password, errors);
  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return 0;
  }
  connection.connect();
  let query = `INSERT INTO users VALUES (UUID_SHORT(), '${Email}', '${Name}', '${Phonenumber}', '${Password}', CURRENT_DATE())`;
  await connection.query(query, (error, rows, fileds) => {
    if (error) {
      throw error;
    }
    // return true;
    // console.log(rows);
    connection.end();
  });

  return 1;
}
module.exports = registerModel;
