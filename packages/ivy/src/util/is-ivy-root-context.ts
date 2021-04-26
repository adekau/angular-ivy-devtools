import { IvyRootContext } from "../types/core/ivy-root-context.type";

export function isIvyRootContext(ctx: any): ctx is IvyRootContext {
    return ctx
        && Object.prototype.hasOwnProperty.call(ctx, 'components');
}
