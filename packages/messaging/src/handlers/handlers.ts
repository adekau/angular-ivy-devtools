import { findAngularRoot } from "@ivy";
import { MessageType } from "../enums";
import { MessageAction } from "../enums/message-action.enum";
import { MessageHandlers } from "../types/message-handlers.type";

export const messageHandlers: MessageHandlers = {
    [MessageAction.AngularInfo]: (request, sender, sendResponse) => {
        const root = findAngularRoot();
        const version = root?.getAttribute('ng-version');
        if (!version) {
            sendResponse({
                id: request.id,
                source: request.source,
                originalSource: request.originalSource,
                type: MessageType.Response,
                action: MessageAction.AngularInfo,
                result: {
                    isAngular: false
                }
            });
        } else {
            sendResponse({
                id: request.id,
                source: request.source,
                originalSource: request.originalSource,
                type: MessageType.Response,
                action: MessageAction.AngularInfo,
                result: {
                    isAngular: true,
                    version
                }
            });
        }
    }
};
