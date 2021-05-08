import { Ivy11Adapter, Ivy11LView, Ivy11RenderFlags, Ivy11TView } from "@ivy";
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
// function getComponents({ tv, lv }: { tv?: Ivy11TView, lv?: Ivy11LView }): any {
//     const components = tv?.components;
//     if (!components?.length) {
//         return [];
//     }
//     const m = components.map(cidx => lv?.[cidx]).filter(x => x != null);
//     let ret;
//     m.forEach((cmp: Ivy11LView) => ret = m.concat(getComponents({ lv: cmp, tv: cmp[ivyAdapter.consts.lView.tView]})));
//     return ret;
// }
// const c = getComponents({ lv: rootLView, tv: rootTView });
// console.log(c);
// const origTemplate = c[1][1].template;
// c[1]![1]!.template = (rf: any, ctx: any) => {
//     origTemplate(rf, ctx);
//     console.log('running template!', rf, ctx);
//     console.log('isCreate', Boolean(rf & Ivy11RenderFlags.Create));
//     console.log('isUpdate', Boolean(rf & Ivy11RenderFlags.Update));
// };
console.log(ivyAdapter.getViewChildren(rootLView));
console.log(ivyAdapter.getComponentTree(ivyAdapter.getNgContext(ivyAdapter.angularRoot)));
console.log('-------------------------------');

console.log(ivyAdapter.getTemplate());

const el = document.getElementsByTagName('app-test').item(0) as HTMLElement ?? undefined;
console.log(ivyAdapter.getNgContext(el));
const lview = (ivyAdapter.getNgContext(el));
console.log(ivyAdapter.getComponentTree(lview as any));
