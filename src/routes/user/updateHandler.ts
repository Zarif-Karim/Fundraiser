import { User } from '../../components/user';
import { ExtendedContext } from '../../context';
import { validateRequest } from './util';

export async function updateHandler(ctx: ExtendedContext) {
    // validate request
    // TODO: double check if id will always be present
    const validatedFields = validateRequest(ctx, { idRequired: true });
    if (!validatedFields.success) {
        ctx.status = 400;
        ctx.body = validatedFields;
        return;
    }

    // update user
    try {
        await ctx.userService.update(validatedFields.user as User);

        ctx.status = 200;
        ctx.body = validatedFields.user;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { message: 'Failed to update user' };
        ctx.logger.error({ err, operation: 'updateUserHandler' });
    }
}
