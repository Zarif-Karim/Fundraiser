import { User } from '../components/user';
import { PostgresClient } from './postgres';
import { sql } from 'slonik';
import { UserTablePayload } from './types';

const USER_TABLE = 'users';

export class UserStore {
    constructor(private store: PostgresClient) {}

    async create(
        id: string,
        userDetails: Omit<User, 'id'>,
    ): Promise<User | undefined> {
        const success = await this.store.add(createUserQuery(id, userDetails));
        if (!success) {
            return undefined;
        }

        const { name, email, phone, address } = userDetails;
        return new User(id, name, email, phone, address);
    }

    // for debugging
    async getAll(): Promise<User[]> {
        const query = getAllUsersQuery();
        const users = await this.store.getAllFromTable(query);
        return users.map((user) => User.fromDatabase(user as UserTablePayload));
    }

    async get(id: string): Promise<User | undefined> {
        const user = await this.store.get(getSingleUserByIdQuery(id));
        if (!user) {
            return undefined;
        }
        return User.fromDatabase(user);
    }

    async getByEmail(email: string): Promise<User | undefined> {
        const user = await this.store.get(getSingleUserByEmailQuery(email));
        if (!user) {
            return undefined;
        }
        return User.fromDatabase(user);
    }
}

// SQL queries
const createUserQuery = (
    id: string,
    { name, email, phone, address }: Omit<User, 'id'>,
) => {
    return sql.unsafe`INSERT INTO users (
               id, name, email, phone, address, createdAt, updatedAt) VALUES 
            (${id}, ${name}, ${email}, ${phone}, ${address || ''}, NOW(), NOW())`;
};

const getSingleUserByIdQuery = (id: string) =>
    sql.unsafe`SELECT * FROM users WHERE id = ${id}`;

const getSingleUserByEmailQuery = (email: string) =>
    sql.unsafe`SELECT * FROM users WHERE email = ${email}`;

// for debugging
const getAllUsersQuery = () => sql.unsafe`SELECT * FROM users;`;
