import { Ivy11Consts } from "../constants/ivy-11.const";
import { findAngularRoot } from "../find-angular-root";
import { Ivy11LView, Ivy11RootContext } from "../types";
import { IvyAdapter } from "../types/ivy-adapter";
import { IvyConstants } from "../types/ivy-constants";

export class Ivy11Adapter extends IvyAdapter {
    public get consts(): IvyConstants {
        return Ivy11Consts;
    }

    public get angularRoot(): HTMLElement | undefined {
        return findAngularRoot();
    }

    public getNgContext(from: HTMLElement | undefined): Ivy11LView | undefined {
        if (!from) {
            return;
        }
        const lView = (from as any)[this.consts.contextKey] as Ivy11LView;
        return lView;
    }

    public getComponentContext(from: HTMLElement | undefined): Ivy11RootContext | undefined {
        if (!from) {
            return;
        }
        const lView = this.getNgContext(from);
        const ctx = lView?.[this.consts.lView.context];
        if (ctx && Object.keys(ctx).length) {
            return ctx as Ivy11RootContext;
        }
    }

    public getRootComponents(): {}[] | undefined {
        const ctx = this.getComponentContext(this.angularRoot);
        return ctx?.components;
    }
}
