import Koa from 'koa';
import { UserService } from './services/user';
import { ExtentedContext } from './context';

export default function attachServices(app: Koa): void {
    const context = app.context as ExtentedContext;

    // TODO: implement the services storage
    app.context.userServices = new UserService({});
}
