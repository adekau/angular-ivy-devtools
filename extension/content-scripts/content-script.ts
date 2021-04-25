import { injectScript } from "./injection";
import { v4 } from 'uuid';
import { MessageType } from "@messaging";

injectScript('ng-devtools.js', () => { });

const promiseMap: Map<string, [(resolve?: any) => void, (reject?: any) => void]> = new Map();
const sendScriptMessage = async (message: any): Promise<any> => {
    const id = v4();
    const resultPromise = new Promise((resolve, reject) => {
        promiseMap.set(id, [resolve, reject]);
        postMessage({ id, ...message }, '*');
    });
    return resultPromise;
};

window.addEventListener('message', ({ data }: any) => {
    if (data.type !== MessageType.Response) {
        return;
    }
    if (promiseMap.has(data.id)) {
        const [resolve] = promiseMap.get(data.id)!;
        resolve(data);
        promiseMap.delete(data.id);
    }
});

// window.addEventListener('ContentScriptEvent', function (event: any) {
//     const { detail } = event;
//     chrome.runtime.sendMessage({ message: { ...detail } });
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendScriptMessage(message).then(sendResponse);
    return true;
});
