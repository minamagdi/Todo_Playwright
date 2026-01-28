import {expect, test} from '@playwright/test';


test('User should be able to login to todo website', async ({page}) => {
    await page.goto('/signup');
    await page.locator('[data-testid="first-name"]').fill('John');
    await page.locator('[data-testid="last-name"]').fill('Doe');
    const uniqueEmail = `john.doe+${Date.now()}@example.com`;
    await page.locator('[data-testid="email"]').fill(uniqueEmail);
    await page.locator('[data-testid="password"]').fill('Password123!');
    await page.pause();
    await page.locator('[data-testid="confirm-password"]').fill('Password123!');
    await page.locator('[data-testid="submit"]').click();
    const welcomeMessage = page.locator('h2[data-testid="welcome"]');
    await expect(page).toHaveURL('/todo');
    await expect(welcomeMessage).toBeVisible();
})
