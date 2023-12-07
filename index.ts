import { ActionType } from "./models/ActionType";
import { generateRandomNumber } from "./utils";

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
      const id = ocppMessage[1];
      const actionType = ocppMessage[2];

      if (actionType === ActionType.BootNotification) {
        //send the Accepted response
        console.info(
          `BootNotification request accepted for ${ocppMessage[3].chargePointSerialNumber}`
        );

        ws.send(
          JSON.stringify([
            3,
            ocppMessage[1],
            {
              status: "Accepted",
              currentTime: new Date().toISOString(),
              interval: 300,
            },
          ])
        );
      }

      //handle heartbeat

      if (actionType === ActionType.Heartbeat) {
        ws.send(
          JSON.stringify([
            3,
            ocppMessage[1],
            { currentTime: new Date().toISOString() },
          ])
        );
      }

      //handle statusnotification
      if (actionType === ActionType.StatusNotification) {
        ws.send(JSON.stringify([3, ocppMessage[1], {}]));
      }

      //handle authorize request from a charger

      if (actionType === ActionType.Authorize) {
        ws.send(
          JSON.stringify([
            3,
            ocppMessage[1],
            {
              idTagInfo: {
                status: "Accepted",
              },
            },
          ])
        );
      }
      //handle starttransaction request from a charger
      if (actionType === ActionType.StartTransaction) {
        ws.send(
          JSON.stringify([
            3,
            ocppMessage[1],
            {
              transactionId: generateRandomNumber(),
              idTagInfo: {
                status: "Accepted",
              },
            },
          ])
        );
      }
      //handle MeterValues request from a charger
      if (actionType === ActionType.MeterValues) {
        console.info({ meterValues: ocppMessage });
        ws.send(JSON.stringify([3, ocppMessage[1], {}]));
      }
      //handle stoptransaction request from a charger
      if (actionType === ActionType.StopTransaction) {
        ws.send(
          JSON.stringify([
            3,
            ocppMessage[1],
            {
              idTagInfo: {
                status: "Accepted",
              },
            },
          ])
        );
      }
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
