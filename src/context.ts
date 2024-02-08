import { Context } from "koa";
import { UserService } from "./services/user";

export interface ExtentedContext extends Context {
    userServices: UserService;
}
