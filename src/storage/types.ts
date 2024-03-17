export type PostgresGetPayload = ErrorUndefinedType | UserTablePayload;

export type UserTablePayload = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
};

export type ErrorUndefinedType = undefined;
