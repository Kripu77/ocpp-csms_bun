import { handleOcppMessage } from "./handlers";

Bun.serve({
  port: 3001,
  fetch(req, server) {
    if (server.upgrade(req)) {
      console.log("Upgrade");
      return;
    }
    return new Response("Upgrde failed!", { status: 500 });
  },
  websocket: {
    message(ws, message) {
      console.log("Message", message);
      const ocppMessage = JSON.parse(message as string);
      handleOcppMessage(ws, ocppMessage);
    },
    open(ws) {
      console.log("Open");
    }, // a socket is opened
    close(ws, code, message) {
      console.log("Close", code, message);
    }, // a socket is closed
    drain(ws) {
      console.log("Drain", ws);
    }, // the socket is ready to receive more data
  },
});
