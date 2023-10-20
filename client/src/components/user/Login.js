import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { email, password } from "../../functions/input/Validator";
import "./style1.css";
import { useEffect, useContext } from "react";

import LoggedInContext from "../LoggedInContext";
import ProtectedRoutes from "../ProtectedRoutes";

import { Button, TextField } from "@mui/material";

const validate = (values) => {
  let errors = {};

  email(values.email, errors);
  password(values.password, errors);
  // console.log(values.email, errors);
  return errors;
};

function Login(props) {
  const navigate = useNavigate();
  // Redirect();
  //login context
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  // console.log("render");

  //gets state passed through useNavigate function
  let { state } = useLocation();
  if (!state) {
    state = {};
  }
  const { email, password } = state;

  //input form validator
  const formik = useFormik({
    initialValues: {
      email: email || "",
      password: password || "",
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      loginHandler(values);
    },
  });
  // let navigate = useNavigate();

  //runs when component renders for the first time
  useEffect(() => {
    if (!loggedIn.value && email && password) {
      formik.submitForm();
    }

    // formik.setSubmitting(true);

    //  { email, password } = state;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginHandler = async (values) => {
    let jsonBody = JSON.stringify({
      email: values.email,
      password: values.password,
    });
    try {
      let response = await fetch("/api/user/login", {
        method: "post",
        body: jsonBody,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.ok);
      if (response.ok) {
        try {
          let resp = await response.json();
          console.log(resp);
          localStorage.setItem("token", resp.token);
          localStorage.setItem("name", resp.name);
          localStorage.setItem("role", resp.role);
          navigate(loggedIn.afterLogin);
          setLoggedIn({ value: true });
          // test();
        } catch (error) {
          console.log("login error", error);
        }
      } else {
        // formik.errors = response.json();
        formik.setStatus(await response.json());
        // console.log(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProtectedRoutes rev={false}>
      <center>
        <div className="form-container">
          <h2>Login</h2>

          <form
            onSubmit={formik.handleSubmit}
            action="/api/user/login"
            method="post"
          >
            {formik.status && <span>{formik.status.error}</span>}
            <div>
              <TextField
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                label="Email"
                name="email"
                id="email"
                autoComplete="email"
              />
              {formik.touched.email && formik.errors.email && (
                <>
                  <br></br>
                  <span>{formik.errors.email}</span>
                </>
              )}
            </div>
            <div className="margin-top">
              <TextField
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                label="Passowrd"
                name="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <input
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Passowrd"
              name="password"
              id="password"
              autoComplete="current-password"
            /> */}
              {formik.touched.password && formik.errors.password && (
                <>
                  <br></br>
                  <span>{formik.errors.password}</span>
                </>
              )}
            </div>
            <div className="margin-top">
              <Button variant="contained" type="submit">
                Hello World
              </Button>
              {/* <input type="submit" value="Login" /> */}
            </div>
          </form>
          <div>
            <Link to="/user/register">Register here</Link>
          </div>
        </div>
      </center>
    </ProtectedRoutes>
  );
}

export default Login;
