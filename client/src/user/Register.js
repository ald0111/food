import { useFormik } from "formik";
import { Link } from "react-router-dom";

import {
  email,
  password,
  phonenumber,
  nameValidator,
} from "../input/Validator";

const validate = (values) => {
  let errors = {};

  email(values.email, errors);
  password(values.password, errors);
  nameValidator(values.name, errors);
  phonenumber(values.phonenumber, errors);
  // console.log(values.email, errors);
  return errors;
};

export default function Register() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phonenumber: "",
      name: "",
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      registerHandler(values);
    },
  });
  const registerHandler = async (values) => {
    let jsonBody = JSON.stringify({
      email: values.email,
      name: values.name,
      phonenumber: values.phonenumber,
      password: values.password,
    });
    try {
      let response = await fetch("/api/user/register", {
        method: "post",
        body: jsonBody,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      console.log(response.ok);
      if (response.ok) {
        console.log("test");
        formik.setStatus({});
      } else {
        // formik.errors = await response.json();
        // formik.touched.name = true;
        // formik.errors.name = "testing";
        formik.setStatus(await response.json());
        // console.log(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <center>
      <h2>Login</h2>
      <form
        onSubmit={formik.handleSubmit}
        action="/api/user/register"
        method="post"
      >
        <div>
          <input
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email"
            name="email"
            id="email"
          />
          {(formik.touched.email && formik.errors.email && (
            <>
              <br></br>
              <span>{formik.errors.email}</span>
            </>
          )) ||
            (formik.status && (
              <>
                <br></br>
                <span>{formik.status.email}</span>
              </>
            ))}
        </div>
        <div>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Full Name"
            name="name"
            id="name"
          />
          {formik.touched.name && formik.errors.name && (
            <>
              <br></br>
              <span>{formik.errors.name}</span>
            </>
          )}
        </div>

        <div>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phonenumber}
            placeholder="Phonenumber"
            name="phonenumber"
            id="phonenumber"
          />
          {(formik.touched.phonenumber && formik.errors.phonenumber && (
            <>
              <br></br>
              <span>{formik.errors.phonenumber}</span>
            </>
          )) ||
            (formik.status && (
              <>
                <br></br>
                <span>{formik.status.phonenumber}</span>
              </>
            ))}
        </div>
        <div>
          <input
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Passowrd"
            name="password"
            id="password"
          />
          {formik.touched.password && formik.errors.password && (
            <>
              <br></br>
              <span>{formik.errors.password}</span>
            </>
          )}
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
      <Link to="/user/login">Login here</Link>
    </center>
  );
}
