import { APIRequestContext, BrowserContext, Page, expect } from "@playwright/test";
import User from "../modals/User";
import Actions from "../wrapper/Actions";
import Assertions from "../wrapper/Assertions";
import UserApis from "../apis/UserApis";
import config  from "./../playwright.config"

export default class RegisterPage {
    private page: Page;
    private request?: APIRequestContext;
    private context?: BrowserContext;
    // constructor
    constructor(page: Page, request?: APIRequestContext, context?: BrowserContext){
        this.page = page;
        this.request = request;
        this.context = context;
    }
    
    private actions = new Actions();
    private assertions = new Assertions();

    // Elements

    private get firstNameInput (){
        return  this.page.locator('[data-testid="first-name"]');
    }

    private get lastNameInput (){
        return this.page.locator('[data-testid="last-name"]');
    }

    private get emailInput (){
        return this.page.locator('[data-testid="email"]');
    }

    private get passwordInput (){
        return this.page.locator('[data-testid="password"]');
    }

    private get confirmPasswordInput (){
        return this.page.locator('[data-testid="confirm-password"]');
    }

    private get submitButton (){
        return this.page.locator('[data-testid="submit"]');
    }

    private get welcomeMessage () {
        return this.page.locator('[data-testid="welcome"]');
    }

    private get welcomeMessageText () {
        return this.page.locator('h2[data-testid="welcome"]');
    }

    // Actions

    async load() {
        await this.page.goto('/signup');
    }

    async register(user: User) {
        await this.actions.fill(this.firstNameInput, user.getFirstName());
        await this.actions.fill(this.lastNameInput, user.getLastName());
        const uniqueEmail = user.getEmail();
        await this.actions.fill(this.emailInput, uniqueEmail);
        await this.actions.fill(this.passwordInput, user.getPassword());
        await this.actions.fill(this.confirmPasswordInput, user.getPassword());
        await this.actions.click(this.submitButton);
    }

    async registerUsingApi(user: User) {
        const response = await new UserApis(this.request!).register(user);
        console.log(await response.json());
        const responseBody = await response.json();
        expect(response.status()).toBe(201);
        const accessToken = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;
    
        await this.context!.addCookies([
            {
                name: 'access_token',
                value: accessToken,
                url: config.use?.baseURL,
            },
            {
                name: 'userID',
                value: userID,
                url: config.use?.baseURL,
            },
            {
                name: 'firstName',
                value: firstName,
                url: config.use?.baseURL,
            }
        ]);
        return response
    }


    // Assertions


}