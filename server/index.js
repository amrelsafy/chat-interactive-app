import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log("Hello World");

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);

    let parsedData = JSON.parse(data);

    let newResponse = {
      response: true,
      message: "Hello from WebSocket"
    }

    let newData = {
      ...parsedData,
      messages: [...parsedData.messages, newResponse]
    }
    ws.send(JSON.stringify(newData));
  });

});