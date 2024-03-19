import { ExtendedContext } from '../../context';
import { validateRequest } from './util';

export async function createHandler(ctx: ExtendedContext) {
    // validate request
    const validatedFields = validateRequest(ctx);
    if (!validatedFields.success) {
        ctx.status = 400;
        ctx.body = validatedFields;
        return;
    }

    // check for duplication
    const { user } = validatedFields;
    const existingUser = await ctx.userService.getByEmail(user.email);
    if (existingUser) {
        ctx.status = 409;
        ctx.body = {
            message: `User with email "${existingUser.email}" already exists`,
        };
        return;
    }

    // create user
    try {
        const newUser = await ctx.userService.create(user);

        ctx.status = 201;
        ctx.body = newUser;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { message: 'Failed to create user' };
        ctx.logger.error({ err, operation: 'createUserHandler' });
    }
}
