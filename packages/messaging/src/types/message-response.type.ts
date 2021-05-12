import { ComponentTree } from "@ivy";
import { MessageAction } from "../enums/message-action.enum";
import { MessageSource } from "../enums/message-source.enum";
import { MessageType } from "../enums/message-type.enum";

type MessageResponseBase = {
    id: string;
    source: MessageSource,
    originalSource: MessageSource;
    type: MessageType.Response;
    action: MessageAction;
};

export type MessageResponse = MessageResponseBase & (
    | {
        action: MessageAction.AngularInfo;
        result: (
            | {
                isAngular: true;
                version: string;
            }
            | {
                isAngular: false;
            }
        );
    }
    | {
        action: MessageAction.GetComponentTree;
        result: any
    }
);
