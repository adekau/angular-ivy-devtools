export type Ivy11RNode = {
    parentNode: Ivy11RNode | null;
    parentElement: Ivy11RElement | null;
    nextSibling: Ivy11RNode | null;
    removeChild(oldChild: Ivy11RNode): Ivy11RNode;
    insertBefore(newChild: Ivy11RNode, refChild: Ivy11RNode | null, isViewRoot: boolean): void;
    appendChild(newChild: Ivy11RNode): Ivy11RNode;
};

export type Ivy11RElement = Ivy11RNode & {
    style: Ivy11RCssStyleDeclaration;
    classList: Ivy11RDomTokenList;
    className: string;
    textContent: string | null;
    setAttribute(name: string, value: string): void;
    removeAttribute(name: string): void;
    setAttributeNS(
        namespaceURI: string, qualifiedName: string,
        value: string): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
    removeEventListener(type: string, listener?: EventListener, options?: boolean): void;
    setProperty?(name: string, value: any): void;
};

export type Ivy11RCssStyleDeclaration = {
    removeProperty(propertyName: string): string;
    setProperty(propertyName: string, value: string | null, priority?: string): void;
};

export type Ivy11RDomTokenList = {
    add(token: string): void;
    remove(token: string): void;
};

export type Ivy11RText = Ivy11RNode & {
    textContent: string | null;
};

export type Ivy11RComment = Ivy11RNode & {
    textContent: string | null;
};
