import { Type } from "@angular/core";
import { IvyConstants } from "./ivy-constants";
import { IvyContext } from "./ivy-context.type";

export abstract class IvyAdapter {
    abstract get consts(): IvyConstants;
    abstract get angularRoot(): HTMLElement | undefined;
    abstract getIvyContext(from: HTMLElement | undefined): IvyContext | undefined;
    abstract getRootComponents(): Type<any>[] | undefined;
};
