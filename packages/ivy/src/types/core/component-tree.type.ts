import { IvyLView } from "./ivy-l-view.type";

export type ComponentTree = {
    component: IvyLView;
    children: ComponentTree;
};
