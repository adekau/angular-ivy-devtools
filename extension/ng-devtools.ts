import { Ivy11Adapter } from "@ivy";
import { handleRequest, MessageAction, MessageType } from "@messaging";

window.addEventListener('message', function ({ data, origin }: MessageEvent) {
    if (data.type !== MessageType.Request) {
        return;
    }
    handleRequest(data, { origin }, (response) => postMessage(response, '*'));
});

const ivyAdapter = new Ivy11Adapter();
console.dir(ivyAdapter.angularRoot);
console.log(ivyAdapter.consts);
console.log(ivyAdapter.getIvyContext(ivyAdapter.angularRoot));

// function handleAngularInfo() {
//     const { childNodes } = document.body;
//     const els: HTMLElement[] = Array.from(childNodes)
//         .filter(node => node instanceof HTMLElement) as any;
//     const root = els.find((el) => el.getAttribute('ng-version'));
//     console.log(root);
//     if (root) {
//         postMessage({ type: 'result', action: 'angularInfo', result: { isAngular: true, version: root.getAttribute('ng-version') } }, '*');
//     } else {
//         postMessage({ type: 'result', action: 'angularInfo', result: { isAngular: false } }, '*');
//     }
// }