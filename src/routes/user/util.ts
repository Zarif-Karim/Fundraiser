import { User } from '../../components/user';
import { ExtendedContext } from '../../context';

/**
 * Make sure all the required fields are present for a user
 * @param ctx: Koa Context soon to be extended
 * @returns validated body or undefined
 */
export function validateRequest(
    ctx: ExtendedContext,
    { idRequired } = { idRequired: false },
): ValidationSuccess | ValidationFailure {
    const { id, name, email, address, phone } = ctx.request.body as User;

    const missingFields: string[] = [];
    if (idRequired && !id) {
        missingFields.push('id');
    }
    if (!name) {
        missingFields.push('name');
    }
    if (!email) {
        missingFields.push('email');
    }
    if (!phone) {
        missingFields.push('phone');
    }

    if (missingFields.length > 0) {
        return {
            success: false,
            message: 'Missing required field(s)',
            requiredFields: missingFields,
        };
    }

    const optionalId = idRequired ? { id } : {};
    return {
        success: true,
        user: {
            ...optionalId,
            name,
            email,
            address: address || '',
            phone,
        },
    };
}

type ValidationSuccess = {
    success: true;
    user: {
        id?: string;
        name: string;
        email: string;
        address: string;
        phone: string;
    };
};

type ValidationFailure = {
    success: false;
    message: string;
    requiredFields: string[];
};
