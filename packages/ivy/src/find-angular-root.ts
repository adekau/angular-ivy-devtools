export function findAngularRoot(): HTMLElement | undefined {
    const { childNodes } = document.body;
    const els: HTMLElement[] = Array.from(childNodes)
        .filter(node => node instanceof HTMLElement) as HTMLElement[];
    return els.find((el) => el.getAttribute('ng-version'));
}
