import { MessageAction } from "../enums/message-action.enum";
import { MessageType } from "../enums/message-type.enum";

type MessageRequestBase = {
    type: MessageType.Request;
    action: MessageAction;
};

export type MessageRequest = MessageRequestBase & (
    | {
        action: MessageAction.AngularInfo;
    }
);
