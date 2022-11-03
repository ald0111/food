import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { email, password } from "../../functions/input/Validator";

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
        let resp = await response.json();
        console.log(resp);
        localStorage.setItem("token", resp.token);
        localStorage.setItem("name", resp.name);
        console.log("test");
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
    <center>
      <h2>Login</h2>
      <form
        onSubmit={formik.handleSubmit}
        action="/api/user/login"
        method="post"
      >
        {formik.status && <span>{formik.status.error}</span>}
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