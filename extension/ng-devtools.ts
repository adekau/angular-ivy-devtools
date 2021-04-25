// console.log('ready');
// window.addEventListener('message', function ({ data }: any) {
//     if (data.type === 'request' && data.action === 'angularInfo') {
//         handleAngularInfo();
//     }
// });

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