import { Ivy11Consts } from "../../constants";
import { Ivy11LView } from "./ivy-11-l-view.type";
import { Ivy11RComment, Ivy11RElement } from "./ivy-11-r-node.type";

export interface Ivy11LContainer extends Array<any> {
    readonly [Ivy11Consts.lView.host]: Ivy11RElement | Ivy11RComment | Ivy11LView;
    [Ivy11Consts.lContainer.type]: true;
    [Ivy11Consts.lContainer.hasTransplantedViews]: boolean;
    [Ivy11Consts.lView.parent]: Ivy11LView;
    [Ivy11Consts.lView.next]: Ivy11LView | Ivy11LContainer | null;
    [Ivy11Consts.lView.transplantedViewsToRefresh]: number;
    [Ivy11Consts.lContainer.movedViews]: Ivy11LView[] | null;
    [Ivy11Consts.lView.tHost]: any; /* TODO: Ivy11TNode */
    readonly [Ivy11Consts.lContainer.native]: Ivy11RComment;
    [Ivy11Consts.lContainer.viewRefs]: unknown[] | null;
}
