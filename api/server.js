const express = require("express");
const dotenv = require("dotenv");
const addWsToServer = require("./webSocket");

class Server {
  constructor() {
    dotenv.config();
    this.app = express();
    this.port = 8000; // Loaded from .env file
    this.paths = {
      api: "/api",
      //   test: "/api/test",
      //   homepage: "/api/homepage",
    };

    // this.middlewares();
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );

    this.routes();
    // this.server;
  }

  //   middlewares() {
  //     this.app.use(cors()); // Enable CORS
  //   }

  // Bind controllers to routes
  routes() {
    this.app.use(this.paths.api, require("./router"));
    // this.app.use(this.paths.homepage, require("../routes/homepage"));
  }

  listen() {
    const server = this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
    addWsToServer(server);
  }
}

module.exports = Server;
