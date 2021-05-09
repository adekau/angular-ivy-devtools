import { NamedArray } from "../enums/named-array.enum";

export function namedArray(name: NamedArray) {
    if (typeof (window as any).ngDevMode === 'undefined') {
        return (obj: any) => obj;
    }
    const body = `(function anonymous() { return class ${name} extends Array{}; })`;
    const fn = eval(body) as Function;
    const c = fn();
    return (...arr: any[]) => (console.log(arr), new c(...arr));
}
