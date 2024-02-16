export type PostgresGetPayload = ErrorUndefinedType | UserTablePayload;

export type UserTablePayload = {
    id: string;
    email: string;
    password: string;
    address: string;
    created_at: string;
    updated_at: string;
};

export type ErrorUndefinedType = undefined;
