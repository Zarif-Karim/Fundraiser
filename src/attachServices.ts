import Koa from 'koa';
import { UserService } from './services/user';
import { ExtendedContext } from './context';
import { RedisStorage } from './storage/redis';
import { UserStore } from './storage/user';

export default function attachServices(app: Koa) {
    const context = app.context as ExtendedContext;

    context.logger = console;

    const redisStorage = new RedisStorage();
    const userStore = new UserStore(redisStorage);
    context.userService = new UserService(userStore);
}
