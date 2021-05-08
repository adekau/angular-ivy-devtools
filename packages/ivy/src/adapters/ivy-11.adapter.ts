import { Ivy11Consts } from "../constants/ivy-11.const";
import { findAngularRoot } from "../find-angular-root";
import { Ivy11LView, Ivy11RootContext, Ivy11TView } from "../types";
import { ComponentTree } from "../types/core/component-tree.type";
import { Ivy11LContainer } from "../types/ivy-11/ivy-11-l-container.type";
import { IvyAdapter } from "../types/ivy-adapter";
import { IvyConstants } from "../types/ivy-constants";
import { isIvyRootContext, isLContainer } from "../util";

export class Ivy11Adapter extends IvyAdapter {
    public version = 11;

    public get consts(): IvyConstants {
        return Ivy11Consts;
    }

    public get angularRoot(): HTMLElement | undefined {
        return findAngularRoot();
    }

    public getNgContext(from: Element | {} | undefined): Ivy11LView | undefined {
        if (!from) {
            return;
        }
        const lView = (from as any)[this.consts.contextKey] as Ivy11LView;
        return lView;
    }

    public getComponentContext(from: Element | undefined): Ivy11LView[typeof Ivy11Consts.lView.context] | undefined {
        if (!from) {
            return;
        }
        const lView = this.getNgContext(from);
        return lView?.[this.consts.lView.context];
    }

    public getRootComponents(): {}[] | undefined {
        const ctx = this.getComponentContext(this.angularRoot);
        if (isIvyRootContext(ctx)) {
            return ctx?.components;
        }
    }

    public getTView(from: Element | undefined): Ivy11TView | undefined {
        const ctx = this.getNgContext(from);
        return ctx?.[this.consts.lView.tView];
    }

    // public getViewChildren(from: Ivy11LView | undefined): Ivy11LView[] | undefined {
    //     const tView = from?.[this.consts.lView.tView];
    //     if (!tView || !Array.isArray(tView.components)) {
    //         return;
    //     }
    //     const components = tView.components.map((lViewComponentIndex) => from?.[lViewComponentIndex]);
    //     return components;
    // }

    public getViewChildren(lView: Ivy11LView, handleChild?: (child: Ivy11LView) => void): Ivy11LView[] {
        const tView = lView[this.consts.lView.tView];
        const ret = [];
        if (tView.components) {
            for (let i = 0; i < tView.components.length; i++) {
                const childView = lView[tView.components[i]];
                const childLView = isLContainer(childView, this.consts) ? childView[this.consts.lView.host] : childView;
                handleChild && handleChild(childLView);
                ret.push(childLView);
            }
        }
        return ret;
    }

    public traverseTree(addItem: (treeItem: any, parentItem: any) => void, accumulator?: any) {
        const traverseTree = (lView: Ivy11LView, isRoot: boolean, parent?: any) => {
            const item = { lView, isRoot, parentItem: parent };
            if (lView[this.consts.lView.host] && !isRoot) {
                addItem(item, parent);
            }

            this.getDynamicViewChildren(lView);

            this.getViewChildren(lView, (child) => traverseTree(child, false, item.lView[this.consts.lView.host] ? item : parent));
        }
        return traverseTree;
    }

    public getDynamicViewChildren(lView: Ivy11LView, next?: Ivy11LContainer, nextRef?: number): any {
        // const tview = from?.[this.consts.lView.tView];
        // const child = tview?.firstChild;
        // const children = [];
        // let z = child.child ? child.child : child;
        // while (z.next) {
        //     children.push(from?.[z.next.index]);
        //     z = z.next;
        // }
        // return children;
        for (let container: Ivy11LContainer | Ivy11LView | null = next ?? lView[this.consts.lView.childHead]; container != null; container = container[this.consts.lView.next]) {
            if (isLContainer(container, this.consts)) {
                console.log(container);
                for (let i = nextRef ?? this.consts.lContainer.containerHeaderOffset; i < container.length; i++) {
                    const dynamicViewData = container[i];
                    console.log({ dynamicViewData, last: i >= container.length, cur: i, next: container[this.consts.lView.next]})
                }
            }
        }
    }

    // public getRootComponentTree(): ComponentTree {
    // const root = this.getNgContext(this.angularRoot);
    // const head = root?.[this.consts.lView.childHead];
    // console.log(head);
    // this.getComponentTree(head);
    // return {} as any;
    // }

    // public getComponentTree(from: Ivy11LView | undefined, build: any = {}): ComponentTree {
    // const comps = this.getViewChildren(from);
    // if (!comps) {
    //     return build;
    // }
    // return comps.reduce((agg, cur, i) => {
    //     return {
    //         ...agg,
    //         [i]: { component: cur, children: this.getComponentTree(cur) }
    //     };
    // }, {} as ComponentTree);

    // const head = from?.[this.consts.lView.childHead];
    // const tail = from?.[this.consts.lView.childTail];
    // if (head || tail) {
    //     return {
    //         ...build,
    //         [0]: { head, tail, headChild: this.getComponentTree(head), tailChild: this.getComponentTree(tail) }
    //     }
    // } else {
    //     return build;
    // }
    // const comps = this.getDynamicViewChildren(from);
    // console.log(comps);
    // return {} as any;
    // }

    public getTemplate() {
        const tView = this.getTView(this.angularRoot);
        const tpl = tView?.template;
        return tpl;
    }
}
