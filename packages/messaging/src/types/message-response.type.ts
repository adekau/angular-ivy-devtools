import { MessageAction } from "../enums/message-action.enum";
import { MessageType } from "../enums/message-type.enum";

type MessageResponseBase = {
    id: string;
    type: MessageType.Response;
    action: MessageAction;
};

export type MessageResponse = MessageResponseBase & (
    | {
        action: MessageAction.AngularInfo,
        result: (
            | {
                isAngular: true;
                version: string;
            }
            | {
                isAngular: false;
            }
        )
    }
);
