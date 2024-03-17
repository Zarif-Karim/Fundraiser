import { User } from '../../components/user';
import { ExtendedContext } from '../../context';

export async function getHandler(ctx: ExtendedContext) {
    // only one of the will be defined
    const { id, email } = ctx.params;

    try {
        let user: User | undefined;
        if (id) {
            user = await ctx.userService.get(id);
        } else {
            user = await ctx.userService.getByEmail(email);
        }

        ctx.status = 200;
        ctx.body = user;
    } catch (err) {
        ctx.status = 404;
        ctx.body = (err as Error).message;

        ctx.logger.error({ err, operation: 'getUserHandler' });
    }

    return;
}
