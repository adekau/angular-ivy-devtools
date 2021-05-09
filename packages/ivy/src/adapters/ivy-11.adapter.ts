import { TemplateRef } from "@angular/core";
import { Ivy11Consts } from "../constants/ivy-11.const";
import { NamedArray } from "../enums/named-array.enum";
import { findAngularRoot } from "../find-angular-root";
import { Ivy11LView, Ivy11TView } from "../types";
import { Ivy11LContainer } from "../types/ivy-11/ivy-11-l-container.type";
import { IvyAdapter } from "../types/ivy-adapter";
import { IvyConstants } from "../types/ivy-constants";
import { isIvyRootContext, isLContainer } from "../util";
import { namedArray } from "../util/named-array";

export class Ivy11Adapter extends IvyAdapter {
    public version = 11;

    public get consts(): IvyConstants {
        return Ivy11Consts;
    }

    public get angularRoot(): HTMLElement | undefined {
        return findAngularRoot();
    }

    public getNgContext(from: Element | {} | undefined): Ivy11LView | undefined {
        if (!from) {
            return;
        }
        const lView = (from as any)[this.consts.contextKey] as Ivy11LView;
        return lView;
    }

    public getComponentContext(from: Element | undefined): Ivy11LView[typeof Ivy11Consts.lView.context] | undefined {
        if (!from) {
            return;
        }
        const lView = this.getNgContext(from);
        return lView?.[this.consts.lView.context];
    }

    public getRootComponents(): {}[] | undefined {
        const ctx = this.getComponentContext(this.angularRoot);
        if (isIvyRootContext(ctx)) {
            return ctx?.components;
        }
    }

    public getTView(from: Element | undefined): Ivy11TView | undefined {
        const ctx = this.getNgContext(from);
        return ctx?.[this.consts.lView.tView];
    }

    public iterateViewChildren(lView: Ivy11LView, handleChild?: (child: Ivy11LView, dynamic: boolean) => void): void {
        const childHead = lView[this.consts.lView.childHead];
        const childTail = lView[this.consts.lView.childTail];
        const headIndex = this.getIndex(childHead);
        const tailIndex = this.getIndex(childTail);
        if (!headIndex || !tailIndex) {
            return;
        }
        for (let i = headIndex; i <= tailIndex; i++) {
            const child = lView[i];
            if (isLContainer(child, this.consts)) {
                for (let j = this.consts.lContainer.containerHeaderOffset; j < child.length; j++) {
                    handleChild?.(child[j], true);
                }
            } else {
                if (lView[i].__proto__?.constructor?.name === 'TemplateRef') {
                    // templaterefs don't contain much information
                    continue;
                }
                handleChild?.(lView[i], false);
            }
        }
    }

    public patchTemplate(tView: Ivy11TView): void {
        const tpl = tView.template;
        if (tpl && !tpl[this.consts.patchedTemplateKey]) {
            tView.template = (rf, ctx) => {
                // console.log('TEMPLATE UPDATED!!!!', tpl.name);
                console.log(this.makeTree(this.getNgContext(this.angularRoot)!));
                tpl(rf, ctx);
            };
            tView.template[this.consts.patchedTemplateKey] = true;
        }
    }

    private getIndex(of: Ivy11LView | Ivy11LContainer | null): number | undefined {
        if (of == null) {
            return;
        }
        const tHost = of[this.consts.lView.tHost];
        return tHost.index;
    }

    public makeTree(lView: Ivy11LView, parent?: any) {
        const initial = this.newTreeItem(lView, parent);
        const children: any[] = namedArray(NamedArray.TreeItemChildren)();

        this.iterateViewChildren(lView, (vc, dynamic) => {
            const child = this.makeTree(vc, initial);
            child.dynamic = dynamic;
            children.push(child);
            this.patchTemplate(vc[this.consts.lView.tView]);
        });

        initial.children = children;
        initial.next = lView[this.consts.lView.next];
        return initial;
    }

    public getTemplate() {
        const tView = this.getTView(this.angularRoot);
        const tpl = tView?.template;
        return tpl;
    }

    private newTreeItem(lView: Ivy11LView, parent: any) {
        return {
            lView,
            parent,
            children: [] as any[],
            next: undefined as any,
            dynamic: false
        };
    }
}
