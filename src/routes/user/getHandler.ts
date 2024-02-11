import { ExtendedContext } from '../../context';

export async function getHandler(ctx: ExtendedContext) {
    const { id } = ctx.params;
    const user = await ctx.userService.get(id);
    if (!user) {
        ctx.status = 404;
        ctx.body = 'User not found';
        return;
    }

    ctx.status = 200;
    ctx.body = user;
    return;
}
