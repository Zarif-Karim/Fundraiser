import { User } from '../../components/user';
import { ExtendedContext } from '../../context';
import { uuidv4 } from 'lib0/random';

export async function createHandler(ctx: ExtendedContext) {
  const id = uuidv4();

  // validate request
  const validatedFields = validateRequest(ctx);
  if (!validatedFields.success) {
    ctx.status = 400;
    ctx.body = validatedFields;
    return;
  }

  // check for duplication
  const { name, email, address, phone } = validatedFields;
  const existingUser = await ctx.userService.getByEmail(email);
  if (existingUser) {
    ctx.status = 409;
    ctx.body = { message: 'User with email already exists' };
    return;
  }

  // create user
  try {
    const newUser = await ctx.userService.create(
      name,
      email,
      phone,
      address,
      id,
    );

    ctx.status = 201;
    ctx.body = newUser;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: 'Failed to create user' };
    ctx.logger.error({ err, operation: 'createUserHandler' });
  }
};

/**
 * Make sure all the required fields are present for a user
 * @param ctx: Koa Context soon to be extended
 * @returns validated body or undefined
 */
function validateRequest(
  ctx: ExtendedContext,
): ValidationSuccess | ValidationFailure {
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
