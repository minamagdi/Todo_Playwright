import { Page } from "@playwright/test";
import Assertions from "../wrapper/Assertions";


export default class TodoPage {
    private page: Page;
    private assertions = new Assertions();

    constructor(page: Page){
        this.page = page;
    }

    // Elements

    private get welcomeMessage () {
        return this.page.locator('[data-testid="welcome"]');
    }


    // Actions



    // Assertions
    async assertTodoPageURLHasText(text: string) {
        await this.assertions.assertPageURLContains(this.page, text);
    }
    async isWelcomeMessageVisible() {
        await this.page.waitForLoadState('networkidle')
        await this.assertions.assertElementIsVisible(this.welcomeMessage);
    }
}