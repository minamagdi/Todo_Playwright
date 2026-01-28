import {expect, test} from '@playwright/test';
import User from '../modals/User';
import { faker } from '@faker-js/faker';


test('User should be able to login to todo website', async ({page}) => {
    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.exampleEmail(),
        'Password@123'
    );
    await page.goto('/signup');
    await page.locator('[data-testid="first-name"]').fill(user.getFirstName());
    await page.locator('[data-testid="last-name"]').fill(user.getLastName());
    const uniqueEmail = user.getEmail();
    await page.locator('[data-testid="email"]').fill(uniqueEmail);
    await page.locator('[data-testid="password"]').fill(user.getPassword());
    await page.pause();
    await page.locator('[data-testid="confirm-password"]').fill(user.getPassword());
    await page.locator('[data-testid="submit"]').click();
    const welcomeMessage = page.locator('h2[data-testid="welcome"]');
    await expect(page).toHaveURL('/todo');
    await expect(welcomeMessage).toBeVisible();
})
