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

    private get deleteFirstTodoButton() {
        return this.page.locator('[data-testid="delete"]').first();
    }

    private get noTodosMessage() {
        return this.page.locator('[data-testid="no-todos"]');
    }

    // Actions

    async deleteFirstTodo() {
        await this.deleteFirstTodoButton.click();
    }


    // Assertions
    async assertTodoPageURLHasText(text: string) {
        await this.assertions.assertPageURLContains(this.page, text);
    }
    async isWelcomeMessageVisible() {
        await this.page.waitForLoadState('networkidle')
        await this.assertions.assertElementIsVisible(this.welcomeMessage);
    }

    async assertNoTodosMessageIsShown() {
        await this.assertions.assertElementHasText(this.noTodosMessage, 'No Available Todos');
    }


    // Api methods

}