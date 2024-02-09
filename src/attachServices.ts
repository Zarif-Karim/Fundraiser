import Koa from 'koa';
import { UserService } from './services/user';
import { ExtentedContext } from './context';
import { RedisStorage } from './storage/redis';
import { UserStore } from './storage/user';

export default function attachServices(app: Koa) {
    const context = app.context as ExtentedContext;

    const redisStorage = new RedisStorage();
    const userStore = new UserStore(redisStorage);
    context.userServices = new UserService(userStore);
}
