import { IvyConstants } from "../types";
import { IvyLContainer } from "../types/core/ivy-l-container.type";

export function isLContainer(v: any, consts: IvyConstants): v is IvyLContainer {
    switch (consts.version) {
        case 11:
            return v && v[consts.lContainer.type];
        default:
            throw new Error(`Unknown constants version ${consts.version}`);
    }
}