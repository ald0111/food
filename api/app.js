const Server = require("./server");
const { parse } = require("url");
const { WebSocketServer } = require("ws");

//init express server
const server = new Server();
server.listen();

// const sendData = async (ws, data) => {
//   ws.send(data);
// };
// //attaches wss to express' server
// const wss = new WebSocketServer({ noServer: true });
// serv.on("upgrade", function upgrade(request, socket, head) {
//   const { pathname } = parse(request.url);

//   //listen to requests only on /ws
//   if (pathname === "/ws") {
//     wss.handleUpgrade(request, socket, head, function done(ws) {
//       //on connection
//       wss.emit("connection", ws, request);
//       console.log("good ws!");
//       //on message
//       ws.on("message", function message(data) {
//         let jsonData = JSON.stringify(`received: ${data}`);
//         console.log(jsonData);
//         sendData(ws, jsonData);
//       });

//       ws.send(JSON.stringify("something"));
//     });
//   }
//   // else if (pathname === '/bar') {
//   //   wss2.handleUpgrade(request, socket, head, function done(ws) {
//   //     wss2.emit('connection', ws, request);
//   //   });
//   // }
//   else {
//     socket.destroy();
//   }
// });
