import {test} from '@playwright/test';
import User from '../modals/User';
import { faker } from '@faker-js/faker';
import RegisterPage from '../pages/Register.page';
import TodoPage from '../pages/Todo.page';


test('User should be able to login to todo website', async ({page}) => {
    const registerPage = new RegisterPage(page);
    const todoPage = new TodoPage(page);
    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.exampleEmail(),
        'Password@123'
    );
    await registerPage.load();
    await registerPage.register(user);
    await todoPage.assertTodoPageURLHasText('todo');
    await todoPage.isWelcomeMessageVisible();
})
