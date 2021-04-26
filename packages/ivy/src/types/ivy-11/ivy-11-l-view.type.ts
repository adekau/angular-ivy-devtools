import { Ivy11Consts } from "../../constants";
import { Ivy11RootContext } from "./ivy-11-root-context.type";

export interface Ivy11LView extends Array<any> {
    [Ivy11Consts.lView.host]: Element | null;
    [Ivy11Consts.lView.parent]: Ivy11LView | null;
    [Ivy11Consts.lView.next]: Ivy11LView | null;
    [Ivy11Consts.lView.context]: {} | Ivy11RootContext | null;
}
