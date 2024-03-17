import Koa from 'koa';
import { UserService } from './services/user';
import { ExtendedContext } from './context';
import { PostgresClient } from './storage/postgres';
import { UserStore } from './storage/user';
import { NoLogConsole } from './utils/noLoggerConsole';
import config from './config';

export default function attachServices(app: Koa<unknown, ExtendedContext>) {
    const ctx = app.context as ExtendedContext;

    ctx.logger = process.env.NODE_ENV === 'test' ? NoLogConsole : console;
    ctx.db = new PostgresClient(config.POSTGRES, ctx.logger);

    const userStore = new UserStore(ctx.db);
    ctx.userService = new UserService(userStore);
}
