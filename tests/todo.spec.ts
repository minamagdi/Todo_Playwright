import {expect , test} from '@playwright/test';
import {faker} from '@faker-js/faker';
import User from '../modals/User';
import TodoApis from '../apis/TodoApis';
import RegisterPage from '../pages/Register.page';

test('User should be able to add new todo task', async ({page, request, context}) => {
    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.exampleEmail(),
        'Password@123'
    );
    const registerPage = new RegisterPage(page, request, context);
    await registerPage.registerUsingApi(user);
    await page.goto('/todo');
    await page.locator('[data-testid="add"]').click();
    await page.locator('[data-testid="new-todo"]').fill('New todo task');
    await page.locator('[data-testid="submit-newTask"]').click();
    await expect(page.locator('[data-testid="todo-text"]')).toHaveText('New todo task');
})


test('User should be able to delete todo task', async ({page, request, context}) => {
    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.exampleEmail(),
        'Password@123'
    );
    const registerPage = new RegisterPage(page, request, context);
    const response = await registerPage.registerUsingApi(user);

    user.setAccessToken((await response.json()).access_token);
    const addTodoResponse = await new TodoApis(request).addTodoApi('To be deleted', user);
    const addTodoResponseBody = await addTodoResponse.json();
    console.log(addTodoResponseBody);

    expect (addTodoResponse.status()).toBe(201);
    expect (addTodoResponseBody.item).toBe('To be deleted');
    await page.goto('/todo');
    await page.locator('[data-testid="delete"]').first().click();
    await expect(page.locator('[data-testid="no-todos"]')).toHaveText('No Available Todos');
})


test('User should be able to register new todo task', async ({page, request, context}) => {
    // const email = faker.internet.exampleEmail();
    // const resister = await request.post(
    //     "https://dev.api.yad-plus.com/v1/users/register",
    //     {
    //         data: {
    //             firstName: "mina",
    //             lastName: "magdy",
    //             email: faker.internet.exampleEmail(),
    //             userName: faker.person.firstName() + '123',
    //             provider: "YAD",
    //             birthDate: "2008-01-14T22:00:00.000Z",
    //             address: {
    //                 street: "Aliquip nostrud aper",
    //                 state: "Id incididunt est s",
    //                 countryId: 137,
    //             },
    //             userType: "CLIENT",
    //             phone: { phoneCode: "966", phoneNumber: "507777777" },
    //         },
    //     },
    // );
    // console.log(await resister.json());

    // const preOTP = await request.post(
    //     "https://dev.yad-plus.com/api/pre-otp",
    //     {
    //         data: {
    //             email: email,
    //             reason: "REGISTER",
    //             userType: "CLIENT"
    //         },
    //     },
    // );
    // console.log(await preOTP.json());
    // const preOTPResponse = await preOTP.json();
    // const clientToken = preOTPResponse.clientToken;
    
    // await page.waitForTimeout(3000); // Simulate wait time for OTP delivery
    // const postOTP = await request.post(
    //     "https://dev.yad-plus.com/api/post-otp",
    //     {
    //         data: {
    //             clientToken: clientToken,
    //             otp: "1111"
    //         },
    //     },
    // );
    // console.log(await data);
    // console.log(await postOTP.json());
    // const postOTPResponse = await postOTP.json();
    // const postClientToken = postOTPResponse.clientToken;

    // const setPassword = await request.post(
    //     "https://dev.yad-plus.com/api/post-setup-password",
    //     {
    //         data: {
    //             clientToken: postClientToken,
    //             confirmPassword: "Password@123",
    //             newPassword: "Password@123"
    //         },
    //     },
    // );
    // console.log(await setPassword.json());
    // // const setPasswordResponse = await setPassword.json();
    
    const login = await request.post(
        "https://dev.api.yad-plus.com/v1/auth/login",
        {
            data: {
                "username": "automation_test_1765804503556_s5le46@yad.com",
                "password": "Password@123"
                },
        },
    );
    console.log(await login.json());
    const loginResponse = await login.json();
    const token = loginResponse.token;
    console.log('Login Token:', token);
    await context.addCookies([
        {
            name: '__Secure-next-auth.session-token',
            value: token,
            url: 'https://dev.yad-plus.com',
        },
    // //     {
    // //         name: 'userID',
    // //         value: userID,
    // //         url: 'https://todo.qacart.com',
    // //     },
    // //     {
    // //         name: 'firstName',
    // //         value: firstName,
    // //         url: 'https://todo.qacart.com',
    // //     }
    ]);

    await page.goto('/en');
    // // await page.locator('[data-testid="add"]').click();
    // // await page.locator('[data-testid="new-todo"]').fill('New todo task');
    // // await page.locator('[data-testid="submit-newTask"]').click();
    // // await expect(page.locator('[data-testid="todo-text"]')).toHaveText('New todo task');
})