import { ActionType } from "../models/ActionType";
import { ServerWebSocket } from "bun";
import { generateRandomNumber } from "../utils";
import { OCPPType2Message } from "../models";

function sendOcppResponse(
  ws: ServerWebSocket<unknown>,
  messageType: string,
  chargePointId: string,
  responseData = {}
) {
  const responseMessage = [3, chargePointId, responseData];
  ws.send(JSON.stringify(responseMessage));
}

export function handleBootNotification(
  ws: ServerWebSocket<unknown>,
  ocppMessage: OCPPType2Message
) {
  console.info(
    `BootNotification request accepted for ${ocppMessage[3].chargePointSerialNumber}`
  );

  const responseData = {
    status: "Accepted",
    currentTime: new Date().toISOString(),
    interval: 300,
  };

  sendOcppResponse(
    ws,
    ActionType.BootNotification,
    ocppMessage[1],
    responseData
  );
}

export function handleHeartbeat(
  ws: ServerWebSocket<unknown>,
  ocppMessage: OCPPType2Message
) {
  const responseData = {
    currentTime: new Date().toISOString(),
  };

  sendOcppResponse(ws, ActionType.Heartbeat, ocppMessage[1], responseData);
}

export function handleStatusNotification(
  ws: ServerWebSocket<unknown>,
  ocppMessage: OCPPType2Message
) {
  sendOcppResponse(ws, ActionType.StatusNotification, ocppMessage[1]);
}

export function handleAuthorize(
  ws: ServerWebSocket<unknown>,
  ocppMessage: OCPPType2Message
) {
  const responseData = {
    idTagInfo: {
      status: "Accepted",
    },
  };

  sendOcppResponse(ws, ActionType.Authorize, ocppMessage[1], responseData);
}

export function handleStartTransaction(
  ws: ServerWebSocket<unknown>,
  ocppMessage: OCPPType2Message
) {
  const responseData = {
    transactionId: generateRandomNumber(),
    idTagInfo: {
      status: "Accepted",
    },
  };

  sendOcppResponse(
    ws,
    ActionType.StartTransaction,
    ocppMessage[1],
    responseData
  );
}

export function handleMeterValues(
  ws: ServerWebSocket<unknown>,
  ocppMessage: OCPPType2Message
) {
  console.info({ meterValues: ocppMessage });
  sendOcppResponse(ws, ActionType.MeterValues, ocppMessage[1]);
}

export function handleStopTransaction(
  ws: ServerWebSocket<unknown>,
  ocppMessage: OCPPType2Message
) {
  const responseData = {
    idTagInfo: {
      status: "Accepted",
    },
  };

  sendOcppResponse(
    ws,
    ActionType.StopTransaction,
    ocppMessage[1],
    responseData
  );
}

export function handleUnknownActionType(
  ws: ServerWebSocket<unknown>,
  ocppMessage: OCPPType2Message
) {
  const responseData = {
    error: "Unknown action type",
  };

  sendOcppResponse(ws, ActionType.Unknown, ocppMessage[1], responseData);
}
