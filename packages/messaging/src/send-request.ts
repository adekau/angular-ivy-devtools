import { MessageAction } from "./enums";
import { MessageRequest, MessageResponse } from "./types";

export function sendRequest<T extends MessageAction>(
    tabId: number,
    message: MessageRequest & { action: T },
    responseCallback?: ((response: MessageResponse & { action: T }) => void)
) {
    return chrome.tabs.sendMessage(tabId, message, responseCallback);
}
