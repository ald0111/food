const mysql = require("mysql");

const userId = (userId, errors) => {
  if (!/^[0-9]{18}$/.test(userId)) {
    console.log(userId);
    errors.userId = "invalid userId";
  }
};
const checkRole = (role, errors) => {
  if (!/^[a-z]{4,7}$/.test(role)) {
    errors.role = "invalid role";
  }
};
const config = require("../configs/db.config");

async function checkUser(UserId, Role, err = {}) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(config);
    let errors = err;

    userId(UserId, errors);
    checkRole(Role, errors);

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return reject(errors);
    }

    connection.connect();

    let query = `SELECT userId FROM users WHERE userId ='${UserId}' AND role ='${Role}'`;
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
