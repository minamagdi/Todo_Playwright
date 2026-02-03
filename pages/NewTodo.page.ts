import { APIRequestContext, expect, Page } from '@playwright/test';
import Assertions from '../wrapper/Assertions';
import Actions from '../wrapper/Actions';
import User from '../modals/User';
import TodoApis from '../apis/TodoApis';

export default class NewTodoPage {
    private page: Page;
    private request? : APIRequestContext
    private assertions = new Assertions();
    private actions = new Actions();

    constructor(page: Page, request?: APIRequestContext){
        this.page = page;
        this.request = request;
    }

    // Elements
    private get todoNameInputField() {
        return this.page.locator('[data-testid="new-todo"]');
    }

    private get submitButton() {
        return this.page.locator('[data-testid="submit-newTask"]');
    }

    private get newTodoTitleText() {
        return this.page.locator('[data-testid="todo-text"]');
    }

    // Actions
    async navigateToNewTodoPage() {
        await this.page.goto('/todo/new');
    }

    async createNewTodo(todo: string) {
        await this.actions.fill(this.todoNameInputField, todo);
        await this.actions.click(this.submitButton);
    }

    // Assertions

    async assertNewTodoIsCreated(todo: string) {
        await this.page.waitForLoadState('networkidle');
        await this.assertions.assertElementHasText(this.newTodoTitleText, todo);
    }

    // Api methods
    async addNewTodoUsingApi(todo: string, user: User) {
        const addTodoResponse = await new TodoApis(this.request!).addTodoApi(todo, user);
        const addTodoResponseBody = await addTodoResponse.json();
        console.log(addTodoResponseBody);
        expect(addTodoResponse.status()).toBe(201);
        expect(addTodoResponseBody.item).toBe(todo);
    }

}