import { handleRequest } from "@messaging";

window.addEventListener('ContentScriptEvent', function (event: any) {
    const { detail } = event;
    chrome.runtime.sendMessage({ message: { ...detail } });
});

// Listen for messages from the popup script and background page
chrome.runtime.onMessage.addListener(handleRequest);
