import { Ivy11ComponentTemplate } from "./ivy-11-component-template.type";
import { Ivy11LView } from "./ivy-11-l-view.type";

export const enum Ivy11TViewType {
    Root = 0,
    Component = 1,
    Embedded = 2
};

export const Ivy11TViewTypeAsString = [
    'Root',
    'Component',
    'Embedded'
] as const;

export type Ivy11TView = {
    type: Ivy11TViewType;
    blueprint: Ivy11LView;
    template: Ivy11ComponentTemplate<{}> | null;
    firstCreatePass: boolean;
    firstUpdatePass: boolean;
    firstChild: any;
    bindingStartIndex: number;
    expandoStartIndex: number;
    staticViewQueries: boolean;
    components: number[] | null;
    incompleteFirstPass: boolean;
};
