export const enum Ivy11RenderFlags {
  /* Whether to run the creation block (e.g. create elements and directives) */
  Create = 0b01,

  /* Whether to run the update block (e.g. refresh bindings) */
  Update = 0b10
};

export type Ivy11ComponentTemplate<T> = {
    <U extends T>(rf: Ivy11RenderFlags, ctx: T | U): void;
};
