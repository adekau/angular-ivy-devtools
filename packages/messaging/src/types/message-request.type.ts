import { MessageAction } from "../enums/message-action.enum";
import { MessageSource } from "../enums/message-source.enum";
import { MessageType } from "../enums/message-type.enum";

type MessageRequestBase = {
    id: string;
    source: MessageSource;
    originalSource: MessageSource;
    type: MessageType.Request;
    action: MessageAction;
};

export type MessageRequest = MessageRequestBase & (
    | {
        action: MessageAction.AngularInfo;
    }
    | {
        action: MessageAction.GetComponentTree;
    }
);
