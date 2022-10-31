const connection = require("../configs/db.config");

async function register(email, name, password, phonenumber) {
  connection.connect();
  let query = `INSERT INTO users VALUES ('${email}', '${name}', '${phonenumber}', '${password}')`;
  let response = connection.query(query, (error, rows, fileds) => {
    if (error) {
      throw error;
    }
    // return true;
    console.log(rows);
  });

  connection.end();
}
module.exports = register;
