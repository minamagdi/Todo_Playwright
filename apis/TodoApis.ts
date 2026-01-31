import { APIRequestContext } from "@playwright/test";
import User from "../modals/User";

export default class TodoApis {

    private request: APIRequestContext;
    private baseURL: string = process.env.BASE_URL || 'https://todo.qacart.com';
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async addTodoApi(itemName: string, user : User) {
        return await this.request.post(this.baseURL + `/api/v1/tasks`, {
            data: {
                item: itemName,
                isCompleted: false,
            },
            headers: {
                Authorization: `Bearer ${user.getAccessToken()}`,
            }
        });
    }
}
