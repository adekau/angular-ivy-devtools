export type Ivy11RootContext = {
    scheduler: (workFn: () => void) => void;
    clean: Promise<null>;
    components: {}[];
    // TODO: rest https://github.com/angular/angular/blob/73105aa7d6cf1116a6a9f103bd074f65db7584fe/packages/core/src/render3/interfaces/view.ts#L806
};
