window.addEventListener('ContentScriptEvent', function (event: any) {
    const { detail } = event;
    chrome.runtime.sendMessage({ message: { ...detail } });
});

// Listen for messages from the popup script and background page
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    console.log('got a message', request);
    // window.postMessage(request, '*');
    handleAngularInfo(sendResponse);
});

function handleAngularInfo(sendResponse: any) {
    const { childNodes } = document.body;
    const els: HTMLElement[] = Array.from(childNodes)
        .filter(node => node instanceof HTMLElement) as HTMLElement[];
    const root = els.find((el) => el.getAttribute('ng-version'));
    sendResponse({
        type: 'result',
        action: 'angularInfo',
        result: {
            isAngular: !!root,
            ...(root && { version: root.getAttribute('ng-version') })
        }
    }, '*');
}