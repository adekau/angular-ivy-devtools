import { MessageAction } from "../enums/message-action.enum";
import { MessageHandler } from "./message-handler.type";

export type MessageHandlers = {
    [k in MessageAction]: MessageHandler<k>
};
