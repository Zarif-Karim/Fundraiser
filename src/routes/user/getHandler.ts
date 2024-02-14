import { ExtendedContext } from '../../context';

export async function getHandler(ctx: ExtendedContext) {
    const { id } = ctx.params;

    try {
        const user = await ctx.userService.get(id);

        ctx.status = 200;
        ctx.body = user;
    } catch (err) {
        ctx.status = 404;
        ctx.body = (err as Error).message;

        ctx.logger.error({ err, operation: 'getUserHandler' });
    }

    return;
}
