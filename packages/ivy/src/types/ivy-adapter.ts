import { Ivy11Consts } from "../constants";
import { IvyLView } from "./core/ivy-l-view.type";
import { IvyConstants } from "./ivy-constants";

export abstract class IvyAdapter {
    abstract version: number;
    abstract get consts(): IvyConstants;
    abstract get angularRoot(): HTMLElement | undefined;
    abstract getNgContext(from: Element | undefined): IvyLView | undefined;
    abstract getComponentContext(from: Element | undefined): IvyLView[typeof Ivy11Consts.lView.context] | undefined;
    abstract getRootComponents(): {}[] | undefined;
};
