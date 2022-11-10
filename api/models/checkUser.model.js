const mysql = require("mysql");

const userId = (userId, errors) => {
  if (!/^[0-9]{18}$/.test(userId)) {
    console.log(userId);
    errors.userId = "invalid userId";
  }
};
const config = require("../configs/db.config");

async function checkUser(UserId, err = {}) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);
    let errors = err;

    userId(UserId, errors);

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      reject(errors);
    }

    connection.connect();

    let query = `SELECT userId FROM users WHERE userId ='${UserId}'`;
    connection.query(query, (error, rows) => {
      if (error) {
        throw error;
      }
      if (rows.length > 0) {
        resolve(true);
      } else {
        errors.userId = "userId does not exist";
        reject(errors);
      }
      connection.end();
    });

    // return 1;
  });
}
module.exports = checkUser;
