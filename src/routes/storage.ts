import Router from 'koa-router';
import { ExtendedContext } from '../context';
import { User } from '../components/user';

const router = new Router<unknown, ExtendedContext>();

router.get('/get/all', async (ctx: ExtendedContext) => {
    try {
        const users = await ctx.userService.getAll();
        ctx.body = { users };
    } catch (err) {
        ctx.status = 500;
        ctx.body = (err as Error).message;
    }
});

router.get('/get/:id', async (ctx: ExtendedContext) => {
    const id = ctx.params.id;
    try {
        ctx.body = await ctx.userService.get(id);
        return;
    } catch (err) {
        if ((err as Error).message === 'User not found') {
            ctx.status = 404;
            ctx.body = (err as Error).message;
            return;
        }

        throw err;
    }
});

router.post('/add', async (ctx: ExtendedContext) => {
    const userDetails = ctx.request.body as User;
    try {
        const success = await ctx.userService.create(userDetails);
        if (!success) {
            ctx.status = 500;
            ctx.body = 'Failed to add to postgres';
            return;
        }

        ctx.status = 201;
        ctx.body = User.info(success);
        return;
    } catch (err) {
        ctx.status = 500;
        ctx.body = (err as Error).message;
    }
});

router.delete('/remove/:id', async (ctx: ExtendedContext) => {
    const id = ctx.params.id;

    const success = await ctx.userService.delete(id);

    if (!success) {
        ctx.status = 500;
        ctx.body = 'Failed to delete from redis';
        return;
    }

    ctx.status = 204;
    ctx.body = 'Deleted from redis';
    return;
});

export default router;
