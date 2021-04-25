import { MessageAction } from "../enums/message-action.enum";
import { MessageType } from "../enums/message-type.enum";
import { MessageHandlers } from "../types/message-handlers.type";

export const messageHandlers: MessageHandlers = {
    [MessageAction.AngularInfo]: (request) => {
        return { type: MessageType.Response, action: MessageAction.AngularInfo, result: { isAngular: true, version: '12' } };
    }
};
