import { Type } from "@angular/core";
import { Ivy11Consts } from "../constants/ivy-11.const";
import { findAngularRoot } from "../find-angular-root";
import { Ivy11Context } from "../types/ivy-11/ivy-11-context.type";
import { IvyAdapter } from "../types/ivy-adapter";
import { IvyConstants } from "../types/ivy-constants";

export class Ivy11Adapter extends IvyAdapter {
    public get consts(): IvyConstants {
        return Ivy11Consts;
    }

    public get angularRoot(): HTMLElement | undefined {
        return findAngularRoot();
    }

    public getIvyContext(from: HTMLElement | undefined): Ivy11Context | undefined {
        if (!from) {
            return;
        }
        const ctx = (from as any)[this.consts.contextKey];
        if (ctx) {
            return {
                version: 11,
                ...ctx
            }
        }
    }

    public getRootComponents(): Type<any>[] | undefined {
        // return this.angularRoot[this.consts.contextKey]
        return;
    }
}
