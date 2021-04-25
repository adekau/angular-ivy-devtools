console.log('background!!!!');

chrome.runtime.onConnect.addListener((port) => {
    console.log('runtime connected', port);

    port.postMessage('hello!');
});
