import { v4 } from 'uuid';
import { MessageSource } from './enums/message-source.enum';
import { MessageRequest, MessageResponse } from './types';

const promiseMap: Map<string, [(resolve?: any) => void, (reject?: any) => void]> = new Map();
let listening = false;

export async function sendScriptMessage(message: MessageRequest | MessageResponse, source: MessageSource): Promise<any> {
    const id = message.id ?? v4();
    listen();
    const resultPromise = new Promise((resolve, reject) => {
        promiseMap.set(id, [resolve, reject]);
        postMessage({ ...message, id, source }, '*');
    });
    return resultPromise;
};

const handleMessage = ({ data }: MessageEvent) => {
    if (data.source !== MessageSource.InjectedScript) {
        return;
    }
    console.debug(data, promiseMap.has(data.id));
    if (promiseMap.has(data.id)) {
        const [resolve] = promiseMap.get(data.id)!;
        resolve(data);
        promiseMap.delete(data.id);
    }
};
function listen() {
    // in case it already exists, remove the current one and re-add. So we don't end up with 5 handlers all doing the same thing.
    window.removeEventListener('message', handleMessage);
    window.addEventListener('message', handleMessage);
    listening = true;
}
