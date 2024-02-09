import { Context } from "koa";
import { UserService } from "./services/user";

export interface ExtendedContext extends Context {
    userService: UserService;
}
