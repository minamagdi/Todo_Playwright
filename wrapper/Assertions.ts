import { expect, Locator, Page } from "@playwright/test";

export default class Assertions {
    async assertElementHasText(element: Locator, expectedText: string) {
        // const actualText = await element.haveText();
        expect(element).toHaveText(expectedText);
    }

    async assertElementIsVisible(element: Locator) {
        expect(element).toBeVisible();
    }

    async assertElementIsEnabled(element: Locator) {
        expect(element).toBeEnabled();
    }

    async assertPageURLContains(page: Page, expectedSubstring: string) {
        expect(page).toHaveURL(new RegExp(expectedSubstring));
    }
}