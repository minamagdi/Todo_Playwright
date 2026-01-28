import { APIRequestContext } from "@playwright/test";
import User from "../modals/User";

export class UserApis {

    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async registerApi(user: User) {
        await this.request.post('https://todo.qacart.com/api/v1/users/register', {
        data: {
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            password: user.getPassword()
        }
    });
    }

}