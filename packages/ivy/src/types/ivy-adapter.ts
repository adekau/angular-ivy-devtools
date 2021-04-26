import { Type } from "@angular/core";
import { Ivy11Consts } from "../constants";
import { IvyLView } from "./core/ivy-l-view.type";
import { IvyRootContext } from "./core/ivy-root-context.type";
import { IvyConstants } from "./ivy-constants";

export abstract class IvyAdapter {
    abstract get consts(): IvyConstants;
    abstract get angularRoot(): HTMLElement | undefined;
    abstract getNgContext(from: HTMLElement | undefined): IvyLView | undefined;
    abstract getComponentContext(from: HTMLElement | undefined): IvyLView[typeof Ivy11Consts.lView.context] | undefined;
    abstract getRootComponents(): {}[] | undefined;
};
