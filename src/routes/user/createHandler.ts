import { Context } from 'koa';

export const createHandler = async (ctx: Context) => {
  // temporary until we have uuid
  const idFromParams = ctx.params.id ?? '';

  // validate request
  const validatedFields = validateRequest(ctx);
  if (!validatedFields.success) {
    ctx.status = 400;
    ctx.body = validatedFields;
    return;
  }

  const { name, email, address, phone } = validatedFields;
  // check for duplication
  const existingUser = await ctx.userService.getByEmail(email);
  if (existingUser) {
    ctx.status = 409;
    ctx.body = { message: 'User with email already exists' };
    return;
  }

  // create user
  const newUser = await ctx.userService.create(name, email, phone, address, idFromParams);
  // return: user? success? what?
  throw new Error('Not implemented');
};

/**
 * Make sure all the required fields are present for a user
 * @param ctx: Koa Context soon to be extended
 * @returns validated body or undefined
 */
function validateRequest(ctx: Context): ValidationSuccess | ValidationFailure {
  const { name, email, address, phone } = ctx.request.body as User;

  if (!name || !email || !phone) {
    return {
      success: false,
      message: 'Missing required field(s)',
      requiredFields: ['name', 'email', 'phone'],
    };
  }

  return {
    success: true,
    name,
    email,
    address,
    phone,
  };
}

type ValidationSuccess = {
  success: true;
  name: string;
  email: string;
  address?: string;
  phone: string;
};

type ValidationFailure = {
  success: false;
  message: string;
  requiredFields: string[];
};
