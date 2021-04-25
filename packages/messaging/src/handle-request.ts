import { MessageType } from "./enums";
import { messageHandlers } from "./handlers";
import { MessageRequest } from "./types";

export function handleRequest(request: MessageRequest, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
    const { type, action } = request;
    if (type !== MessageType.Request) {
        throw new Error(`Error attempting to handle request: expected Request got ${type}`);
    }
    console.debug('handleRequest', request);
    const handler = messageHandlers[action];
    handler(request, sender, sendResponse);
}
