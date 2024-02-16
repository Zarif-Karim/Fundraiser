import Router from 'koa-router';
import { ExtendedContext } from '../context';
import { User } from '../components/user';

const router = new Router<unknown, ExtendedContext>();

router.get('/storage/get/:id', async (ctx: ExtendedContext) => {
    const id = ctx.params.id;
    const result = await ctx.userService.get(id);

    ctx.body = result;
    return;
});

router.post('/storage/add', async (ctx: ExtendedContext) => {
    const { name, email, phone, address } = ctx.request.body as User;
    const success = await ctx.userService.create(
        name,
        email,
        phone,
        address || '',
    );
    if (!success) {
        ctx.status = 500;
        ctx.body = 'Failed to add to redis';
        return;
    }

    ctx.status = 201;
    ctx.body = 'Added to redis';
    return;
});

router.delete('/storage/remove/:id', async (ctx: ExtendedContext) => {
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
