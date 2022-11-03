function email(email, errors) {
  if (!email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Invalid email address";
  }
}
function password(password, errors) {
  if (!password) {
    errors.password = "Required";
    //   } else if (!/^[A-Z0-9._%+-]*$/i.test(password)) {
    //     errors.password = "Invalid password";
  } else if (password.length < 8 || password.length > 32) {
    errors.password = "Passwords should be 8 to 64 characters long.";
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/gm.test(password)
  ) {
    errors.password =
      "Must contain at least one uppercase letter, one lowercase letter and one number";
  }
}

function phonenumber(phonenumber, errors) {
  if (!phonenumber) {
    errors.phonenumber = "Required";
  } else if (!/^[0-9]{10}$/i.test(phonenumber)) {
    errors.phonenumber = "Invalid phonenumber";
  }
}

function nameValidator(name, errors) {
  if (!name) {
    errors.name = "Required";
  } else if (!/^[A-Za-z\x20]{3,24}$/i.test(name)) {
    errors.name = "Invalid name";
  }
}

module.exports = { email, nameValidator, password, phonenumber };
