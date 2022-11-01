import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { email, password } from "../input/Validator";

const validate = (values) => {
  let errors = {};

  email(values.email, errors);
  password(values.password, errors);
  // console.log(values.email, errors);
  return errors;
};

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      loginHandler(values);
    },
  });
  const loginHandler = async (values) => {
    let jsonBody = JSON.stringify({
      email: values.email,
      password: values.password,
    });
    let req = fetch("/api/user/login", {
      method: "post",
      body: jsonBody,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await req);
  };
  return (
    <center>
      <h2>Login</h2>
      <form
        onSubmit={formik.handleSubmit}
        action="/api/user/login"
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
          {formik.touched.email && formik.errors.email && (
            <>
              <br></br>
              <span>{formik.errors.email}</span>
            </>
          )}
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
          <input type="submit" value="Login" />
        </div>
      </form>
      <div>
        <Link to="/user/register">Register here</Link>
      </div>
    </center>
  );
}

export default Login;
