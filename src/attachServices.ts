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
    // TODO: make server wait for DB to complete setup before start
    setupDatabase(ctx);

    const userStore = new UserStore(ctx.db);
    ctx.userService = new UserService(userStore);
}

const setupDatabase = async (ctx: ExtendedContext) => {
    try {
        ctx.logger.info('Setting up database');
        await ctx.db.runMigrations();
        ctx.logger.info('Database setup complete');
    } catch (error) {
        ctx.logger.error({
            error,
            operation: 'setupDatabase',
        });
    }
};
