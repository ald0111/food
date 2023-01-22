const Server = require("./server");
const { parse } = require("url");
const { WebSocketServer } = require("ws");

//init express server
const server = new Server();
const serv = server.listen();

//attaches wss to express' server
const wss = new WebSocketServer({ noServer: true });
serv.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  //listen to requests only on /ws
  if (pathname === "/ws") {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      //on connection
      wss.emit("connection", ws, request);
      console.log("good ws!");
      //on message
      ws.on("message", function message(data) {
        console.log("received: %s", data);
      });

      ws.send("something");
    });
  }
  // else if (pathname === '/bar') {
  //   wss2.handleUpgrade(request, socket, head, function done(ws) {
  //     wss2.emit('connection', ws, request);
  //   });
  // }
  else {
    socket.destroy();
  }
});
