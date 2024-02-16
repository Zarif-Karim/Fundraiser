import { Context } from 'koa';
import { UserService } from './services/user';
import { Logger } from './utils/logger';

export interface ExtendedContext extends Context {
    logger: Logger;
    userService: UserService;
}
