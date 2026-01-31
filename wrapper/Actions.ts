import { Page, Locator } from "@playwright/test";

export default class Actions {
    
    async click(element: Locator) {
        await element.click();
    }

    /**
     * Fills the specified input element with the provided value.
     *
     * @param element - The Playwright Locator representing the input element to fill.
     * @param value - The string value to enter into the input element.
     * @returns A promise that resolves when the fill action has completed.
     *
     * @example
     * ```typescript
     * const actions = new Actions();
     * await actions.fill(page.locator('#username'), 'myUsername');
     * ```
     */
    async fill(element: Locator, value: string) {
        return await element.fill(value);
    }

    async getText(element: Locator): Promise<string> {
        return await element.innerText();
    }

}