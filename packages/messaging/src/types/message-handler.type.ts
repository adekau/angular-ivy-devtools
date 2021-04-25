import { MessageAction } from "../enums/message-action.enum";
import { MessageRequest } from "./message-request.type";
import { MessageResponse } from "./message-response.type";

export type MessageHandler<T extends MessageAction> =
    (request: MessageRequest & { action: T }) => MessageResponse & { action: T };
