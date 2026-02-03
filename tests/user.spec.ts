import {test} from '@playwright/test';
import User from '../modals/User';
import RegisterPage from '../pages/Register.page';
import TodoPage from '../pages/Todo.page';


test('User should be able to register to todo website', async ({page}) => {
    const registerPage = new RegisterPage(page);
    const todoPage = new TodoPage(page);
    const user = new User();
    await registerPage.load();
    await registerPage.register(user);
    await todoPage.assertTodoPageURLHasText('todo');
    await todoPage.isWelcomeMessageVisible();
})
