import { MessageAction, MessageResponse, MessageSource, MessageType, sendRequest } from "@messaging";
import { v4 } from 'uuid';

function DOMContentLoaded() {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab?.id) {
            sendRequest(tab.id, {
                type: MessageType.Request,
                action: MessageAction.AngularInfo,
                source: MessageSource.Popup,
                originalSource: MessageSource.Popup,
                id: v4()
            }, handleAngularInfoResponse);
        }
    });
};

function handleAngularInfoResponse(message: MessageResponse & { action: MessageAction.AngularInfo }) {
    console.log(message);
    const span = document.getElementById('angular');
    if (!span) {
        return;
    }
    span.classList.forEach(cl => span.classList.remove(cl));
    if (message.type === MessageType.Response && message.action === MessageAction.AngularInfo && message.result.isAngular) {
        span.innerText = `Angular detected (version ${message.result.version}).`;
        span.classList.add('angular');
    } else {
        span.innerText = `Angular not detected.`;
        span.classList.add('no-angular');
    }
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded);
