import Koa from 'koa';
import { UserService } from './services/user';
import { ExtendedContext } from './context';
import { RedisStorage } from './storage/redis';
import { UserStore } from './storage/user';
import { NoLogConsole } from './utils/noLoggerConsole';

export default function attachServices(app: Koa<unknown, ExtendedContext>) {
    const context = app.context as ExtendedContext;

    context.logger = process.env.NODE_ENV === 'test' ? NoLogConsole : console;

    const redisStorage = new RedisStorage();
    const userStore = new UserStore(redisStorage);
    context.userService = new UserService(userStore);
}
