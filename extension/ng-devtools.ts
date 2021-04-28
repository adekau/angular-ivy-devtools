import { Ivy11Adapter, Ivy11LView, Ivy11TView } from "@ivy";
import { handleRequest, MessageSource, MessageType } from "@messaging";

window.addEventListener('message', function ({ data, origin }: MessageEvent) {
    if (data.type !== MessageType.Request) {
        return;
    }
    handleRequest(data, { origin }, (response) => postMessage({ ...response, source: MessageSource.InjectedScript }, '*'));
});

const ivyAdapter = new Ivy11Adapter();
console.dir(ivyAdapter.angularRoot);
console.log(ivyAdapter.consts);
const rootLView = ivyAdapter.getNgContext(ivyAdapter.angularRoot);
console.log(rootLView);
console.log(ivyAdapter.getRootComponents());
const rootTView = ivyAdapter.getTView(ivyAdapter.angularRoot);

console.log('-------------------------------');
function getComponents({ tv, lv }: { tv?: Ivy11TView, lv?: Ivy11LView }): any {
    const components = tv?.components;
    if (!components?.length) {
        return [];
    }
    const m = components.map(cidx => lv?.[cidx]).filter(x => x != null);
    let ret;
    m.forEach((cmp: Ivy11LView) => ret = m.concat(getComponents({ lv: cmp, tv: cmp[ivyAdapter.consts.lView.tView]})));
    return ret;
}
console.log(getComponents({ lv: rootLView, tv: rootTView }));
console.log('-------------------------------');

console.log(ivyAdapter.getTemplate());

const el = document.getElementsByTagName('app-test').item(0) as HTMLElement ?? undefined;
console.log(ivyAdapter.getNgContext(el));
console.log(ivyAdapter.getComponentContext(el));
