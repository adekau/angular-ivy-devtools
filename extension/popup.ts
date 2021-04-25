import { MessageAction, MessageType } from "@messaging";

function DOMContentLoaded() {
    console.log('init');
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab?.id) {
            chrome.tabs.sendMessage(
                tab.id,
                { type: 'request', action: 'angularInfo' },
                (res) => {
                    console.log(res);
                    handleAngularInfoResult(res);
                });
        }
    });
}

function handleAngularInfoResult(message: any) {
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
