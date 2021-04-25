import { MessageAction } from "../enums/message-action.enum";
import { MessageRequest } from "./message-request.type";
import { MessageResponse } from "./message-response.type";
import { MessageSender } from "./message-sender.type";

export type MessageHandler<T extends MessageAction> =
    (
        request: MessageRequest & { action: T },
        sender: MessageSender,
        sendResponse: (response: MessageResponse & { action: T }) => void
    ) => void;
