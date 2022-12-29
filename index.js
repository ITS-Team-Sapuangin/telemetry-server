// Importing the required modules
const WebSocketServer = require("ws");

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 });

// Creating connection using websocket
wss.on("connection", (ws) => {
  console.log("new client connected");
  // sending message
  ws.on("message", (data) => {
    // console.log(`Client has sent us: ${data}`);
    // console.log(`${data}`);
    var recData = JSON.parse(`${data}`, "message");
    console.log(recData.message);
    // wss.broadcast("JSON.stringify(data.message)");
    wss.clients.forEach((client) => {
      //send the client the current message
      client.send(recData.message);
    });
  });
  // handling what to do when clients disconnects from server
  ws.on("close", () => {
    console.log("the client has Disconected");
  });
  // handling client connection error
  ws.onerror = function () {
    console.log("Some Error occurred");
  };
});

wss.broadcast = function broadcast(msg) {
  console.log(msg);
  wss.clients.forEach(function each(client) {
    client.send(msg);
  });
};

console.log("The WebSocket server is running on port 8080");
