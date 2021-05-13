import { MessageType } from "./enums";
import { messageHandlers } from "./handlers";
import { MessageRequest } from "./types";
import { MessageSender } from "./types/message-sender.type";

export function handleRequest(
    request: MessageRequest,
    sender: MessageSender,
    sendResponse: (response?: any) => void
): void {
    const { type, action } = request;
    if (type !== MessageType.Request) {
        throw new Error(`Error attempting to handle request: expected Request got ${type}`);
    }
    console.debug('handleRequest', request);
    const handler = messageHandlers[action];
    handler(request as any, sender, sendResponse);
}
