import { uuidv4 } from 'lib0/random';
import { User } from '../components/user';
import { UserStore } from '../storage/user';

export class UserService {
    constructor(private readonly userStore: UserStore) {}

    async get(id: string): Promise<User | undefined> {
        const user = await this.userStore.get(id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async create(
        name: string,
        email: string,
        phone: string,
        address: string,
    ): Promise<User> {
        const id = uuidv4();

        const user = await this.userStore.create(
            id,
            name,
            email,
            phone,
            address,
        );
        if (!user) {
            throw new Error('Failed to create user');
        }

        return user;
    }

    async update(id: string, user: User) {
        return;
    }

    async delete(id: string) {
        return undefined;
    }

    async batchGet(ids: string[]) {
        return;
    }

    async getByEmail(email: string) {
        // make a call to the database

        // return the user if found

        // return undefined if not found
        return undefined;
    }
}
