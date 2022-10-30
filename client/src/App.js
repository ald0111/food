import logo from "./logo.svg";
import "./App.css";

function App() {
  const loginHandler = async (event) => {
    event.preventDefault();
    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;
    let jsonBody = JSON.stringify({ email: email, password: password });
    let req = fetch("/post", {
      method: "post",
      body: jsonBody,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await req);
  };

  return (
    <div className="App">
      <header className="App-header">
        <center>
          <h2>Login</h2>
          <form onSubmit={loginHandler} action="/api/user/login" method="post">
            <div>
              <input type="email" placeholder="Email" name="email" id="email" />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Passowrd"
                id="password"
              />
            </div>
            <div>
              <input type="submit" value="Login" />
            </div>
          </form>
        </center>
      </header>
    </div>
  );
}

export default App;
