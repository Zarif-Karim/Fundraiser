import { User } from '../components/user';
import { PostgresClient } from './postgres';

const TABLE_NAME = 'users';

export class UserStore {
    constructor(private store: PostgresClient) {}

    async create(
        id: string,
        name: string,
        email: string,
        phone: string,
        address: string,
    ): Promise<User | undefined> {
        const success = await this.store.add(createUserQuery, [
            id,
            name,
            email,
            phone,
            address,
        ]);
        if (!success) {
            return undefined;
        }
        return new User(id, name, email, phone, address);
    }

    async get(id: string): Promise<User | undefined> {
        const user = await this.store.get(getSingleUserByIdQuery, [id]);
        if (!user) {
            return undefined;
        }
        return User.fromDatabase(user);
    }
}

// SQL queries
const createUserQuery = `INSERT INTO ${TABLE_NAME} (id, name, email, phone, address, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())`;
const getSingleUserByIdQuery = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
