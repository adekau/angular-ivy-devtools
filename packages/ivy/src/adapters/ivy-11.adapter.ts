import { Ivy11Consts } from "../constants/ivy-11.const";
import { NamedObject } from "../enums/named-objects.enum";
import { findAngularRoot } from "../find-angular-root";
import { Ivy11LView, Ivy11TView } from "../types";
import { ComponentTree } from "../types/core/component-tree.type";
import { IvyAdapter } from "../types/ivy-adapter";
import { IvyConstants } from "../types/ivy-constants";
import { isIvyRootContext } from "../util";
import { namedArray } from "../util/named-object";

export class Ivy11Adapter extends IvyAdapter {
    public version = 11;

    public get consts(): IvyConstants {
        return Ivy11Consts;
    }

    public get angularRoot(): HTMLElement | undefined {
        return findAngularRoot();
    }

    public getNgContext(from: Element | undefined): Ivy11LView | undefined {
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

    public getViewChildren(from: Ivy11LView | undefined): Ivy11LView[] | undefined {
        const tView = from?.[this.consts.lView.tView];
        if (!tView || !Array.isArray(tView.components)) {
            return;
        }
        const components = tView.components.map((lViewComponentIndex) => from?.[lViewComponentIndex]);
        return components;
    }

    public getComponentTree(from: Ivy11LView | undefined, build: any = {}): ComponentTree {
        const comps = this.getViewChildren(from);
        if (!comps) {
            return build;
        }
        return namedArray(NamedObject.ComponentTree)(comps.reduce((agg, cur, i) => {
            return {
                ...agg,
                [i]: { component: cur, children: this.getComponentTree(cur) }
            };
        }, {} as ComponentTree));
    }

    public getTemplate() {
        const tView = this.getTView(this.angularRoot);
        const tpl = tView?.template;
        return tpl;
    }
}
