// import { sendScriptMessage } from "@messaging";
import { MessageSource, sendScriptMessage } from "@messaging";
import { injectScript } from "./injection";

injectScript('ng-devtools.js', () => { });

// window.addEventListener('ContentScriptEvent', function (event: any) {
//     const { detail } = event;
//     chrome.runtime.sendMessage({ message: { ...detail } });
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendScriptMessage(message, MessageSource.ContentScript).then(sendResponse);

    // needed to keep connection open for sendResponse 
    return true;
});
