import { Context } from 'koa';
import { UserService } from './services/user';
import { Logger } from './utils/logger';
import { PostgresClient } from './storage/postgres';

export interface ExtendedContext extends Context {
    db: PostgresClient;
    logger: Logger;
    userService: UserService;
}
