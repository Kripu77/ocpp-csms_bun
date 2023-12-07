import { ServerWebSocket } from "bun";
import { OCPPType2Message, ActionType } from "../models";
import {
  handleBootNotification,
  handleHeartbeat,
  handleStatusNotification,
  handleAuthorize,
  handleStartTransaction,
  handleMeterValues,
  handleStopTransaction,
  handleUnknownActionType,
} from ".";

export function handleOcppMessage(
  ws: ServerWebSocket<unknown>,
  ocppMessage: OCPPType2Message
) {
  const actionType = ocppMessage[2];

  switch (actionType) {
    case ActionType.BootNotification:
      handleBootNotification(ws, ocppMessage);
      break;

    case ActionType.Heartbeat:
      handleHeartbeat(ws, ocppMessage);
      break;

    case ActionType.StatusNotification:
      handleStatusNotification(ws, ocppMessage);
      break;

    case ActionType.Authorize:
      handleAuthorize(ws, ocppMessage);
      break;

    case ActionType.StartTransaction:
      handleStartTransaction(ws, ocppMessage);
      break;

    case ActionType.MeterValues:
      handleMeterValues(ws, ocppMessage);
      break;

    case ActionType.StopTransaction:
      handleStopTransaction(ws, ocppMessage);
      break;

    default:
      handleUnknownActionType(ws, ocppMessage);
      break;
  }
}
