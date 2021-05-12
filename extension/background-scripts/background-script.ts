import { MessageAction, MessageSource, MessageType, sendRequest } from "@messaging";
import { v4 } from 'uuid';

console.log('background!!!!');

chrome.runtime.onConnect.addListener((port) => {
    console.log('runtime connected', port);

    try {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab?.id) {
                sendRequest(tab.id, { type: MessageType.Request, action: MessageAction.GetComponentTree, source: MessageSource.BackgroundScript, originalSource: MessageSource.BackgroundScript, id: v4() }, (response) => {
                    console.log('sending', response)
                    port.postMessage(response);
                });
            }
        });
    } catch (ex) {
        console.error('uh oh', ex);
    }


    port.onMessage.addListener((msg) => {
        console.log('got', msg);
    });
});
